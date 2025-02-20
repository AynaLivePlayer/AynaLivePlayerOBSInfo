<script setup lang="ts">
import {usePlayInfoStore} from "@/stores/playinfo";
import MediaCover from "@/components/current/MediaCover.vue";
import {computed, ref, watch} from "vue";
import TotalTime from "@/components/current/TotalTime.vue";
import CurrentTime from "@/components/current/CurrentTime.vue";
import MediaArtist from "@/components/current/MediaArtist.vue";
import MediaTitle from "@/components/current/MediaTitle.vue";
import MediaAlbum from "@/components/current/MediaAlbum.vue";
import {WebInfoClient} from "@/api/client";

const playInfoStore = usePlayInfoStore();

const showTime = ref(false);

const progressPercent = computed(() => {
  return (playInfoStore.timePos / playInfoStore.duration) * 100;
});

let wsClient = WebInfoClient.getInstance();

function seek(event: Event) {
  wsClient?.sendEvent("cmd.player.op.seek", {
    "Position": Math.floor((event.target as HTMLInputElement).valueAsNumber/100),
    "Absolute": true,
  });
}

const currentTime = ref(0);

watch(() => playInfoStore.timePos, (newPosition) => {
  if (Math.floor(newPosition*100) === Math.floor(currentTime.value)) {
    return;
  }
  if (!isDragging.value) {
    currentTime.value = newPosition*100;
  }
});

const isDragging = ref(false);

</script>

<template>
  <div class="flex rounded bg-base-300">
    <div class="h-full aspect-square">
      <MediaCover class="object-cover hover:brightness-75 rounded-l aspect-square"></MediaCover>
    </div>
    <div
      @mouseenter="showTime = true"
      @mouseleave="showTime = false"
      class="flex-1 grid grid-rows-[auto_4px] grid-flow-row relative"
    >
      <div class="grid grid-rows-2 text-center m-2 text-xs">
        <span
          class="truncate self-end"
        >
          <MediaTitle></MediaTitle>
        </span>
        <span class="truncate self-start">
          <MediaArtist></MediaArtist>
          <span> – </span>
          <MediaAlbum></MediaAlbum>
        </span>
      </div>
      <!--        @change="(e) => {spotifyApi.seek((e.target as HTMLInputElement).valueAsNumber)}"-->
      <input
        type="range"
        min="0"
        :max="playInfoStore.duration*100"
        :value="currentTime"
        class="w-full slider px-1"
        :style="`--progress: ${progressPercent}%`"
        @mousedown="isDragging = true"
        @mouseup="isDragging = false; seek($event)"
        @input="currentTime = ($event.target as HTMLInputElement).valueAsNumber"
      />
      <div class="transition-opacity duration-200 ease-in-out opacity-0 hover:opacity-100">
        <div
          v-if="showTime"
          class="absolute bottom-1 w-full px-1 flex place-content-between text-[10px]"
        >
          <CurrentTime format="m:s"></CurrentTime>
          <TotalTime format="m:s"></TotalTime>
        </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
