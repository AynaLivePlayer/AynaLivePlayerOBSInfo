<template>
  <span class="media-title">{{ playInfoStore.current.Info.Title }}</span>
</template>

<script setup>
import { usePlayInfoStore } from '@/stores/playinfo';

// Access the Pinia store
const playInfoStore = usePlayInfoStore();

</script>

<style scoped>
.media-title{}
</style>
