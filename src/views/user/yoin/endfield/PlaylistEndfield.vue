<!--
  * Yoin 卡西米尔样式卡 · 终末地风格点歌列表卡片 (640×360)
  * 显示：待播放队列（歌名 / 歌手 / 点歌人），第 1 行 = 下一首播放（黄色编号 + 位置色条）
-->
<template>
  <div class="ef-frame ef-playlist" :class="bgClass" :style="{ zoom: String(cardScale) }">
    <div class="ef-panel">
      <div class="ef-tri"></div>

      <div class="ef-pl-head">
        <div class="ef-pair">
          <span class="ef-eyebrow">// QUEUE</span>
          <span class="ef-cn">点歌队列</span>
        </div>
        <span class="ef-field">待播 {{ String(queue.length).padStart(2, "0") }} 首</span>
      </div>

      <div class="ef-pl-body">
        <template v-if="rows.length > 0">
          <div
            v-for="(media, index) in rows"
            :key="index"
            class="ef-pl-row"
            :class="{ now: index === 0 }"
          >
            <span class="ef-pl-idx">
              <span class="ef-tag now" v-if="index === 0">{{ String(index + 1).padStart(2, "0") }}</span>
              <template v-else>{{ String(index + 1).padStart(2, "0") }}</template>
            </span>
            <span class="ef-pl-t">{{ media.Info.Title }}</span>
            <span class="ef-pl-nextlbl" v-if="index === 0">下一首</span>
            <span class="ef-pl-a"><span class="ef-cn">{{ media.Info.Artist }}</span></span>
            <span class="ef-tag"><span class="ef-cn">@</span>{{ mediaUsername(media) }}</span>
          </div>
        </template>
        <div v-else class="ef-pl-empty">
          <span class="ef-eyebrow">// QUEUE EMPTY</span>
          <span>暂无点歌，播放前会在这里显示待播列表</span>
        </div>
      </div>

      <div class="ef-pl-foot">
        <span class="ef-eyebrow">// KAZIMIERZ RADIO</span>
        <span class="ef-ftr">AYNALIVEPLAYER</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "./endfield.css";
import { computed } from "vue";
import { useCardBgMode, useCardScale, usePlayerInfo } from "@/views/user/yoin/use-player";
import type { Media } from "@/api/model";

const { queue, mediaUsername } = usePlayerInfo();

const cardScale = useCardScale();

/* 背景透明度：卡片墙传入 bg prop，或 URL ?bg=75/50/25/0（trans=75、ghost=25 别名） */
const props = defineProps<{ bg?: string }>();
const bgLevel = useCardBgMode(props.bg);
const bgClass = bgLevel === "solid" ? "" : `bg-${bgLevel}`;

/* 待播放队列，最多展示 6 首 */
const rows = computed<Media[]>(() => queue.value.slice(0, 6));
</script>
