<script setup lang="ts">
// const { spotifyApi } = useSpotifyApi();
// const state = await useSpotifyState();
//
// const isPlaying = ref(state.value.is_playing);
//
// const NEXT_REPEAT_STATE: {
//   [key: SpotifyApi.PlaybackRepeatState]: SpotifyApi.PlaybackRepeatState;
// } = {
//   off: "context",
//   context: "track",
//   track: "off"
// };
//
// watch(
//   () => state.value.is_playing,
//   (v) => {
//     isPlaying.value = v;
//   }
// );
// watch(isPlaying, (isPlaying) => {
//   spotifyApi.value[isPlaying ? "play" : "pause"]();
// });
//
// watch(
//   () => state.value.shuffle_state,
//   (v) => {
//     shuffleState.value = v;
//   }
// );
// watch(shuffleState, (shuffleState) => {
//   spotifyApi.value.setShuffle(shuffleState);
// });
//
// watch(
//   () => state.value.repeat_state,
//   (v) => {
//     repeatState.value = v;
//   }
// );
// watch(repeatState, (repeatState) => {
//   spotifyApi.value.setRepeat(repeatState);
// });
//
// async function onBackward() {
//   if (state.value.progress_ms <= 3000) {
//     spotifyApi.value.skipToPrevious();
//   } else {
//     spotifyApi.value.seek(0);
//   }
// }
import {usePlayInfoStore} from "@/stores/playinfo";
import {WebInfoClient} from "@/api/client";
import {ref} from "vue";

const playInfoStore = usePlayInfoStore();

let wsClient = WebInfoClient.getInstance();

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

function prevTrack() {
  wsClient?.sendEvent("cmd.player.op.seek", {
    "Position": 0,
    "Absolute": true,
  });
}

function nextTrack() {
  wsClient?.sendEvent("cmd.player.op.next", {});
}

// todo: finish this
const shuffleState = ref(false);
const repeatState = ref("off");
</script>

<template>
  <div class="flex items-center justify-center">
    <button @click="" class="btn btn-sm btn-ghost">
      <font-awesome-icon
          icon="fa-solid fa-shuffle"
          :class="{ 'text-primary': shuffleState }"
      />
    </button>
    <button @click="prevTrack" class="btn btn-sm btn-ghost">
      <font-awesome-icon icon="fa-solid fa-backward" class="fa-lg"/>
    </button>
    <button @click="togglePlay" class="btn btn-sm btn-ghost">
      <font-awesome-icon
          :icon="['fa-solid', playInfoStore.paused ? 'fa-play':'fa-pause']"
          class="fa-2x"
      />
    </button>
    <button @click="nextTrack" class="btn btn-sm btn-ghost">
      <font-awesome-icon icon="fa-solid fa-forward" class="fa-lg"/>
    </button>
    <button
        @click=""
        class="btn btn-sm btn-ghost space-x-1">
      <font-awesome-icon
          icon="fa-solid fa-repeat"
          :class="{
          'text-primary': repeatState !== 'off'
        }"
      />
      <span v-if="repeatState === 'track'" class="text-primary">1</span>
    </button>
  </div>
</template>
