<template>
  <img v-bind:src="imgSrc" class="media-cover"/>
</template>

<script setup lang="ts">
import { usePlayInfoStore } from '@/stores/playinfo';
import {computed} from "vue";

// Access the Pinia store
const playInfoStore = usePlayInfoStore();
const imgSrc = computed(() => {
  if (playInfoStore.current.Info.Cover.Data !== null) {
    return 'data:image/jpeg;base64,'+playInfoStore.current.Info.Cover.Data;
  }
  return playInfoStore.current.Info.Cover.Url;
});
</script>

<style scoped>
.media-cover {
}
</style>
