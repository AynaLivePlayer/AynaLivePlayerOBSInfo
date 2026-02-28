<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";

interface Props {
  pxPerSec?: number;
  stayMs?: number;
}

const props = withDefaults(defineProps<Props>(), {
  pxPerSec: 56,
  stayMs: 900,
});

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
  content.style.transform = "translateX(0)";
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

  const overflow = content.scrollWidth - container.clientWidth;
  if (overflow <= 0) return;

  running = true;
  const duration = Math.max(300, (overflow / props.pxPerSec) * 1000);

  const moveLeft = () => {
    if (!running) return;
    content.style.transition = `transform ${duration}ms linear`;
    content.style.transform = `translateX(-${overflow}px)`;
    timerId = window.setTimeout(moveRight, duration + props.stayMs);
  };

  const moveRight = () => {
    if (!running) return;
    content.style.transition = `transform ${duration}ms linear`;
    content.style.transform = "translateX(0)";
    timerId = window.setTimeout(moveLeft, duration + props.stayMs);
  };

  timerId = window.setTimeout(moveLeft, props.stayMs);
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
  <div ref="containerRef" class="slrv2-wrap">
    <div ref="contentRef" class="slrv2-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.slrv2-wrap {
  width: 100%;
  overflow: hidden;
}

.slrv2-content {
  display: inline-block;
  white-space: nowrap;
  will-change: transform;
}
</style>
