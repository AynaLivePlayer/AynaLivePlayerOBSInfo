<!--
  * Yoin 卡西米尔样式卡 · 鸣潮风格点歌列表卡片 (640×360)
  * 显示：待播放队列（歌名 / 歌手 / 点歌人），第 1 行 = 下一首播放（青色高亮 + NEXT 标记）
-->
<template>
  <div class="wuwa-frame wuwa-playlist" :class="bgClass" :style="{ zoom: String(cardScale) }"><div class="wuwa-panel">
    <div class="wuwa-pl-head">
      <span class="wuwa-sq"></span>
      <span class="wuwa-lbl">Resonance Queue</span>
      <span class="wuwa-cn">点歌队列</span>
      <span class="wuwa-barcode"></span>
      <span class="wuwa-pl-count">{{ String(queue.length).padStart(2, "0") }} TRACKS</span>
    </div>

    <div class="wuwa-pl-body">
      <template v-if="rows.length > 0">
        <div
          v-for="(media, index) in rows"
          :key="index"
          class="wuwa-pl-row"
          :class="{ nextup: index === 0 }"
        >
          <span class="wuwa-pl-idx">{{ String(index + 1).padStart(2, "0") }}</span>
          <span class="wuwa-pl-t">{{ media.Info.Title }}</span>
          <span class="wuwa-pl-a">{{ media.Info.Artist }}</span>
          <span class="wuwa-req"><span class="wuwa-at">@</span><span class="wuwa-name">{{ mediaUsername(media) }}</span></span>
        </div>
      </template>
      <div v-else class="wuwa-pl-empty">
        <span class="wuwa-lbl">Queue Empty</span>
        <span>暂无点歌，快来点第一首吧</span>
      </div>
    </div>

    <div class="wuwa-pl-foot">
      <span class="wuwa-txt">WUTHERING WAVES // ECHO PLAYBACK SYSTEM</span>
      <span class="wuwa-plus">＋</span>
    </div>
  </div></div>
</template>

<script setup lang="ts">
import "./wuwa.css";
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
