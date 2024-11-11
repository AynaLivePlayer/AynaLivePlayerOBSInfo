<script setup lang="ts">
import {usePlaylistsStore} from "@/stores/playlists";

const playlistsStore = usePlaylistsStore();
</script>

<template>
  <li class="menu-title">播放列表</li>
  <li v-for="playlistInfo in playlistsStore.playlists"><a>{{ playlistInfo.Title }}</a></li>
</template>

<style scoped>
</style>
