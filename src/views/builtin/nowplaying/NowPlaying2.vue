<script setup lang="ts">
import {computed, ref, watch} from "vue";
import {usePlayInfoStore} from "@/stores/playinfo";
import {getPictureUrl} from "@/utils";
import ScrollLeftRightV2 from "@/components/common/ScrollLeftRightV2.vue";

const playInfoStore = usePlayInfoStore();

const coverSrc = computed(() => getPictureUrl(playInfoStore.current.Info.Cover));

const progressPercentage = computed(() => {
  if (playInfoStore.duration <= 0) return 0;
  return Math.max(0, Math.min(100, (playInfoStore.timePos / playInfoStore.duration) * 100));
});

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
  accentSoft: "rgba(173, 84, 111, 0.35)",
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
      accentSoft: rgba(tint(base, -16), 0.4),
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
  <div class="np2-root" :style="rootStyle">
    <div class="np2-cover-wrap">
      <img :src="coverSrc" alt="cover" class="np2-cover" />
      <div class="np2-cover-glow"></div>
    </div>

    <div class="np2-info" :style="cardStyle">
      <ScrollLeftRightV2 :stay-ms="1000" :px-per-sec="56">
        <span class="np2-title">{{ playInfoStore.current.Info.Title }}</span>
      </ScrollLeftRightV2>
      <ScrollLeftRightV2 :stay-ms="1000" :px-per-sec="68">
        <span class="np2-artist">{{ playInfoStore.current.Info.Artist }}</span>
      </ScrollLeftRightV2>
    </div>

    <div class="np2-progress-card" :style="cardStyle">
      <div class="np2-time-row">
        <span>{{ formatTime(playInfoStore.timePos) }}</span>
        <span>{{ formatTime(playInfoStore.duration) }}</span>
      </div>
      <div class="np2-bar-bg" :style="{ background: theme.accentSoft }">
        <div
          class="np2-bar-fg"
          :style="{ width: `${progressPercentage}%`, background: `linear-gradient(90deg, ${theme.accent} 0%, ${theme.accent2} 100%)` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.np2-root {
  width: 280px;
  min-height: 610px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 14px 12px;
  box-sizing: border-box;
}

.np2-cover-wrap {
  position: relative;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.np2-cover {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
  box-shadow: 0 0 18px rgba(0, 0, 0, 0.2);
}

.np2-cover-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(17, 44, 96, 0) 60%, rgba(11, 28, 76, 0.55) 100%);
  pointer-events: none;
}

.np2-info {
  margin-top: 12px;
  padding: 12px 14px;
  border-radius: 12px;
}

.np2-title {
  font-family: "MiSans", sans-serif;
  font-size: 37px;
  line-height: 1.08;
  font-weight: 700;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.55);
}

.np2-artist {
  margin-top: 6px;
  font-family: "MiSans", sans-serif;
  font-size: 36px;
  line-height: 1.12;
  font-weight: 500;
  display: inline-block;
  opacity: 0.96;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
}

.np2-progress-card {
  margin-top: 10px;
  border-radius: 12px;
  padding: 14px 16px;
}

.np2-time-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "MiSans", sans-serif;
  font-size: 35px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 12px;
}

.np2-bar-bg {
  height: 10px;
  border-radius: 999px;
  overflow: hidden;
}

.np2-bar-fg {
  height: 100%;
  border-radius: 999px;
}
</style>
