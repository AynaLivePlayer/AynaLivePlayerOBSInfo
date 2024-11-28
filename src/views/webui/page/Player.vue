<script setup lang="ts">
import { usePlayInfoStore } from "@/stores/playinfo";
import MediaCover from "@/components/current/MediaCover.vue";
import LyricPanel from "@/views/webui/components/player/LyricPanel.vue";

const playInfoStore = usePlayInfoStore();
</script>

<template>
  <div class="flex flex-col h-full px-8 py-4 gap-4"> 
    <div class="flex flex-col justify-center">
      <h2 class="text-4xl font-bold text-primary mb-2">{{ playInfoStore.current.Info.Title }}</h2> 
      <h3 class="text-2xl text-secondary">{{ playInfoStore.current.Info.Artist }}</h3> 
    </div>

    <div class="flex-1 flex flex-row gap-4 content-center h-full">
      <div class="h-full flex items-center justify-center overflow-hidden relative basis-1/3">
          <MediaCover class="aspect-square absolute blur-lg p-4" />
          <MediaCover class="object-cover rounded-lg z-10 p-4" />
      </div>

      <div class="flex flex-col h-full overflow-hidden basis-2/3 py-12"> 
        <LyricPanel class="text-lg flex-1" />
      </div>
    </div>
  </div>
</template>
