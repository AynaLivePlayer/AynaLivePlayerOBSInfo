<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from "vue";

interface Props {
  speed?: number;
  pxPerSec?: number;
  stayMs?: number;
}

const props = withDefaults(defineProps<Props>(), {
  pxPerSec: 20,
  stayMs: 1200,
});

const speedPxPerSec = computed(() => props.speed ?? props.pxPerSec);

const containerRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);

let timerId: number | null = null;
let resizeObserver: ResizeObserver | null = null;
let mutationObserver: MutationObserver | null = null;
let running = false;

const clearTimer = () => {
  if (timerId !== null) {
    window.clearTimeout(timerId);
    timerId = null;
  }
};

const resetContent = () => {
  const content = contentRef.value;
  if (!content) return;
  content.style.transition = "none";
  content.style.transform = "translateY(0)";
};

const stopLoop = () => {
  running = false;
  clearTimer();
  resetContent();
};

const startLoop = () => {
  const container = containerRef.value;
  const content = contentRef.value;
  if (!container || !content) return;

  clearTimer();
  resetContent();

  const overflow = content.scrollHeight - container.clientHeight;
  if (overflow <= 0) return;

  running = true;
  const duration = Math.max(600, (overflow / speedPxPerSec.value) * 1000);

  const moveUp = () => {
    if (!running) return;
    content.style.transition = `transform ${duration}ms linear`;
    content.style.transform = `translateY(-${overflow}px)`;
    timerId = window.setTimeout(moveDown, duration + props.stayMs);
  };

  const moveDown = () => {
    if (!running) return;
    content.style.transition = `transform ${duration}ms linear`;
    content.style.transform = "translateY(0)";
    timerId = window.setTimeout(moveUp, duration + props.stayMs);
  };

  timerId = window.setTimeout(moveUp, props.stayMs);
};

const restart = () => {
  stopLoop();
  startLoop();
};

onMounted(() => {
  const container = containerRef.value;
  const content = contentRef.value;
  if (!container || !content) return;

  startLoop();

  resizeObserver = new ResizeObserver(() => {
    restart();
  });
  resizeObserver.observe(container);
  resizeObserver.observe(content);

  mutationObserver = new MutationObserver(() => {
    restart();
  });
  mutationObserver.observe(content, {
    childList: true,
    subtree: true,
    characterData: true,
  });
});

onUnmounted(() => {
  stopLoop();
  resizeObserver?.disconnect();
  mutationObserver?.disconnect();
});
</script>

<template>
  <div ref="containerRef" class="sudv2-wrap">
    <div ref="contentRef" class="sudv2-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.sudv2-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.sudv2-content {
  width: 100%;
  will-change: transform;
}
</style>
