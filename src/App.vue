<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {onBeforeUnmount, onMounted} from 'vue';
import { usePlayInfoStore } from './stores/playinfo';
import {WebInfoClient} from "@/api/client";
import type {EventData} from "@/api/model";
import {usePlaylistsStore} from "@/stores/playlists";

const playInfoStore = usePlayInfoStore();
const playlistsStore = usePlaylistsStore();

onMounted(() => {
  // Define the onMessage handler
  const onMessageHandler = (event:MessageEvent) => {
    let raw:EventData = JSON.parse(event.data);
    let data = raw.Data;

    switch (raw.EventID) {
      case "update.player.playing":
        playInfoStore.setCurrent(data.Media);
        break;
      case "update.player.property.time_pos":
        playInfoStore.timePos=data.TimePos;
        break;
      case "update.player.property.duration":
        playInfoStore.duration=data.Duration;
        break;
      case "update.player.lyric.pos":
        playInfoStore.currentLyric.Lyric=data.CurrentLine.Lyric;
        playInfoStore.currentLyric.CurrentIndex=data.CurrentIndex;
        playInfoStore.currentLyric.Total=data.Total;
        break
      case "update.playlist.detail.player":
        playInfoStore.setPlaylist(data.Medias);
        break
      case "update.player.property.pause":
        playInfoStore.setPaused(data.Paused);
        break
      case "update.playlist.manager.info":
        playlistsStore.setPlaylists(data.Playlists);
        break
      case "update.playlist.manager.current":
        playlistsStore.setCurrentPlaylistMedias(data.Medias);
        break
      case "update.player.property.volume":
        playInfoStore.setVolume(data.Volume);
        break
      case "update.player.lyric.reload":
        playInfoStore.setLyrics(data.Lyrics);
        break
      default:
        break;
    }
  };

  // Create an instance of WebInfoClient
  const webInfoClient = WebInfoClient.createInstance(onMessageHandler);

  // Connect to the WebSocket server
  webInfoClient.connect();

  // Clean up on component unmount
  onBeforeUnmount(() => {
    webInfoClient.disconnect();
  });
});

document.title = "WebUI";

</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
