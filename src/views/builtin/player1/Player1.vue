<script setup lang="ts">

import MediaCover from "@/components/current/MediaCover.vue";
import MediaTitle from "@/components/current/MediaTitle.vue";
import MediaArtist from "@/components/current/MediaArtist.vue";
import MediaUsername from "@/components/current/MediaUsername.vue";
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import CurrentTime from "@/components/current/CurrentTime.vue";
import TotalTime from "@/components/current/TotalTime.vue";
import {usePlayInfoStore} from "@/stores/playinfo";
import CurrentLyric from "@/components/current/CurrentLyric.vue";
import ScrollLeftRight from "@/components/common/ScrollLeftRight.vue";

const scrollSpan = ref<HTMLElement | null>(null);

const playInfoStore = usePlayInfoStore();

const progressPercentage = computed(() => {
  if (playInfoStore.duration > 0) {
    return (playInfoStore.timePos / playInfoStore.duration) * 100;
  }
  return 0;
});

</script>

<template>
  <div class="grid grid-cols-3 myfont">
    <div class="col-span-1 p-4 justify-center content-center">
      <MediaCover></MediaCover>
    </div>
    <div class="col-span-2 pt-4 pb-4">
      <div class="flex flex-col space-y-4 content-center">
        <ScrollLeftRight :stay_ms="1000" :px_per_ms="50">
          <MediaTitle></MediaTitle> - <MediaUsername></MediaUsername>
        </ScrollLeftRight>
        <div>
          <current-lyric class="text-nowrap"></current-lyric>
        </div>
        <div class="flex flex-row items-center space-x-2 pr-2">
          <current-time format="m:s"></current-time>
          <div class="flex-grow progress-bar-background rounded-full h-2 relative">
            <div
                class="progress-bar absolute h-2 rounded-full"
                :style="{ width: progressPercentage + '%' }"
            ></div>
          </div>
        <total-time format="m:s"></total-time>
      </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.progress-bar-background {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity))
}
.progress-bar {
  --tw-bg-opacity: 1;
  background-color: rgb(102, 204, 255)
}

.media-cover {
  border-radius:16%;
  object-fit: cover;
  aspect-ratio: 1/1;
}

.myfont {
  width: 575px;
  font-family: '加粉圓', sans-serif;
  text-shadow: 1px 1px 2px rgb(118, 118, 118);
  font-size: 20px;
}

</style>
