<script lang="ts" setup>
import { usePlayInfoStore } from "@/stores/playinfo";
import {computed, watch} from "vue";
import MediaCover from "@/components/current/MediaCover.vue";
import ScrollLeftRight from "@/components/common/ScrollLeftRight.vue";
import MediaTitle from "@/components/current/MediaTitle.vue";
import ScrollUpDown from "@/components/common/ScrollUpDown.vue";

const playInfoStore = usePlayInfoStore();
const playlist = computed(() => playInfoStore.playlist);
console.log(playlist)

</script>

<template>
  <div class="aii-playlist rounded-tr-3xl rounded-br-3xl border-t border-r border-b border-dashed border-t-4 border-r-4 border-b-4">
    <div class="aii-playlist-title">Playlist</div>
    <div class="aii-playlist-decoration">
      <div class="aii-playlist-title-dividing-line"></div>
      <img src="@/assets/imgs/Aiikisaraki/star.png" alt="" class="aii-playlist-title-dividing-line-star">
    </div>
    <div class="aii-playlist-list">
<!--      以下为测试数据代码-->
<!--      <div>-->
<!--        {{index + 1}}. {{item.Info.Title}} - {{item.Info.Artist}}-->
<!--      </div>-->
      <ScrollUpDown :stay_ms="2000" :px_per_ms="50" class="aii-playlist-scroll">
        <div class="aii-playlist-item rounded-2xl grid grid-rows-2 grid-cols-3 gap-4" v-for="(item,index) in playlist">
          <img src="@/assets/imgs/Aiikisaraki/star.png" alt="" class="aii-playlist-item-star">
          <div class="aii-playlist-item-num">
            <p>{{ index + 1 }}</p>
          </div>
          <div class="aii-playlist-item-album">
            <img class="aii-playlist-item-img" :src="item.Info.Cover.Url" alt=""/>
          </div>
          <div class="p-3 aii-playlist-item-aritist">
            <ScrollLeftRight :stay_ms="1500" :px_per_ms="50">
              <span>{{ item.Info.Artist }}</span>
            </ScrollLeftRight>
          </div>
          <div class="p-4 col-span-2 aii-playlist-item-title">
            <ScrollLeftRight :stay_ms="1500" :px_per_ms="50">
              <span>{{ item.Info.Title }}</span>
            </ScrollLeftRight>
          </div>
          <div class="p-2 col-span-3 aii-playlist-item-user">
            <p>点歌用户：</p>
            <div class="aii-playlist-item-user-name">
              <ScrollLeftRight :stay_ms="1500" :px_per_ms="50">
                <span>{{ item.User.Name }}</span>
              </ScrollLeftRight>
            </div>
          </div>
        </div>
      </ScrollUpDown>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .aii-playlist {
    width: 600px;
    height: 1000px;
    border-color: #005f7f;
    background-color: #f3ffff;
    margin: 50px 0 0 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.3);
    .aii-playlist-title {
      font-size: 48px;
      font-family: '江城圆体 600W', sans-serif;
      color: #2a083b;
      margin: 10px;
      position: relative;
    }
    .aii-playlist-decoration {
      width: 100%;
      margin: 0 0 25px 0;
      position: relative;
      .aii-playlist-title-dividing-line {
        margin: 0 0 0 15px;
        width: 90%;
        border-bottom: 3px solid #ff548233;
      }
      img.aii-playlist-title-dividing-line-star {
        width: 40px;
        height: 40px;
        position: absolute;
        top: -20px;
        right: 30px;
        transform: rotate(30deg);
      }
    }
    .aii-playlist-list {
      width: 100%;
      height: 870px;
      overflow: hidden;
      //display: flex;
      //align-items: center;
      //flex-direction: column;

      .aii-playlist-item {
        margin: 35px auto 10px;
        width: 80%;
        height: 120px;
        font-family: '江城圆体 600W', sans-serif;
        position: relative;
        background-color: rgba(255, 255, 255, 0.35);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        border: 1px solid rgba(255, 255, 255, 0.18);
        box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
        -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0 6px 15px 0px;
        .aii-playlist-item-star {
          width: 35px;
          height: 35px;
          transform: rotate(-20deg);
          position: absolute;
          top: -15px;
          left: -15px;
          z-index: 1;
          //更改星星色调
          filter: brightness(90%) contrast(110%) saturate(120%) hue-rotate(200deg);
        }
        .aii-playlist-item-num {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 3px solid #ff548233;
          overflow: hidden;
          color: #f1f9fd;
          background-color: #7eb3ed;
          position: absolute;
          left: -20px;
          bottom: -20px;
          box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
          -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0 6px 15px 0px;
          p {
            width: 40px;
            height: 40px;
            font-size: 40px;
            line-height: 45px;
            text-align: center;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
          }
        }
        .aii-playlist-item-album {
          width: 90px;
          height: 90px;
          position: absolute;
          top: -20px;
          right: -30px;
          overflow: hidden;
          border-radius: 100%;
          border: 3px solid #9f447544;
          box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
          -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0 6px 15px 0px;
          img.aii-playlist-item-img {
            width: 90px;
            height: 90px;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            z-index: 1;
          }
        }
        .aii-playlist-item-aritist {
          width: 100%;
          height: 60px;
          font-size: 28px;
          color: #3a4ca8;
        }
        .aii-playlist-item-title {
          width: 80%;
          height: 60px;
          font-size: 24px;
          color: #b81f31;
        }
        .aii-playlist-item-user {
          width: 100%;
          height: 40px;
          display: flex;
          justify-content: flex-end;
          font-size: 20px;
          color: #013454;
          p {
            width: 100px;
            height: 100%;
          }
          .aii-playlist-item-user-name {
            width: 100px;
            height: 100%;
          }
        }
      }
    }
  }
</style>