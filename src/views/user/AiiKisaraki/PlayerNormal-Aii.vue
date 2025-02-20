<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-01-09 13:55:57
 * @LastEditors: Aii如樱如月 morikawa2021@163.com
 * @LastEditTime: 2025-01-14 12:25:49
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
import CurrentLyricCN from "@/components/current/CurrentLyricCN.vue";
import ScrollLeftRight from "@/components/common/ScrollLeftRight.vue";

const playInfoStore = usePlayInfoStore();

const playStatus = computed(() => {
  if (playInfoStore.paused === null) return false;
  return !playInfoStore.paused;
});

const progressPercentage = computed(() => {
  if (playInfoStore.duration > 0) {
    return (playInfoStore.timePos / playInfoStore.duration) * 100;
  }
  return 0;
});

</script>

<template>
    <div class="aii-player-normal grid grid-cols-3 w-4 h-4 rounded-full border-2 border-indigo-300 shadow-lg border-dashed">
      <div class="player-album col-span-1 p-4 justify-center content-center">
        <img class="cd-img" src="@/assets/imgs/Aiikisaraki/cd.png" alt="">
        <div class="cover-ctl" :class="{ img_al_active: playStatus, img_al_pauesd: !playStatus }">
            <MediaCover/>
        </div>
      </div>
      <div class="music-info col-span-2 flex flex-col items-start justify-between">
        <div class="title-info flex justify-content-start">
          <div class="info-type text-indigo-900">标题：</div>
          <ScrollLeftRight :stay_ms="1000" :px_per_ms="50" class="media-title-info">
            <MediaTitle class="text-indigo-700"/>
          </ScrollLeftRight>
        </div>
        <div class="artist-info flex justify-content-start">
          <div class="info-type text-indigo-900">艺人：</div>
          <ScrollLeftRight :stay_ms="1000" :px_per_ms="50" class="media-artist-info">
            <MediaArtist class="text-indigo-700"/>
          </ScrollLeftRight>
        </div>
        <div class="user-info flex justify-content-start">
          <div class="info-type text-indigo-900">点歌用户：</div>
          <ScrollLeftRight :stay_ms="1000" :px_per_ms="50" class="username-info">
            <MediaUsername class="text-indigo-700" />
          </ScrollLeftRight>
        </div>
        <div class="lyric text-pink-600">
          <ScrollLeftRight :stay_ms="1000" :px_per_ms="50" class="lyric">
            <CurrentLyricCN class="text-nowrap"/>
          </ScrollLeftRight>
        </div>
        <!-- 参考内置Player1的进度条实现 -->
        <div class="progress-bar flex flex-row items-center space-x-2 pr-2">
          <current-time format="m:s"></current-time>
          <div class="flex-grow progress-bar-bg rounded-full h-2 relative">
            <div
                class="progress-bar-body absolute h-2 rounded-full"
                :style="{ width: progressPercentage + '%' }"
            ></div>
          </div>
          <total-time format="m:s"></total-time>
        </div>
      </div>
    </div>
</template>

<style scoped>
  .aii-player-normal {
    width: 600px;
    height: 200px;
    font-family: '江城圆体 600W', sans-serif;
    text-shadow: 1px 1px 2px rgb(118, 118, 118);
    font-size: 20px;
    background-image: linear-gradient(#e0fdff, #f9faff);
  }
  .player-album {
    width: 200px;
    height: 200px;
    padding: 0;
    position: relative;
    overflow: hidden;
  }
  .player-album .cd-img {
    width: 180px;
    height: 180px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
  .player-album .cover-ctl {
    width: 120px;
    height: 120px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
    animation: rotate_ar 10s linear infinite;
  }
  .player-album .cover-ctl .media-cover {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }
  .player-album .img_al_active {
      animation-play-state: running;
  }
  .player-album .img_al_pauesd {
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
  .music-info {
    width: 400px;
    height: 200px;
    padding: 15px 20px 15px 0;
  }
  .info-type {
    width: 145px;
  }
  .media-title-info {
    width: 200px;
  }
  .title-info {
    width: 340px;
    height: 30px;
  }
  .artist-info {
    width: 340px;
    height: 30px;
  }
  .user-info {
    width: 340px;
    height: 30px;
  }
  .progress-bar {
    width: 340px;
    height: 30px;
    font-size: 14px;
  }
  .lyric {
    width: 340px;
    height: 30px;
  }
  .progress-bar-bg{
    --tw-bg-opacity: 1;
    background-color: rgb(229 231 235 / var(--tw-bg-opacity))
  }
  .progress-bar-body {
    --tw-bg-opacity: 1;
    background-color: rgb(6, 28, 102)
  }
</style>