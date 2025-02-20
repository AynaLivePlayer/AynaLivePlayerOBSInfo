<!--
  * 通用信息组件 - 当前歌词中文版本
  * 贡献者: @Aiikisaraki
-->
<template>
  <span class="current-lyric">{{ currentLyric}}</span>
</template>

<script setup>
import { computed } from 'vue';
import { usePlayInfoStore } from '@/stores/playinfo'; // Adjust the import path to your Pinia store
const playInfoStore = usePlayInfoStore();
const currentLyric = computed(() => {
  /* 添加纯音乐情况，方便其它页面进行分情况判断 */
  /* 目前仅考虑网易云与B站无歌词部分情况，待完善 */
  if (playInfoStore.current.Info.Meta.Provider === "bilibili-video") {
    return "B站歌曲暂无歌词~~"
  }
  else if (playInfoStore.lyrics.Content.length === 0 || playInfoStore.lyrics.Content.some(obj => obj.Lyric === "纯音乐，请欣赏")) {
    return "纯音乐，请欣赏"
  }
  else if (playInfoStore.currentLyric.Lyric === '') {
    return ""
  }
  return playInfoStore.currentLyric.Lyric;
})
</script>

<style scoped>
.current-lyric{}
</style>
