<template>
  <span class="media-username">{{ playInfoStore.currentUsername }}</span>
</template>

<script setup>
import { usePlayInfoStore } from '@/stores/playinfo';

// Access the Pinia store
const playInfoStore = usePlayInfoStore();
</script>

<style scoped>
.media-username{
}
</style>
