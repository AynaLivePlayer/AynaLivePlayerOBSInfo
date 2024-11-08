<script setup lang="ts">

import { usePlayInfoStore } from '@/stores/playinfo';
import {onMounted, ref, watch} from "vue";
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
  currentTime.value = newPosition;
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

function togglePlay() {

  if (playInfoStore.paused) {
    wsClient?.sendEvent("cmd.player.op.pause", {
      "Pause": false,
    });
  } else {
    wsClient?.sendEvent("cmd.player.op.pause", {
      "Pause": true,
    });
  }
}

function nextTrack() {
  wsClient?.sendEvent("cmd.player.op.next", {});
}

function prevTrack() {
  wsClient?.sendEvent("cmd.player.op.seek", {
    "Position": 0,
    "Absolute": true,
  });
}

const currentTime = ref(0);

function seek(event: Event) {
  wsClient?.sendEvent("cmd.player.op.seek", {
    "Position": (event.target as HTMLInputElement).valueAsNumber,
    "Absolute": true,
  });
}

let clicked = false;

onMounted(() => {
  document.addEventListener('click', () => {
    if (audioPlaceholder.value && (!clicked)) {
      audioPlaceholder.value.play().catch(() => {
        // The user interaction might have occurred here, so just catch and ignore the error
      });
      clicked = true;
    }
  }, { once: true });
});

</script>

<template>
  <div class="fixed inset-0 flex flex-col items-center justify-center bg-gray-800">
    <audio hidden ref="audioPlaceholder" loop @play.prevent @pause.prevent @seeked.prevent @ended.prevent @timeupdate.prevent>
      <source src="@/assets/5-minutes-of-silence.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
    <div class="w-full max-w-2xl p-6 rounded-lg bg-gray-900 text-white">
      <div class="flex items-center justify-center space-x-4 mb-4">
        <button @click="prevTrack" class="p-2 rounded-full bg-gray-700 hover:bg-gray-600 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <button @click="togglePlay" class="p-2 rounded-full bg-gray-700 hover:bg-gray-600 focus:outline-none">
          <svg v-if="playInfoStore.paused" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-5.197-3.47A1 1 0 008 8.58v6.839a1 1 0 001.555.832l5.197-3.47a1 1 0 000-1.664z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 9v6m4-6v6" />
          </svg>
        </button>
        <button @click="nextTrack" class="p-2 rounded-full bg-gray-700 hover:bg-gray-600 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
      <input type="range" min="0" :max="playInfoStore.duration" v-model="currentTime" @mouseup="seek" class="w-full h-2 bg-gray-600 rounded-lg cursor-pointer" />
    </div>
  </div>
</template>

<style scoped>

</style>
