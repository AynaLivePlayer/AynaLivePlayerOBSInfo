<template>
  <span class="current-lyric">{{ currentLyric}}</span>
</template>

<script setup>
import { computed } from 'vue';
import { usePlayInfoStore } from '@/stores/playinfo'; // Adjust the import path to your Pinia store
const playInfoStore = usePlayInfoStore();

const currentLyric = computed(() => {
  if (playInfoStore.currentLyric.Lyric === '') {
    return "[No Lyric]"
  }
  return playInfoStore.currentLyric.Lyric;
})
</script>

<style scoped>
.current-lyric{}
</style>
