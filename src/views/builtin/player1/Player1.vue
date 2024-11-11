<script setup lang="ts">

import MediaCover from "@/components/current/MediaCover.vue";
import MediaTitle from "@/components/current/MediaTitle.vue";
import MediaArtist from "@/components/current/MediaArtist.vue";
import MediaUsername from "@/components/current/MediaUsername.vue";
import {computed, onMounted, ref, watch} from "vue";
import CurrentTime from "@/components/current/CurrentTime.vue";
import TotalTime from "@/components/current/TotalTime.vue";
import {usePlayInfoStore} from "@/stores/playinfo";
import CurrentLyric from "@/components/current/CurrentLyric.vue";

const scrollSpan = ref<HTMLElement | null>(null);

// todo: finish scrolling, i give up on doing this stupid css
// fuck css, and javascript and html and frontend

const playInfoStore = usePlayInfoStore();

const progressPercentage = computed(() => {
  if (playInfoStore.duration > 0) {
    return (playInfoStore.timePos / playInfoStore.duration) * 100;
  }
  return 0;
});


let stopPreviousScroll: () => void = () => {};

const stopScroll = () => {
  if (stopPreviousScroll) {
    stopPreviousScroll();
  }
}

const scrollLeftRight = (node: any, px_per_ms:number, stay_ms:number) => {
  if (!node.value) return;

  const span = node.value;
  const parent = span.parentElement;
  if (!parent) return;
  const duration = span.scrollWidth * px_per_ms;

  let currentTimeout: number|undefined = undefined;

  const scrollLeft = () => {
    console.log("left");
    span.style.transition = "transform " + duration + "ms linear";
    span.style.transform = `translateX(-${span.scrollWidth - parent.clientWidth}px)`;
    currentTimeout = setTimeout(scrollRight, duration+stay_ms)
  };

  const scrollRight = () => {
    console.log("right");
    span.style.transition = "transform " + duration + "ms linear";
    span.style.transform = `translateX(0)`;
    currentTimeout = setTimeout(scrollLeft, duration+stay_ms)
  };

  scrollLeft();

  stopPreviousScroll = () => {
    console.log("stop");
    clearTimeout(currentTimeout);
    span.style.transition = 'none';
    span.style.transform = 'translateX(0)';
  };
}

const startScrolling = () => {
  if (!scrollSpan.value) return;
  stopScroll();

  const span = scrollSpan.value;
  const parent = span.parentElement;
  console.log(span.scrollWidth, parent?.clientWidth);
  if (parent && span.scrollWidth > parent.clientWidth) {
    scrollLeftRight(scrollSpan, 20,300);
  }
};

onMounted(() => {
  const element = scrollSpan.value;
  const mutationObserver = new MutationObserver(() => {
    console.log(`width changed ${element?.scrollWidth}, restart scrolling if needed`);
    startScrolling();
  });
  mutationObserver.observe(element, {
    childList: true,
    subtree: true,
    characterData: true,
  });
});



</script>

<template>
  <div class="grid grid-cols-3 myfont">
    <div class="col-span-1 p-4 justify-center content-center">
      <MediaCover></MediaCover>
    </div>
    <div class="col-span-2 pt-4 pb-4">
      <div class="flex flex-col space-y-4 content-center">
        <div ref="scrollContainer" class="overflow-hidden" style="width: 100%;">
          <span ref="scrollSpan"
                class="whitespace-nowrap block">
            <MediaTitle></MediaTitle> - <MediaUsername></MediaUsername>
          </span>
        </div>
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

.myfont {
  width: 575px;
  font-family: '加粉圓', sans-serif;
  text-shadow: 1px 1px 2px rgb(118, 118, 118);
  font-size: 20px;
}

</style>
