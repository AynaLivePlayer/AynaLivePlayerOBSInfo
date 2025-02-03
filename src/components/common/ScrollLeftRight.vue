<!--
 * @Author: Aii如樱如月 morikawa2021@163.com
 * @Date: 2025-01-07 19:51:55
 * @LastEditors: Aii如樱如月 morikawa2021@163.com
 * @LastEditTime: 2025-01-11 17:34:41
 * @FilePath: \AynaLivePlayerOBSInfo\src\components\common\ScrollLeftRight.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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

const scrollLeftRight = (node: any, px_per_ms:number, stay_ms:number) => {
  if (!node.value) return;

  const span = node.value;
  const parent = span.parentElement;
  if (!parent) return;
  const duration = (span.scrollWidth - parent.clientWidth) * px_per_ms;

  let currentTimeout: number|undefined = undefined;

  const scrollLeft = () => {
    // console.log("left");
    span.style.transition = "transform " + duration + "ms linear";
    span.style.transform = `translateX(-${span.scrollWidth - parent.clientWidth}px)`;
    currentTimeout = setTimeout(scrollRight, duration+stay_ms);
  };

  const scrollRight = () => {
    // console.log("right");
    span.style.transition = "transform " + duration + "ms linear";
    span.style.transform = `translateX(0)`;
    currentTimeout = setTimeout(scrollLeft, duration+stay_ms);
  };

  scrollLeft();

  stopPreviousScroll = () => {
    // console.log(`stop ${currentTimeout}`);
    clearTimeout(currentTimeout);
    span.style.transition = 'none';
    span.style.transform = 'translateX(0)';
  };
}

const scrollContent = ref<HTMLElement | null>(null);

const startScrolling = () => {
  if (!scrollContent.value) return;
  stopScroll();

  const span = scrollContent.value;
  const parent = span.parentElement;
  // console.log(span.scrollWidth, parent?.clientWidth);
  if (parent && span.scrollWidth > parent.clientWidth) {
    scrollLeftRight(scrollContent, props.px_per_ms,props.stay_ms);
  }
};

onMounted(() => {
  const element = scrollContent.value;
  startScrolling();
  const mutationObserver = new MutationObserver(() => {
    // console.log(`width changed ${element?.scrollWidth}, restart scrolling if needed`);
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
  <div class="overflow-hidden" style="width: 100%;">
    <div ref="scrollContent" class="whitespace-nowrap">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>

</style>
