<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { usePlayInfoStore } from "@/stores/playinfo";
import type { Lyrics } from "@/api/model";

const playInfoStore = usePlayInfoStore();
const currentIndex = ref(-1);
const containerRef = ref<HTMLDivElement | null>(null);

function scrollToCurrentLine() {
    if (!containerRef.value || currentIndex.value === -1) return;
    const currentElement = containerRef.value.querySelector(`[data-index="${currentIndex.value}"]`) as HTMLElement | null;
    if (!currentElement) return;

    const target =
        currentElement.offsetTop - containerRef.value.clientHeight / 2 + currentElement.clientHeight / 2;
    containerRef.value.scrollTo({
        top: Math.max(target, 0),
        behavior: 'smooth',
    });
}

watch(() => playInfoStore.timePos, async (newTimePos) => {
    const totalLyrics = playInfoStore.lyrics.Content.length || 0;
    if (totalLyrics > 0) {
        await nextTick();

        let index = playInfoStore.lyrics.Content.findIndex(
            (lyric, idx, arr) => {
                const nextTime = idx < arr.length - 1 ? arr[idx + 1].Time : Infinity;
                return lyric.Time <= newTimePos && newTimePos < nextTime;
            }
        );
        currentIndex.value = index === -1 ? totalLyrics - 1 : index;
        scrollToCurrentLine();
    }
});
</script>

<template>
  <div class="overflow-hidden relative">
    <div ref="containerRef" class="overflow-y-auto scrollbar-hide place-content-center min-h-full">
      <div class="h-0">
        <div v-for="(lyricLine, index) in playInfoStore.lyrics.Content"
             :key="index"
             :data-index="index"
             class="px-4 py-2 transition-all duration-300 text-center truncate"
             :class="{
               'text-primary font-bold text-lg': index === currentIndex,
               'text-base-content/50': index !== currentIndex
             }">
          {{ lyricLine.Lyric }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
