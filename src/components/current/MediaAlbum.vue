<template>
  <span class="media-album">{{ playInfoStore.current.Info.Album }}</span>
</template>

<script setup>
import { usePlayInfoStore } from '@/stores/playinfo';

// Define component name, class name, and other constants
const tmplName = 'current-album';
const className = 'current-album';

// Access the Pinia store
const playInfoStore = usePlayInfoStore();

</script>

<style scoped>
.media-album{}
</style>
