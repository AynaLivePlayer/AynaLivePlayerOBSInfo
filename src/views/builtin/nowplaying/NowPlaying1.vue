<script setup lang="ts">
import {computed, ref, watch} from "vue";
import {usePlayInfoStore} from "@/stores/playinfo";
import {getPictureUrl} from "@/utils";
import ScrollLeftRightV2 from "@/components/common/ScrollLeftRightV2.vue";

const playInfoStore = usePlayInfoStore();

const coverSrc = computed(() => getPictureUrl(playInfoStore.current.Info.Cover));

const waveHeights = [10, 14, 20, 16, 24, 18, 26, 15, 22, 17, 28, 19, 14, 23, 16, 25, 18, 22, 15, 24, 17, 20];

const formatTime = (seconds: number) => {
  const value = Math.max(0, Math.floor(seconds || 0));
  const m = Math.floor(value / 60);
  const s = (value % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

type RGB = { r: number; g: number; b: number };

const theme = ref({
  bgFrom: "rgba(86, 35, 57, 0.92)",
  bgMid: "rgba(24, 26, 49, 0.87)",
  bgTo: "rgba(13, 15, 28, 0.94)",
  cardFrom: "rgba(99, 56, 76, 0.92)",
  cardTo: "rgba(86, 52, 73, 0.88)",
  accent: "#ff163a",
  accent2: "#ff5470",
  text: "#f8ecf0",
});

const clamp = (value: number) => Math.max(0, Math.min(255, Math.round(value)));

const tint = (rgb: RGB, delta: number): RGB => ({
  r: clamp(rgb.r + delta),
  g: clamp(rgb.g + delta),
  b: clamp(rgb.b + delta),
});

const rgba = (rgb: RGB, alpha = 1) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
const hex = (rgb: RGB) => `#${[rgb.r, rgb.g, rgb.b].map(v => clamp(v).toString(16).padStart(2, "0")).join("")}`;

const getAverageColor = (src: string): Promise<RGB> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const width = 28;
        const height = 28;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("canvas context not available"));
          return;
        }
        ctx.drawImage(image, 0, 0, width, height);
        const {data} = ctx.getImageData(0, 0, width, height);
        let r = 0;
        let g = 0;
        let b = 0;
        let count = 0;
        for (let i = 0; i < data.length; i += 4) {
          const alpha = data[i + 3];
          if (alpha < 32) continue;
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }
        if (count === 0) {
          reject(new Error("empty image data"));
          return;
        }
        resolve({
          r: clamp(r / count),
          g: clamp(g / count),
          b: clamp(b / count),
        });
      } catch (error) {
        reject(error);
      }
    };
    image.onerror = reject;
    image.src = src;
  });
};

const applyThemeByCover = async (src: string) => {
  try {
    const base = await getAverageColor(src);
    const light = tint(base, 28);
    const dark = tint(base, -118);
    const deep = tint(base, -150);
    const accent = tint(base, 40);
    const accent2 = tint(base, 82);
    theme.value = {
      bgFrom: rgba(light, 0.92),
      bgMid: rgba(dark, 0.86),
      bgTo: rgba(deep, 0.95),
      cardFrom: rgba(tint(base, -28), 0.92),
      cardTo: rgba(tint(base, -42), 0.88),
      accent: hex(accent),
      accent2: hex(accent2),
      text: rgba(tint(base, 172), 1),
    };
  } catch (_error) {
    // keep default theme when cover cannot be sampled (e.g. CORS restricted image)
  }
};

watch(coverSrc, (src) => {
  if (!src) return;
  void applyThemeByCover(src);
}, {immediate: true});

const rootStyle = computed(() => ({
  background: "transparent",
}));

const cardStyle = computed(() => ({
  background: `linear-gradient(180deg, ${theme.value.cardFrom} 0%, ${theme.value.cardTo} 100%)`,
  color: theme.value.text,
}));
</script>

<template>
  <div class="np1-root" :style="rootStyle">
    <img :src="coverSrc" alt="cover" class="np1-cover" />
    <div class="np1-right">
      <div class="np1-meta-card" :style="cardStyle">
        <ScrollLeftRightV2 :stay-ms="1000" :px-per-sec="56">
          <span class="np1-title">{{ playInfoStore.current.Info.Title }}</span>
        </ScrollLeftRightV2>
        <ScrollLeftRightV2 :stay-ms="1000" :px-per-sec="68">
          <span class="np1-artist">{{ playInfoStore.current.Info.Artist }}</span>
        </ScrollLeftRightV2>
      </div>

      <div class="np1-progress-card" :style="cardStyle">
        <div class="np1-row">
          <span class="np1-time">{{ formatTime(playInfoStore.timePos) }}</span>
          <div class="np1-wave-wrap">
            <span
              v-for="(h, i) in waveHeights"
              :key="i"
              class="np1-wave"
              :style="{ height: `${h}px`, animationDelay: `${i * 0.08}s`, backgroundColor: theme.accent }"
            />
          </div>
          <span class="np1-time">{{ formatTime(playInfoStore.duration) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.np1-root {
  width: 596px;
  height: 200px;
  display: flex;
  gap: 12px;
  border-radius: 14px;
  padding: 8px;
  box-sizing: border-box;
  overflow: hidden;
}

.np1-cover {
  width: 184px;
  height: 184px;
  border-radius: 14px;
  overflow: hidden;
  object-fit: cover;
  box-shadow: 0 0 18px rgba(0, 0, 0, 0.2);
}

.np1-right {
  flex: 1;
  height: 184px;
  min-width: 0;
  display: grid;
  grid-template-rows: minmax(0, 3fr) minmax(0, 2fr);
  gap: 10px;
}

.np1-meta-card,
.np1-progress-card {
  height: 100%;
  box-sizing: border-box;
  border-radius: 12px;
  padding: 12px 16px;
}

.np1-meta-card {
  display: grid;
  grid-template-rows: auto auto;
  align-content: center;
  row-gap: 2px;
}

.np1-progress-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
}

.np1-title {
  font-family: "MiSans", sans-serif;
  font-size: 34px;
  line-height: 1.08;
  font-weight: 700;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.np1-artist {
  font-family: "MiSans", sans-serif;
  font-size: 19px;
  line-height: 1.1;
  font-weight: 500;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0.94;
}

.np1-row {
  display: grid;
  grid-template-columns: 76px minmax(0, 1fr) 76px;
  align-items: center;
  column-gap: 8px;
}

.np1-time {
  font-family: "MiSans", sans-serif;
  font-size: 28px;
  line-height: 1;
  width: 76px;
  font-weight: 700;
  white-space: nowrap;
  text-align: center;
}

.np1-wave-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3px;
  overflow: hidden;
}

.np1-wave {
  width: 4px;
  border-radius: 999px;
  transform-origin: center;
  animation: np1-wave-pulse 1.2s ease-in-out infinite alternate;
  flex: 0 0 auto;
}

@keyframes np1-wave-pulse {
  from {
    transform: scaleY(0.62);
    opacity: 0.75;
  }
  to {
    transform: scaleY(1.15);
    opacity: 1;
  }
}
</style>
