<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-01-09 14:00:00
 * @LastEditors: Aii 如樱如月 morikawa@kimisui56.work
 * @LastEditTime: 2025-03-23 12:10:28
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
import PlayerEvent from "@/views/user/AiiKisaraki/components/PlayerEvent.vue";

const playInfoStore = usePlayInfoStore();

const playStatus = computed(() => !playInfoStore.paused);
// 设置播放列表和完整歌词是否显示，播放列表如果显示，那么歌词则不显示，反之亦然
// 如果末尾10%时长大于25s，那么在播放进度到达时长的90%前和5%后不显示播放列表
// 如果末尾10%时长小于25s，那么在播放进度到达最后25s前和开始10秒后不显示播放列表
const isShowPlaylist = computed(() => {
  const startShowRef = playInfoStore.duration - 0.8 * playInfoStore.duration > 40 ? 0.8 * playInfoStore.duration : playInfoStore.duration - 40;
  const endShowRef = 0.05 * playInfoStore.duration > 10 ? 0.05 * playInfoStore.duration : 10;
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

const playlistStatus = computed(() => {
  if(playInfoStore.playlist.length === 0) {
    return "当前列表没有歌曲哦！"
  } else {
    return `当前列表有${playInfoStore.playlist.length}首歌~`;
  }
})
</script>

<template>
  <div class="aii-player relative rounded-3xl border-2 border-indigo-300 shadow-lg border-dashed">
    <div class="aii-player-topbar">
      <img class="aii-player-topbar-icon" src="@/assets/imgs/proj_icon.jpg" alt="">
      <div class="aii-player-topbar-tilte">
        卡西米尔点歌机——直播中
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        当前列表有{{playInfoStore.playlist.length}}首歌~
      </div>
      <div class="aii-player-decoration-btn" id="btn-close"></div>
      <div class="aii-player-decoration-btn" id="btn-extend"></div>
      <div class="aii-player-decoration-btn" id="btn-minimize"></div>
    </div>
    <PlayerEvent :playlistshowing="isShowPlaylist" />
    <div
        class="aii-player-al-disk"
        :class="{ 'aii-player-al-disk-left': !isShowPlaylist, 'aii-player-al-disk-right': isShowPlaylist }"
    >
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
    <div
        class="aii-player-lyrics"
        :class="{ 'aii-player-lyrics-active': !isShowPlaylist, 'aii-player-lyrics-hide': isShowPlaylist }"
    >
      <PlayLyricAii :lyrics="playInfoStore.lyrics" />
    </div>
    <div
        class="aii-player-mini-lyric"
        :class="{ 'aii-player-mini-lyric-active': isShowPlaylist, 'aii-player-mini-lyric-hide': !isShowPlaylist }"
    >
      <CurrentLyricCN/>
    </div>
    <div class="bottom-player absolute bottom-0 grid grid-cols-3 grid-rows-1">
      <img src="@/assets/imgs/Aiikisaraki/star.png" alt="" class="aii-player-bottom-star-1">
      <img src="@/assets/imgs/Aiikisaraki/star.png" alt="" class="aii-player-bottom-star-2">
      <img src="@/assets/imgs/Aiikisaraki/star.png" alt="" class="aii-player-bottom-star-3">
      <img src="@/assets/imgs/Aiikisaraki/star.png" alt="" class="aii-player-bottom-star-4">
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
      <div class="p-2 bottom-bulletin-board col-span-2">
        <div class="bottom-bulletin-board-content">
          点歌格式：点歌&nbsp;歌名&nbsp;歌手名（点歌与后面的词中间空格不可省略，歌手名可省略，可将歌名和歌手名换成bv号或者网易云中的歌曲ID）
        </div>
      </div>
    </div>
    <PlaylistAii :height="900" class="aii-player-playlist" :class="{'aii-player-playlist-active': isShowPlaylist, 'aii-player-playlist-hide': !isShowPlaylist }"></PlaylistAii>
    <div
        class="aii-player-playlist-status p-2"
        :class="{'aii-player-playlist-status-active': !isShowPlaylist, 'aii-player-playlist-status-hide': isShowPlaylist }"
    >
      <img src="@/assets/imgs/Aiikisaraki/star.png" alt="" class="aii-player-playlist-status-star-1">
      <p>{{playlistStatus}}</p>
    </div>
    <div class="aii-player-bulletin-board">
      <img src="@/assets/imgs/Aiikisaraki/star.png" alt="" class="aii-player-bulletin-board-star-1">
      <img src="@/assets/imgs/Aiikisaraki/star.png" alt="" class="aii-player-bulletin-board-star-2">
      <div class="aii-player-bulletin-board-title">
        Notice
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.aii-player {
  width: 100%;
  height: 100%;
  min-width: 1920px;
  min-height: 1080px;
  overflow: hidden;
  position: relative;
  background-color: #fffaf5;
  font-family: '江城圆体 600W', sans-serif;
  .aii-player-playlist {
    position: absolute;
    top: 70px;
    z-index: 3;
    transition: all 1s ease-in-out;
  }
  .aii-player-playlist-status {
    width: 80px;
    height: 380px;
    font-size: 30px;
    position: absolute;
    letter-spacing: 5px;
    top: 40%;
    z-index: 3;
    border-radius: 0 20px 20px 0;
    border-top: 4px solid #d899b3;
    border-right: 4px solid #d899b3;
    border-bottom: 4px solid #d899b3;
    background-image: linear-gradient(to right, white, #ffe6f9);
    transition: all 1s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 2px 5px gray;
    .aii-player-playlist-status-star-1 {
      width: 30px;
      height: 30px;
      position: absolute;
      top: -15px;
      left: 60px;
      z-index: 2;
      transform: rotate(20deg);
      filter: brightness(120%) contrast(120%) saturate(200%) hue-rotate(80deg);
    }
    p {
      writing-mode: vertical-lr;
      animation: playlist-status-font-blink-color 4s infinite;
    }
    @keyframes playlist-status-font-blink-color {
      0%, 100% {
        color: #bb517d;
      } /* 开始和结束时的颜色 */
      50% {
        color: #85a2d2;
      } /* 中间的颜色 */
    }
  }
  .aii-player-playlist-status-active {
    left: 0;
    opacity: 100%;
  }
  .aii-player-playlist-status-hide {
    left: -80px;
    opacity: 0;
  }
  .aii-player-playlist-active {
    left: 0;
    opacity: 100%;
  }
  .aii-player-playlist-hide {
    left: -600px;
    opacity: 0;
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
    width: 50%;
    height: 70%;
    position: absolute;
    overflow: hidden;
    top: 200px;
    transition: all 1s;
    .aii-player-img-needle {
      width: 200px;
      z-index: 2;
      position: absolute;
      top: 30px;
      left: 0;
      right: 0;
      margin: 0 auto;
      transform-origin: 0 0;
      transform: rotate(-15deg);
      transition: all 1.5s;
    }
    .aii-player-img-needle-active {
      transform: rotate(-40deg);
    }
    .aii-player-cd-cover {
      width: 500px;
      height: 500px;
      position: absolute;
      top: 150px;
      left: 0;
      right: 0;
      margin: 0 auto;
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
  .aii-player-al-disk-left {
    left: 0%;
  }
  .aii-player-al-disk-right {
    left: 46%;
  }
  .aii-player-lyrics {
    width: 50%;
    height: 70%;
    position: absolute;
    bottom: 100px;
    transition: all 1s;
  }
  .aii-player-lyrics-active {
    opacity: 100%;
    right: 0;
  }
  .aii-player-lyrics-hide {
    opacity: 0;
    right: -50%;
  }
  .aii-player-mini-lyric {
    width: 50%;
    height: 5%;
    position: absolute;
    left: 46%;
    color: #0d16a0;
    text-align: center;
    font-size: 40px;
    transition: all 1s;
    display: flex;
    justify-content: center;
  }
  .aii-player-mini-lyric-active {
    bottom: 15%;
    opacity: 100%;
  }
  .aii-player-mini-lyric-hide {
    bottom: -10%;
    opacity: 0;
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
    margin-top: 20px;
    .aii-player-bulletin-board-star-1 {
      width: 30px;
      height: 30px;
      position: absolute;
      top: -15px;
      left: 13%;
      z-index: 2;
      transform: rotate(20deg);
      filter: brightness(120%) contrast(120%) saturate(200%) hue-rotate(270deg);
    }
    .aii-player-bulletin-board-star-2 {
      width: 40px;
      height: 40px;
      position: absolute;
      bottom: -20px;
      right: 5px;
      z-index: 2;
      transform: rotate(20deg);
    }
    .aii-player-bulletin-board-title {
      width: 10%;
      height: 40px;
      position: absolute;
      background-color: #eacaef;
      top: -20px;
      left: 30px;
      border-radius: 10px;
      color: #4b0ea6;
      border: 3px solid #4b0ea6;
      font-size: 24px;
      text-align: center;
    }
  }
  .bottom-player {
    width: 100%;
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
    .aii-player-bottom-star-3 {
      width: 40px;
      height: 40px;
      position: absolute;
      top: 10px;
      right: 45px;
      z-index: 2;
      transform: rotate(15deg);
      filter: brightness(120%) contrast(120%) saturate(200%) hue-rotate(260deg);
    }
    .aii-player-bottom-star-4 {
      width: 20px;
      height: 20px;
      position: absolute;
      top: 40px;
      right: 120px;
      z-index: 2;
      transform: rotate(-20deg);
      filter: brightness(120%) contrast(120%) saturate(300%) hue-rotate(320deg);
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
        //width: 85%;
        background-color: #93a1bd;
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto 150px;
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
        //width: 77%;
        height: 100%;
        //background-color: black;
        background-image: linear-gradient(to right, white, #b1cfff 100%);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto 80px;
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
      display: flex;
      justify-content: center;
      align-items: center;
      .bottom-bulletin-board-content {
        width: 100%;
        height: 24px;
        color: #013454;
        font-size: 18px;
      }
    }
  }
}
</style>