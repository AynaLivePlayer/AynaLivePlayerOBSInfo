<script setup lang="ts">
import { usePlayInfoStore } from "@/stores/playinfo";
import MediaCover from "@/components/current/MediaCover.vue";
import LyricPanel from "@/views/webui/components/player/LyricPanel.vue";

const playInfoStore = usePlayInfoStore();
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 h-full p-8 bg-base-200 text-primary gap-8 overflow-hidden"> 
    <div class="col-span-1 h-full flex items-center justify-center overflow-hidden">
      <MediaCover class="aspect-square object-cover rounded-lg shadow-lg" />
    </div>

    <div class="col-span-2 flex flex-col h-full overflow-hidden"> 
      <h2 class="text-4xl font-bold mb-4 text-primary">{{ playInfoStore.current.Info.Title }}</h2> 
      <h3 class="text-2xl mb-6 text-secondary">{{ playInfoStore.current.Info.Artist }}</h3> 
      <LyricPanel class="text-lg" />
    </div>
  </div>
</template>
