<script setup lang="ts">
import Player from "@/views/webui/components/player/Player.vue";
import Header from "@/views/webui/components/header/Header.vue";
import {usePlayInfoStore} from "@/stores/playinfo";
import {ref, watch} from "vue";
import {WebInfoClient} from "@/api/client";



// Access the Pinia store
const playInfoStore = usePlayInfoStore();

const audioPlaceholder = ref<HTMLAudioElement|null>(null);

let wsClient = WebInfoClient.getInstance();

let positionState = {
  duration: 1,
  position: 0,
};

function detectMimeType(base64: string) {
  // Decode Base64 string to binary data
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(16);
  for (let i = 0; i < Math.min(byteCharacters.length, 16); i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  // Check for PNG's signature
  if (byteNumbers[0] === 0x89 && byteNumbers[1] === 0x50 && byteNumbers[2] === 0x4E && byteNumbers[3] === 0x47 &&
      byteNumbers[4] === 0x0D && byteNumbers[5] === 0x0A && byteNumbers[6] === 0x1A && byteNumbers[7] === 0x0A) {
    return 'image/png';
  }
  // Check for JPEG's signature
  else if (byteNumbers[0] === 0xFF && byteNumbers[1] === 0xD8 && byteNumbers[1] === 0xFF) {
    return 'image/jpeg';
  }
  return 'image/jpeg'; // Default MIME type if no known signature is found
}

function base64ToDataUrl(base64: string) {
  const contentType = detectMimeType(base64);
  return `data:${contentType};base64,${base64}`;
}

watch(() => playInfoStore.current.Info, (value) => {
  let urlsrc = value.Cover.Url;
  if (value.Cover.Url === "") {
    urlsrc = base64ToDataUrl(value.Cover.Data);
  }
  navigator.mediaSession.metadata = new MediaMetadata({
    title: value.Title,
    artist: value.Artist,
    album: value.Album,
    artwork: [{src: urlsrc},]
  });
});

watch(() => playInfoStore.paused, (paused) => {
  if (paused) {
    navigator.mediaSession.playbackState = "paused";
    audioPlaceholder.value?.pause();
  } else {
    navigator.mediaSession.playbackState = "playing";
    audioPlaceholder.value?.play();
  }
});

watch(() => playInfoStore.duration, (newDuration) => {
  positionState.duration = newDuration;
  positionState.position = 0;
  navigator.mediaSession.setPositionState(positionState);
});

watch(() => playInfoStore.timePos, (newPosition) => {
  if (newPosition > positionState.duration) {
    newPosition = positionState.duration;
  }
  if (Math.floor(newPosition) === Math.floor(positionState.position)) {
    return;
  }
  positionState.position = newPosition;
  navigator.mediaSession.setPositionState(positionState);
});


if (navigator.mediaSession && wsClient!=null) {
  navigator.mediaSession.setActionHandler("nexttrack", function () {
    wsClient.sendEvent("cmd.player.op.next", {});
  });

  navigator.mediaSession.setActionHandler("previoustrack", function () {
    wsClient.sendEvent("cmd.player.op.seek", {
      "Position": 0,
      "Absolute": true,
    });
  });

  navigator.mediaSession.setActionHandler("play", function () {
    wsClient.sendEvent("cmd.player.op.pause", {
      "Pause": false,
    });
  });

  navigator.mediaSession.setActionHandler("pause", function () {
    wsClient.sendEvent("cmd.player.op.pause", {
      "Pause": true,
    });
  });

  navigator.mediaSession.setActionHandler("seekto", function (details) {
    wsClient.sendEvent("cmd.player.op.seek", {
      "Position": details.seekTime,
      "Absolute": true,
    });
  });
}

</script>

<template>
  <audio hidden ref="audioPlaceholder" loop @play.prevent @pause.prevent @seeked.prevent @ended.prevent @timeupdate.prevent>
    <source src="@/assets/5-minutes-of-silence.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>
  <div class="drawer h-full lg:drawer-open drawer-mobile relative">
    <input id="app-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col h-full">
      <div class="flex-grow relative overflow-auto">
        <router-view></router-view>
        <label
            for="app-drawer"
            class="btn drawer-button btn-sm lg:hidden">
        </label>
      </div>
      <div class="sticky bottom-0 p-1 px-2 border-t border-base-200 shadow-sm bg-white">
        <Player />
      </div>
    </div>

    <div class="drawer-side">
      <label for="app-drawer" class="drawer-overlay"></label>
      <Header class="text-base-content min-h-full w-60 p-4 border-r"/>
    </div>
  </div>
</template>

<style scoped>

</style>
