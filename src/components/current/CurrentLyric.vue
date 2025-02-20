<!--
  * 通用信息组件 - 当前歌词
  * 贡献者: @Aynakeya, @Aiikisaraki
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
  /* 目前仅考虑网易云部分情况，待完善 */
  if (playInfoStore.lyrics.Content.length === 0 || playInfoStore.lyrics.Content.some(obj => obj.Lyric === "纯音乐，请欣赏")) {
    return "[No Lyric]"
  }
  else if (playInfoStore.currentLyric.Lyric === '') {
    return "[No Current Lyric]"
  }
  return playInfoStore.currentLyric.Lyric;
})
</script>

<style scoped>
.current-lyric{}
</style>
