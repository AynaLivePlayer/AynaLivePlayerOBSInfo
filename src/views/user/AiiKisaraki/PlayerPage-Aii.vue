<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-01-09 14:00:00
 * @LastEditors: Aii如樱如月 morikawa2021@163.com
 * @LastEditTime: 2025-01-12 23:13:50
 * @FilePath: \AynaLivePlayerOBSInfo\src\views\user\AiiKisaraki\PlayerPage-Aii.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="ts" setup>
import MediaCover from "@/components/current/MediaCover.vue";
import MediaTitle from "@/components/current/MediaTitle.vue";
import MediaArtist from "@/components/current/MediaArtist.vue";
import { computed, onMounted, ref, watch } from "vue";
import CurrentTime from "@/components/current/CurrentTime.vue";
import TotalTime from "@/components/current/TotalTime.vue";
import { usePlayInfoStore } from "@/stores/playinfo";
import CurrentLyricCN from "@/components/current/CurrentLyricCN.vue";
import ScrollLeftRight from "@/components/common/ScrollLeftRight.vue";
import PlaylistAii from "@/views/user/AiiKisaraki/Playlist-Aii.vue";
import PlayLyricAii from "@/views/user/AiiKisaraki/components/PlayLyric-Aii.vue";

const playInfoStore = usePlayInfoStore();

console.log(playInfoStore);
const playStatus = computed(() => !playInfoStore.paused);
const isShowPlaylist = computed(() => {
  const startShowRef = playInfoStore.duration - 0.95 * playInfoStore.duration > 15 ? 0.95 * playInfoStore.duration : playInfoStore.duration - 15;
  const endShowRef = 0.02 * playInfoStore.duration > 5 ? 0.02 * playInfoStore.duration : 5;
  if (playInfoStore.timePos < startShowRef && playInfoStore.timePos > endShowRef) {
    return false;
  }
  return true;
});

const progressPercentage = computed(() => {
  if (playInfoStore.duration > 0) {
    return (playInfoStore.timePos / playInfoStore.duration) * 100;
  }
  return 0;
});
</script>

<template>
    <div class="aii-player relative rounded-3xl border-2 border-indigo-300 shadow-lg border-dashed">
        <div class="aii-player-topbar">
          <img class="aii-player-topbar-icon" src="@/assets/imgs/proj_icon.jpg" alt="">
          <div class="aii-player-topbar-tilte">
            卡西米尔点歌机——直播中
          </div>
          <div class="aii-player-decoration-btn" id="btn-close"></div>
          <div class="aii-player-decoration-btn" id="btn-extend"></div>
          <div class="aii-player-decoration-btn" id="btn-minimize"></div>
        </div>
      <div class="aii-player-al-disk">
        <img
            src="@/assets/imgs/Aiikisaraki/needle-ab.png"
            alt=""
            class="aii-player-img-needle"
            :class="{ 'aii-player-img-needle-active': !playStatus }"
        />
        <div class="aii-player-cd-cover">
          <img src="@/assets/imgs/Aiikisaraki/cd.png" alt="" class="aii-player-img-cd" />
          <MediaCover
              class="aii-player-img-al"
              :class="{ 'aii-player-img-al-active': playStatus, 'aii-player-img-al-paused': !playStatus }"
          />
        </div>
      </div>
        <div class="aii-player-lyrics">
          <PlayLyricAii :lyrics="playInfoStore.lyrics"/>
        </div>
        <div class="bottom-player absolute bottom-0 grid grid-cols-3 grid-rows-1">
          <img src="@/assets/imgs/Aiikisaraki/star.png" alt="" class="aii-player-bottom-star-1">
          <img src="@/assets/imgs/Aiikisaraki/star.png" alt="" class="aii-player-bottom-star-2">
          <div class="aii-player-bottom-progress-bar">
            <CurrentTime format="m:s" class="bottom-player-current-time"/>
            <div class="aii-player-bottom-progress-bar-back">
              <div class="aii-player-bottom-progress-bar-inner" :style="`width:${progressPercentage}%`"></div>
            </div>
            <TotalTime format="m:s" class="bottom-player-total-time"/>
          </div>

          <div class="p-2 bottom-music-info-box">
            <div class="bottom-music-info">
              <MediaCover class="bottom-cover-img"/>
              <div class="bottom-music-detail">
                <ScrollLeftRight :stay_ms="1000" :px_per_ms="50" class="bottom-music-title">
                  <MediaTitle/>
                </ScrollLeftRight>
                <ScrollLeftRight :stay_ms="1000" :px_per_ms="50" class="bottom-music-artist">
                  <MediaArtist/>
                </ScrollLeftRight>
              </div>
            </div>
          </div>
          <div class="p-2 bottom-bulletin-board col-span-2"></div>
        </div>
        <PlaylistAii :height="900" class="aii-player-playlist" v-if="isShowPlaylist"></PlaylistAii>
        <div class="aii-player-bulletin-board">

        </div>
    </div>
</template>

