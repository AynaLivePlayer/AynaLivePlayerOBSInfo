<script setup lang="ts">
import {usePlaylistsStore} from "@/stores/playlists";
import {MetaID} from "@/utils";

const playlistsStore = usePlaylistsStore();
</script>

<template>
  <li class="menu-title">点歌机</li>
  <li ><router-link :to="{name:'webui.player'}">播放器</router-link></li>
  <li ><router-link :to="{name:'webui.playlist'}">点歌列表</router-link></li>
</template>

<style scoped>
</style>
