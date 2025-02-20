<!--
 * @Author: Aii如樱如月 morikawa2021@163.com
 * @Date: 2025-01-07 19:51:55
 * @LastEditors: Aii如樱如月 morikawa2021@163.com
 * @LastEditTime: 2025-01-13 22:46:04
 * @FilePath: \AynaLivePlayerOBSInfo\src\components\current\CurrentLyric.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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