<style scoped lang="less">
.aii-player {
    width: 1920px;
    height: 1080px;
    overflow: hidden;
    position: relative;
    background-color: #fffaf5;
    font-family: '江城圆体 600W', sans-serif;
  .aii-player-playlist {
    position: absolute;
    left: 0;
    top: 70px;
    z-index: 3;
  }
  .aii-player-topbar {
    width: 100%;
    height: 50px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-image: linear-gradient(to right, #ed927e, #fdd0bf);
    color: #fff;
    font-size: 28px;
    .aii-player-topbar-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 3px solid #5c6dc2;
      position: absolute;
      top: 5px;
      left: 15px;
    }
    .aii-player-topbar-tilte {
      position: absolute;
      top: 5px;
      bottom: 0;
      left: 70px;
      margin: auto 0;
    }
    .aii-player-decoration-btn {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      box-shadow: 0 0 5px #333333;
    }
    #btn-close {
      position: absolute;
      top: 15px;
      right: 30px;
      background-image: radial-gradient(circle, #ad1d35, #ffa8b5);
    }
    #btn-extend {
      position: absolute;
      top: 15px;
      right: 60px;
      background-image: radial-gradient(circle, #c2850d, #f6eab9);
    }
    #btn-minimize {
      position: absolute;
      top: 15px;
      right: 90px;
      background-image: radial-gradient(circle, #249d09, #cdf6b9);
    }
  }
  .aii-player-al-disk {
    width: 30%;
    height: 70%;
    position: absolute;
    overflow: hidden;
    top: 200px;
    left: 20%;
    .aii-player-img-needle {
      width: 200px;
      z-index: 2;
      position: absolute;
      top: 30px;
      left: 150px;
      transform-origin: 0 0;
      transform: rotate(-15deg);
      transition: all 1.5s;
    }
    .aii-player-img-needle-active {
      width: 200px;
      z-index: 2;
      position: absolute;
      top: 30px;
      left: 150px;
      transform-origin: 0 0;
      transform: rotate(-40deg);
      transition: all 1.5s;
    }
    .aii-player-cd-cover {
      width: 500px;
      height: 500px;
      position: absolute;
      top: 150px;
      .aii-player-img-cd {
        width: 100%;
        height: 100%;
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
      .aii-player-img-al {
        width: 75%;
        height: 75%;
        border-radius: 50%;
        z-index: 0;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        animation: aii-player-rotate-ar 10s linear infinite;
      }

      .aii-player-img-al-active {
        animation-play-state: running;
      }

      .aii-player-img-al-paused {
        animation-play-state: paused;
      }

      @keyframes aii-player-rotate-ar {
        0% {
          transform: rotateZ(0deg);
        }
        100% {
          transform: rotateZ(360deg);
        }
      }
    }
  }
  .aii-player-lyrics {
    width: 50%;
    height: 70%;
    position: absolute;
    right: 30px;
    bottom: 100px;
  }
  .aii-player-bulletin-board {
    width: 60%;
    height: 100px;
    position: absolute;
    top: 70px;
    right: 40px;
    border-radius: 20px;
    border: 3px dashed #257e9b;
    background-color: #e0f2ffaf;
    box-shadow: 2px 2px 5px #999999;
  }
  .bottom-player {
    width: 1920px;
    height: 70px;
    background-color: #b1cfff;
    .aii-player-bottom-star-1 {
      width: 40px;
      height: 40px;
      position: absolute;
      top: -20px;
      left: 5px;
      z-index: 2;
      transform: rotate(-20deg);
    }
    .aii-player-bottom-star-2 {
      width: 20px;
      height: 20px;
      position: absolute;
      top: -10px;
      left: 45px;
      z-index: 2;
      transform: rotate(15deg);
      filter: brightness(120%) contrast(120%) saturate(200%) hue-rotate(90deg);
    }
    .aii-player-bottom-progress-bar {
      width: 100%;
      //height: 0;
      background-color: #cdcdcd;
      border-radius: 10px;
      position: absolute;
      top: -4px;
      left: 0;
      right: 0;
      margin: 0 auto;
      z-index: 1;
      box-sizing: border-box;
      .bottom-player-current-time {
        position: absolute;
        color: #7997e2;
        font-size: 14px;
        top: 5px;
        left: 155px;
      }
      .bottom-player-total-time {
        position: absolute;
        font-size: 14px;
        color: #293c74;
        top: 5px;
        right: 145px;
      }
      .aii-player-bottom-progress-bar-back {
        width: 85%;
        background-color: #93a1bd;
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        .aii-player-bottom-progress-bar-inner {
          //width: 40%;
          height: 4px;
          background-image: linear-gradient(to right,white 25%, #b5dcff 50%, #ef53e8 75%, #54010b 100%);
          //border: 4px solid black;
          border-radius: 10px;
          transition: width 0.5s ease-in-out;
        }
      }
    }
    .bottom-music-info-box {
      width: 100%;
      height: 100%;
      position: relative;
      .bottom-music-info {
        width: 77%;
        height: 100%;
        //background-color: black;
        background-image: linear-gradient(to right, white, #b1cfff 100%);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        border-radius: 10px;
        display: flex;
        .bottom-cover-img {
          width: 70px;
          height: 70px;
          border-radius: 10px;
          border: 3px solid white;
          box-shadow: 2px 2px 5px #767676;
        }
        .bottom-music-detail {
          width: 70%;
          margin-top: 20px;
          margin-left: 10px;
          .bottom-music-title {
            width: 100%;
            color: #000c60;
            font-size: 20px;
          }
          .bottom-music-artist {
            width: 100%;
            color: #990077;
            font-size: 14px;
          }
        }
      }
    }
    .bottom-bulletin-board {
      width: 85%;
      background-image: radial-gradient(circle at center, #e7fffe 0, #d1e3ff, #fbfdff 100%);
      margin: 10px;
      border-radius: 20px;
      border: 1px dashed #3d7cb8;
      box-shadow: inset 0 0 5px gray;
    }
  }
}
</style>