<!--
  * 通用组件 - 上下滚动
  * 贡献者: @Aiikisaraki
-->
<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";

interface Props {
  px_per_ms: number;
  stay_ms: number;
}

const props = defineProps<Props>();

let stopPreviousScroll: () => void = () => {};

const stopScroll = () => {
  if (stopPreviousScroll) {
    stopPreviousScroll();
  }
}

const scrollUpDown = (node: any, px_per_ms:number, stay_ms:number) => {
  if (!node.value) return;

  const span = node.value;
  const parent = span.parentElement;
  if (!parent) return;
  const duration = (span.scrollHeight - parent.clientHeight) * px_per_ms;

  let currentTimeout: number|undefined = undefined;

  const scrollUp = () => {
    // console.log("left");
    span.style.transition = "transform " + duration + "ms linear";
    span.style.transform = `translateY(-${span.scrollHeight - parent.clientHeight}px)`;
    currentTimeout = setTimeout(scrollDown, duration+stay_ms);
  };

  const scrollDown = () => {
    // console.log("right");
    span.style.transition = "transform " + duration + "ms linear";
    span.style.transform = `translateY(0)`;
    currentTimeout = setTimeout(scrollUp, duration+stay_ms);
  };

  scrollUp();

  stopPreviousScroll = () => {
    // console.log(`stop ${currentTimeout}`);
    clearTimeout(currentTimeout);
    span.style.transition = 'none';
    span.style.transform = 'translateY(0)';
  };
}

const scrollContent = ref<HTMLElement | null>(null);

const startScrolling = () => {
  if (!scrollContent.value) return;
  stopScroll();

  const span = scrollContent.value;
  const parent = span.parentElement;
  // console.log(span.scrollHeight, parent?.clientHeight);
  if (parent && span.scrollHeight > parent.clientHeight) {
    scrollUpDown(scrollContent, props.px_per_ms,props.stay_ms);
  }
};

onMounted(() => {
  const element = scrollContent.value;
  startScrolling();
  const mutationObserver = new MutationObserver(() => {
    // console.log(`height changed ${element?.scrollHeight}, restart scrolling if needed`);
    startScrolling();
  });
  mutationObserver.observe(element, {
    childList: true,
    subtree: true,
    characterData: true,
  });
});

onUnmounted(() => {
  stopScroll();
});

</script>

<template>
  <div class="overflow-hidden" style="height: 100%;">
    <div ref="scrollContent" class="whitespace-nowrap">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>

</style>
