<template>
  <span class="current-time">{{ time }}</span>
</template>

<script setup>
import { computed } from 'vue';
import { usePlayInfoStore } from '@/stores/playinfo'; // Adjust the import path to your Pinia store

// Props
const props = defineProps({
  format: String
});

// Access the Pinia store
const playInfoStore = usePlayInfoStore();

// Computed property to format the time
const time = computed(() => {
  const currentTime = Math.round(playInfoStore.timePos); // Replace with actual time value from your store
  if (props.format === 'm:s') {
    return Math.floor(currentTime / 60) + ":" + (currentTime % 60).toString().padStart(2, '0');
  }
  return currentTime;
});
</script>

<style scoped>
.current-time{}
</style>
