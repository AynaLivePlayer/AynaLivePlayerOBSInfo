<script setup lang="ts">
import { usePlayInfoStore } from '@/stores/playinfo';
import {computed} from "vue"; // Adjust the import path to your Pinia store
const playInfoStore = usePlayInfoStore();

const imgSrc = computed(() => {
  if (playInfoStore.current.Info.Cover.Data !== null) {
    return 'data:image/jpeg;base64,'+playInfoStore.current.Info.Cover.Data;
  }
  return playInfoStore.current.Info.Cover.Url;
});

</script>

<template>
  <div class="root">
    <div id="player">
      <img title="专辑封面" id="player-album-cover" v-bind:src="imgSrc"/>
      <div>
        <span id="player-title">{{playInfoStore.current.Info.Title}}</span>
        <span id="player-artist">{{playInfoStore.current.Info.Artist}}</span>
        <span id="player-user">{{playInfoStore.currentUsername}}</span>
      </div>
    </div>
    <ul id="playlist">
      <li class="playlistItem" v-for="(item, index) in playInfoStore.playlist" :key="index">
        <div>
          <span>{{item.Info.Title}} - {{item.Info.Artist}}</span>
          <span>{{item.User.Name ? item.User.Name : item.User.Username}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
@font-face {
  font-family: '得意黑';
  src: url('SmileySans-Oblique.ttf') format('truetype');
}

.root {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
  font-family: "得意黑";
  width: 400px;
  float: right;
  color: white;
  text-align: right;
  margin: 1em;
  line-height: normal;
}

#player {
  height: 100px;
  margin: 0px;
  display: flex;
  flex-direction: row-reverse;
}

#player > div {
  overflow: hidden;
  width: 100%;
  margin: auto;
  margin-right: 10px;
}

#player > div > span {
  display: inline-block;
  white-space: nowrap;
  animation: moving 5s infinite alternate linear;
  animation-direction: alternate;
  min-width: 100%;
}

#player-album-cover {
  border-radius: 20px;
  width: 100px;
  object-fit: cover;
}

#player-title {
  font-size: 30px;
}

#player-artist {
  font-size: 24px;
  opacity: 90%;
}

#player-user {
  font-size: 20px;
  opacity: 80%;
}

@keyframes moving {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(290px - 100%));
  }
}

@keyframes moving2 {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(400px - 100%));
  }
}

#playlist{
  padding: 0;
  overflow: hidden;
  float: right;
  list-style-type:none;
  width: 100%;
}

.playlistItem {
  margin-bottom: 10px;
}

.playlistItem > div > span:nth-child(1){
  font-size: 26px;
  display: inline-block;
  white-space: nowrap;
  animation: moving2 5s infinite alternate linear;
  animation-direction: alternate;
  min-width: 100%;
}

.playlistItem > div > span:nth-child(3){
  font-size: 18px;
  opacity: 70%;
}

.playlistItem > div > span:nth-child(4){
  font-size: 20px;
  opacity: 90%;
}
</style>
