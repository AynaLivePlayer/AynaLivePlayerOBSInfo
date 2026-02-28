<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {onBeforeUnmount, onMounted} from 'vue';
import { usePlayInfoStore } from './stores/playinfo';
import {WebInfoClient} from "@/api/client";
import {capitalizeKeysDeep, type EventData} from "@/api/model";
import {usePlaylistsStore} from "@/stores/playlists";
import {useProvidersStore} from "@/stores/providers";
import {useSearchStore} from "@/stores/search";
import {useHistoryStore} from "@/stores/history";
import {useConfigStore} from "@/stores/config";
import {useLiveRoomStore} from "@/stores/liverooms";

const playInfoStore = usePlayInfoStore();
const playlistsStore = usePlaylistsStore();
const providersStore = useProvidersStore();
const searchStore = useSearchStore();
const historyStore = useHistoryStore();
const configStore = useConfigStore();
const liveRoomStore = useLiveRoomStore();

onMounted(() => {
  // Define the onMessage handler
  const onMessageHandler = (event:MessageEvent) => {
    let raw:EventData = JSON.parse(event.data);
    let data = raw.Data;

    data = capitalizeKeysDeep(data)

      switch (raw.EventID) {
      case "update.player.playing":
        if (data.Removed) {
          playInfoStore.resetPlaybackState();
          break;
        }
        if (data.Media) {
          playInfoStore.setCurrent(data.Media);
          historyStore.push(data.Media);
        }
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
      case "update.player.property.state":
        // 1 = loading, 2 = idle
        if (data.State === 1 || data.State === 2) {
          playInfoStore.duration = 0;
          playInfoStore.timePos = 0;
        }
        break
      case "update.playlist.manager.info":
        playlistsStore.setPlaylists(data.Playlists);
        break
      case "update.playlist.manager.system":
        if (data.Info) {
          playlistsStore.setSystemPlaylist(data.Info);
        }
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
      case "update.search_result":
        searchStore.setResults(data.Medias);
        break
      case "update.media.provider.update":
        providersStore.setMediaProviders(data.Providers);
        if (!searchStore.provider && data.Providers.length > 0) {
          searchStore.setProvider(data.Providers[0]);
        }
        break
      case "update.liveroom.provider":
        liveRoomStore.setProviders(data.Providers);
        break
      case "update.liveroom.rooms":
        liveRoomStore.setRooms(data.Rooms);
        break
      case "update.liveroom.status":
        liveRoomStore.updateRoom(data.Room);
        break
      case "update.playlist.mode.player":
        configStore.setPlaylistMode("player", data.Mode);
        break
      case "update.playlist.mode.system":
        configStore.setPlaylistMode("system", data.Mode);
        break
      case "update.player.audio_device":
        configStore.setAudioDevices(data.Devices, data.Current);
        break
      case "update.update.check":
        configStore.setUpdateInfo(data.Info, data.HasUpdate);
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
