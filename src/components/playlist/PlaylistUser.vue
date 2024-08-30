<script setup lang="ts">
import { usePlayInfoStore } from '@/stores/playinfo';
import {computed} from "vue";
import type {Media} from "@/api/model"; // Adjust the import path to your Pinia store

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
  let item: Media = playInfoStore.playlist[props.index]
  return item.User.Name ? item.User.Name : item.User.Username;
})

</script>

<template>
  <span class="playlist-user">{{ data }}</span>
</template>

<style scoped>

</style>
