<template>
  <span class="total-time">{{ duration }}</span>
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
const duration = computed(() => {
  const value = Math.round(playInfoStore.duration); // Replace with actual time value from your store
  if (props.format === 'm:s') {
    return Math.floor(value / 60) + ":" + (value % 60).toString().padStart(2, '0');
  }
  return value;
});
</script>

<style scoped>
.total-time {

}
</style>
