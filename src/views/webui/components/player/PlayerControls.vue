<script setup lang="ts">
import {usePlayInfoStore} from "@/stores/playinfo";
import {WebInfoClient} from "@/api/client";
import {useRouter} from "vue-router";

const playInfoStore = usePlayInfoStore();
const router = useRouter();

let wsClient = WebInfoClient.getInstance();

function togglePlay() {
  wsClient?.sendEvent("cmd.player.op.toggle", {});
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

function openLyricPage() {
  router.push({name: "webui.player"});
}

function openVideoWindow() {
  wsClient?.sendEvent("cmd.gui.player_window.op", {
    SetOpen: true,
  });
}
</script>

<template>
  <div class="flex items-center justify-center gap-1">
    <button @click="openLyricPage" class="btn btn-xs btn-ghost hidden lg:inline-flex">
      歌词
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
    <button @click="openVideoWindow" class="btn btn-xs btn-ghost hidden lg:inline-flex">
      视频窗
    </button>
  </div>
</template>
