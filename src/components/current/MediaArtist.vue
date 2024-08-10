<template>
  <span class="media-artist">{{ playInfoStore.current.Info.Artist }}</span>
</template>

<script setup>
import { usePlayInfoStore } from '@/stores/playinfo';

// Access the Pinia store
const playInfoStore = usePlayInfoStore();

</script>

<style scoped>
.media-artist{}
</style>
