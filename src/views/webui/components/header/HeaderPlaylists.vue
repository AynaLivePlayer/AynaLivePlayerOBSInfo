<script setup lang="ts">
import {usePlaylistsStore} from "@/stores/playlists";
import {MetaID} from "@/utils";

const playlistsStore = usePlaylistsStore();
</script>

<template>
  <li class="menu-title">播放列表</li>
  <li v-for="playlistInfo in playlistsStore.playlists"><router-link :to="{name:'webui.playlist', params:{id:MetaID(playlistInfo.Meta)}}">{{ playlistInfo.Title }}</router-link></li>
</template>

<style scoped>
</style>
