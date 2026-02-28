<script setup lang="ts">
import {computed, ref, watch} from "vue";
import {usePlayInfoStore} from "@/stores/playinfo";
import {getPictureUrl, getUsername} from "@/utils";
import ScrollLeftRightV2 from "@/components/common/ScrollLeftRightV2.vue";
import ScrollUpDownV2 from "@/components/common/ScrollUpDownV2.vue";

const playInfoStore = usePlayInfoStore();
const coverSrc = computed(() => getPictureUrl(playInfoStore.current.Info.Cover));

type RGB = { r: number; g: number; b: number };

const theme = ref({
  cardFrom: "rgba(99, 56, 76, 0.92)",
  cardTo: "rgba(86, 52, 73, 0.88)",
  text: "#f8ecf0",
  textMuted: "rgba(248, 236, 240, 0.78)",
});

const clamp = (value: number) => Math.max(0, Math.min(255, Math.round(value)));

const tint = (rgb: RGB, delta: number): RGB => ({
  r: clamp(rgb.r + delta),
  g: clamp(rgb.g + delta),
  b: clamp(rgb.b + delta),
});

const rgba = (rgb: RGB, alpha = 1) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;

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
    theme.value = {
      cardFrom: rgba(tint(base, -28), 0.92),
      cardTo: rgba(tint(base, -42), 0.88),
      text: rgba(tint(base, 172), 1),
      textMuted: rgba(tint(base, 160), 0.82),
    };
  } catch (_error) {
    // keep default theme when cover cannot be sampled
  }
};

watch(coverSrc, (src) => {
  if (!src) return;
  void applyThemeByCover(src);
}, {immediate: true});

const rowStyle = computed(() => ({
  background: `linear-gradient(180deg, ${theme.value.cardFrom} 0%, ${theme.value.cardTo} 100%)`,
  color: theme.value.text,
}));
</script>

<template>
  <div class="npp1-root">
    <div class="npp1-header" :style="rowStyle">
      <span class="npp1-h-index">#</span>
      <span>标题</span>
      <span>歌手</span>
      <span>点歌人</span>
    </div>

    <div class="npp1-list">
      <ScrollUpDownV2 :speed="14" :stay-ms="1200">
        <div class="npp1-list-inner">
          <div
            v-for="(media, index) in playInfoStore.playlist"
            :key="`${media.Info.Meta.Provider}-${media.Info.Meta.Identifier}-${index}`"
            class="npp1-row"
            :style="rowStyle"
          >
            <span class="npp1-index">{{ index + 1 }}</span>

            <div class="npp1-cell">
              <ScrollLeftRightV2 :stay-ms="1000" :px-per-sec="64">
                <span class="npp1-title">{{ media.Info.Title }}</span>
              </ScrollLeftRightV2>
            </div>

            <div class="npp1-cell">
              <ScrollLeftRightV2 :stay-ms="1000" :px-per-sec="64">
                <span class="npp1-singer">{{ media.Info.Artist }}</span>
              </ScrollLeftRightV2>
            </div>

            <div class="npp1-cell">
              <ScrollLeftRightV2 :stay-ms="1000" :px-per-sec="64">
                <span class="npp1-user">{{ getUsername(media.User) }}</span>
              </ScrollLeftRightV2>
            </div>
          </div>
        </div>
      </ScrollUpDownV2>

      <div v-if="playInfoStore.playlist.length === 0" class="npp1-empty" :style="rowStyle">
        暂无播放列表
      </div>
    </div>
  </div>
</template>

<style scoped>
.npp1-root {
  width: 596px;
  height: 300px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
}

.npp1-header,
.npp1-row {
  display: grid;
  grid-template-columns: 48px minmax(0, 1.8fr) minmax(0, 1.3fr) minmax(0, 1.2fr);
  align-items: center;
  border-radius: 12px;
  padding: 10px 14px;
  column-gap: 8px;
  box-sizing: border-box;
}

.npp1-header {
  font-family: "MiSans", sans-serif;
  font-size: 16px;
  font-weight: 700;
}

.npp1-list {
  height: 100%;
  min-height: 0;
}

.npp1-list-inner {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.npp1-row {
  min-height: 44px;
}

.npp1-h-index,
.npp1-index {
  text-align: center;
  font-family: "MiSans", sans-serif;
  font-weight: 700;
}

.npp1-index {
  font-size: 22px;
}

.npp1-cell {
  min-width: 0;
}

.npp1-title,
.npp1-singer,
.npp1-user {
  font-family: "MiSans", sans-serif;
  display: inline-block;
  white-space: nowrap;
}

.npp1-title {
  font-size: 22px;
  font-weight: 700;
}

.npp1-singer,
.npp1-user {
  font-size: 20px;
  font-weight: 500;
  opacity: 0.9;
}

.npp1-empty {
  border-radius: 12px;
  padding: 12px 14px;
  font-family: "MiSans", sans-serif;
  font-size: 18px;
  text-align: center;
}
</style>
