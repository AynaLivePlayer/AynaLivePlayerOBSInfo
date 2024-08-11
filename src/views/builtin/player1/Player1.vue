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
const shouldScroll = ref(false);

// const checkOverflow = () => {
//   if (scrollSpan.value) {
//     const parentWidth = scrollSpan.value.parentElement?.clientWidth || 0;
//     const spanWidth = scrollSpan.value.scrollWidth;
//
//     shouldScroll.value = spanWidth > parentWidth;
//   }
// };

const playInfoStore = usePlayInfoStore();

const progressPercentage = computed(() => {
  if (playInfoStore.duration > 0) {
    return (playInfoStore.timePos / playInfoStore.duration) * 100;
  }
  return 0;
});


// onMounted(() => {
//   window.addEventListener('resize', checkOverflow);
//   setTimeout(checkOverflow,1000)
// });
//
// watch([scrollSpan], checkOverflow);

</script>

<template>
  <div class="grid grid-cols-3 myfont">
    <div class="col-span-1 p-4 justify-center content-center">
      <MediaCover></MediaCover>
    </div>
    <div class="col-span-2 pt-4 pb-4">
      <div class="flex flex-col space-y-4 content-center">
<!--        <span ref="scrollSpan"-->
<!--              :class="{'scrolling-text': shouldScroll, 'no-scroll': !shouldScroll}"-->
<!--              @resize="checkOverflow"-->
<!--              class="whitespace-nowrap">-->
        <span ref="scrollSpan"
              class="whitespace-nowrap">
          <MediaTitle></MediaTitle> - <MediaUsername></MediaUsername>
        </span>
        <div>
          <current-lyric class="text-nowrap"></current-lyric>
        </div>
        <div class="flex flex-row items-center space-x-2 pr-2">
          <current-time format="m:s"></current-time>
          <div class="flex-grow progress-bar-background rounded-full h-2 relative">
            <div
                class="absolute progress-bar h-2 rounded-full"
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

.scrolling-text {
  white-space: nowrap;
  display: inline-block;
  animation: scroll 10s linear infinite; /* Adjust the timing as needed */
}

@keyframes scroll {
  0% {
    transform: translateX(5vw); /* Start at the initial position */
  }
  50% {
    transform: translateX(calc(100% - 105vw)); /* Scroll left until all text shows */
  }
  100% {
    transform: translateX(5vw); /* Scroll back to the initial position */
  }
}

.no-scroll {
  animation: none; /* Stops the animation when scrolling is not needed */
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
