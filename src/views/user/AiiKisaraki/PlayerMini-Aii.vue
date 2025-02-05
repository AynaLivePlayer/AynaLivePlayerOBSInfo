<script lang="ts" setup>
import MediaCover from "@/components/current/MediaCover.vue";
import MediaTitle from "@/components/current/MediaTitle.vue";
import MediaArtist from "@/components/current/MediaArtist.vue";
import { computed, onMounted, ref, watch } from "vue";
import CurrentTime from "@/components/current/CurrentTime.vue";
import TotalTime from "@/components/current/TotalTime.vue";
import { usePlayInfoStore } from "@/stores/playinfo";
import ScrollLeftRight from "@/components/common/ScrollLeftRight.vue";
const playInfoStore = usePlayInfoStore();

const playStatus = computed(() => {
  if (playInfoStore.paused === null) return false;
  return !playInfoStore.paused;
});

</script>

<template>
  <div class="aii-mini-player">
    <div
        class="aii-mini-player-al-cover"
        :class="{ 'aii-mini-player-img-al-active': playStatus, 'aii-mini-player-img-al-paused': !playStatus }"
    >
      <MediaCover/>
    </div>
    <div class="aii-mini-player-media-info">
      <ScrollLeftRight :stay_ms="1000" :px_per_ms="50">
        <p> <MediaTitle/> - <MediaArtist/> </p>
      </ScrollLeftRight>
    </div>
    <div class="aii-mini-player-duration">
      <CurrentTime format="m:s"/> / <TotalTime format="m:s"/>
    </div>
    <img src="@/assets/imgs/Aiikisaraki/star.png" alt="" class="aii-mini-player-star">
  </div>
</template>

<style scoped lang="less">
.aii-mini-player {
  width: 200px;
  height: 70px;
  background-image: linear-gradient(#e0fdff, #f9faff);
  border-radius: 35px;
  border: 3px solid #a5bcdf;
  box-shadow: 2px 2px 4px gray;
  font-family: '江城圆体 600W', sans-serif;
  font-size: 18px;
  position: relative;
  .aii-mini-player-al-cover {
    width: auto;
    height: 100%;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    animation: aii-mini-player-rotate-ar 10s linear infinite;
    border: 2px dashed #98bed4;
  }
  .aii-mini-player-img-al-active {
    animation-play-state: running;
  }

  .aii-mini-player-img-al-paused {
    animation-play-state: paused;
  }

  @keyframes aii-mini-player-rotate-ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
  .aii-mini-player-media-info {
    width: 50%;
    position: absolute;
    top: 5px;
    left: 75px;
    color: #174380;
  }
  .aii-mini-player-duration {
    width: 50%;
    position: absolute;
    bottom: 5px;
    left: 75px;
    font-size: 16px;
    color: #922e4b;
  }
  .aii-mini-player-star {
    width: 25px;
    height: 25px;
    position: absolute;
    bottom: 0px;
    right: -5px;
    z-index: 2;
    transform: rotate(20deg);
    filter: brightness(120%) contrast(120%) saturate(200%) hue-rotate(80deg);
  }
}
</style>