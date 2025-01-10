<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-01-09 13:55:57
 * @LastEditors: Aiikisaraki morikawa@kimisui56.work
 * @LastEditTime: 2025-01-10 23:13:59
 * @FilePath: \AynaLivePlayerOBSInfo\src\views\user\AiiKisaraki\Player-Aii.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="ts" setup>
import MediaCover from "@/components/current/MediaCover.vue";
import MediaTitle from "@/components/current/MediaTitle.vue";
import MediaArtist from "@/components/current/MediaArtist.vue";
import MediaUsername from "@/components/current/MediaUsername.vue";
import { computed, onMounted, ref, watch } from "vue";
import CurrentTime from "@/components/current/CurrentTime.vue";
import TotalTime from "@/components/current/TotalTime.vue";
import { usePlayInfoStore } from "@/stores/playinfo";

const scrollSpan = ref<HTMLElement | null>(null);
const shouldScroll = ref(false);

const playInfoStore = usePlayInfoStore();

const playStatus = ref(true);

const progressPercentage = computed(() => {
  if (playInfoStore.duration > 0) {
    return (playInfoStore.timePos / playInfoStore.duration) * 100;
  }
  return 0;
});

console.log(playStatus.value);

</script>

<template>
    <div class="aii-player-mini grid grid-cols-3">
        <div class="player-album col-span-1 p-4 justify-center content-center">
          <div class="album-img">
            <img class="cd-img" src="@/assets/imgs/Aiikisaraki/cd.png" alt="">
            <div class="cover-ctl" :class="{ img_al_active: playStatus, img_al_pauesd: !playStatus }">
               <MediaCover/>
            </div>
          </div>
        </div>
    </div>
</template>

<style scoped>
  .aii-player-mini {
    width: 600px;
    font-family: '加粉圓', sans-serif;
    text-shadow: 1px 1px 2px rgb(118, 118, 118);
    font-size: 20px;
  }
  .player-album {
    width: 200px;
    height: 200px;
    padding: 0;
  }
  .album-img {
    margin: 0;
    width: 200px;
    height: 200px;
    position: relative;
    overflow: hidden;
  }
  .album-img .cd-img {
    width: 180px;
    height: 180px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
  .album-img .cover-ctl {
    width: 120px;
    height: 120px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
    animation: rotate_ar 10s linear infinite;
  }
  .album-img .cover-ctl .media-cover {
    border-radius: 50%;
  }
  .album-img .img_al_active {
      animation-play-state: running;
  }
  .album-img .img_al_pauesd {
      animation-play-state: paused;
  }
  @keyframes rotate_ar {
      0% {
        transform: translate(-50%, -50%) rotateZ(0deg);
      }
      100% {
        transform: translate(-50%, -50%) rotateZ(360deg);
      }
  }
</style>