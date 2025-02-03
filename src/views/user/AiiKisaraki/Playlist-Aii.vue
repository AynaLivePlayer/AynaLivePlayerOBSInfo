<script lang="ts" setup>
import { usePlayInfoStore } from "@/stores/playinfo";
import {computed, onMounted, ref, watch} from "vue";
import ScrollUpDown from "@/components/common/ScrollUpDown.vue";
import PlaylistItem from "@/views/user/AiiKisaraki/components/PlaylistItem.vue";

const playInfoStore = usePlayInfoStore();

interface Props {
  height: number;
}

const props = defineProps<Props>();

const playlistHeight = ref<number>(props.height? props.height : 1000);
const isShowAni = ref<boolean>(false);
onMounted(()=>{
  isShowAni.value = true;
})

</script>

<template>
  <div class="aii-playlist rounded-tr-3xl rounded-br-3xl border-t border-r border-b border-dashed border-t-4 border-r-4 border-b-4" :style="'height:'+ playlistHeight + 'px'">
    <div class="aii-playlist-title">Playlist</div>
    <div class="aii-playlist-decoration">
      <div class="aii-playlist-title-dividing-line"></div>
      <img src="@/assets/imgs/Aiikisaraki/star.png" alt="" class="aii-playlist-title-dividing-line-star-1">
      <img src="@/assets/imgs/Aiikisaraki/star.png" alt="" class="aii-playlist-title-dividing-line-star-2">
      <img src="@/assets/imgs/Aiikisaraki/star.png" alt="" class="aii-playlist-title-dividing-line-star-3">
    </div>
    <div class="aii-playlist-list">
      <ScrollUpDown :stay_ms="2000" :px_per_ms="50" class="aii-playlist-scroll">
        <PlaylistItem v-for="(item, index) in playInfoStore.playlist" :key="item.Info.Meta.Identifier" :item="item" :index="index + 1" :class="{'fly-in-bottom': isShowAni}"/>
      </ScrollUpDown>
      <div class="aii-playlist-bar"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .aii-playlist {
    width: 600px;
    //height: 1000px;
    border-color: #2e8cd8;
    //background-color: #f3ffff;
    background-image: linear-gradient(to right, #ffffff 25%, #cfffff 50%, #fff4e3 75%, #ffe5f7 100%);
    margin: 0;
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
      img.aii-playlist-title-dividing-line-star-1 {
        width: 40px;
        height: 40px;
        position: absolute;
        top: -20px;
        right: 30px;
        z-index: 1;
        transform: rotate(30deg);
      }
      img.aii-playlist-title-dividing-line-star-2 {
        width: 20px;
        height: 20px;
        position: absolute;
        top: -10px;
        right: 65px;
        z-index: 0;
        transform: rotate(-25deg);
        filter: brightness(100%) contrast(170%) saturate(200%) hue-rotate(270deg);
      }
      img.aii-playlist-title-dividing-line-star-3 {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 10px;
        right: 25px;
        z-index: 0;
        transform: rotate(40deg);
        filter: brightness(100%) contrast(170%) saturate(200%) hue-rotate(80deg);
      }
    }
    .aii-playlist-list {
      width: 100%;
      height: 85%;
      overflow: hidden;
      display: flex;
      justify-content: space-around;
      //align-items: center;
      //flex-direction: column;
      .aii-playlist-bar {
        width: 40px;
        height: 97%;
        background-color: #fff3f3;
        margin-top: 15px;
        margin-right: 20px;
        border-radius: 20px;
        border: 2px solid rgba(255, 228, 235, 0.2);
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      }
      .aii-playlist-scroll {
        width: 85%;
      }
    }
    .fly-in-bottom {
      animation: flyInBottom 1s ease-in-out forwards;
    }

    @keyframes flyInBottom {
      from {
        transform: translateY(100%); /* 开始时元素在屏幕底部外部 */
      }
      to {
        transform: translateY(0);
      }
    }
  }
</style>