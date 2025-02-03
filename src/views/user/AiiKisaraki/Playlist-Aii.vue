<script lang="ts" setup>
import { usePlayInfoStore } from "@/stores/playinfo";
import {computed, watch} from "vue";
import MediaCover from "@/components/current/MediaCover.vue";
import ScrollLeftRight from "@/components/common/ScrollLeftRight.vue";
import MediaTitle from "@/components/current/MediaTitle.vue";
import ScrollUpDown from "@/components/common/ScrollUpDown.vue";
import PlaylistItem from "@/views/user/AiiKisaraki/components/PlaylistItem.vue";

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
        <PlaylistItem v-for="(item, index) in playlist" :key="index" :item="item" :index="index + 1" />
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
    }
  }
</style>