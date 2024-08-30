<script setup lang="ts">
import { usePlayInfoStore } from '@/stores/playinfo';
import {computed} from "vue"; // Adjust the import path to your Pinia store

// Access the Pinia store
const playInfoStore = usePlayInfoStore();

const props = defineProps({
  index: {
    type: Number,
    default: 0
  }
})

const data = computed(() => {
  if (props.index >= playInfoStore.playlist.length) {
    return ""
  }
  return playInfoStore.playlist[props.index]?.Info.Title
})

</script>

<template>
  <span class="playlist-title">{{ data }}</span>
</template>

<style scoped>

</style>
