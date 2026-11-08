<!--
  * Yoin 卡西米尔样式卡 · 鸣潮风格播放器卡片 (640×220)
  * 波形声骸进度条；显示：封面 / 歌名 / 歌手 / 专辑 / 当前歌词 / 点歌人 / 进度 / 下一首及下一首点歌人
-->
<template>
  <div class="wuwa-frame wuwa-player" :class="bgClass" :style="{ zoom: String(cardScale) }"><div class="wuwa-panel">
    <div class="wuwa-corner tl"></div>
    <div class="wuwa-corner br"></div>

    <div class="wuwa-cover-wrap">
      <div class="wuwa-cover"><img :src="coverSrc" alt="cover" /></div>
      <div class="wuwa-cover-tag" v-if="identifier"><span>TR-{{ identifier.slice(-4) }}</span></div>
    </div>

    <div class="wuwa-info">
      <div class="wuwa-row-top">
        <span class="wuwa-lbl"><span class="wuwa-sq"></span>Resonance · <b>正在播放</b></span>
        <span class="wuwa-req"><span class="wuwa-at">@</span><span class="wuwa-name">{{ username }}</span>&nbsp;点歌</span>
      </div>

      <div class="wuwa-title-row">
        <div class="wuwa-title">{{ title }}</div>
        <div class="wuwa-title-en">{{ providerLabel }}</div>
      </div>
      <div class="wuwa-artist">{{ artist }}<span class="wuwa-sep">/</span>专辑 · {{ album }}</div>

      <div class="wuwa-lyric"><span class="wuwa-pfx">&gt;</span>{{ lyricText }}</div>

      <div class="wuwa-progress">
        <span>{{ fmtTime(store.timePos) }}</span>
        <div class="wuwa-wave">
          <i v-for="(bar, index) in bars" :key="index" :class="{ on: bar.on }" :style="{ height: bar.h + '%' }"></i>
        </div>
        <span class="wuwa-time-total">{{ fmtTime(store.duration) }}</span>
      </div>

      <div class="wuwa-next">
        <template v-if="next">
          <span class="wuwa-next-tag"><span>NEXT ▸</span></span>
          <span class="wuwa-next-arrow">»</span>
          <span class="wuwa-next-name">{{ next.Info.Title }} <span class="wuwa-na">/ {{ next.Info.Artist }}</span></span>
          <span class="wuwa-req"><span class="wuwa-at">@</span><span class="wuwa-name">{{ mediaUsername(next) }}</span></span>
        </template>
        <template v-else>
          <span class="wuwa-next-tag"><span>NEXT ▸</span></span>
          <span class="wuwa-next-empty">NO SIGNAL · 队列空，等待点歌</span>
        </template>
      </div>
    </div>
  </div></div>
</template>

<script setup lang="ts">
import "./wuwa.css";
import { computed } from "vue";
import { useCardBgMode, useCardScale, usePlayerInfo } from "@/views/user/yoin/use-player";

const { store, coverSrc, identifier, providerLabel, title, artist, album, username,
        lyricText, progressPercent, fmtTime, next, mediaUsername } = usePlayerInfo();

const cardScale = useCardScale();

/* 背景透明度：卡片墙传入 bg prop，或 URL ?bg=75/50/25/0（trans=75、ghost=25 别名） */
const props = defineProps<{ bg?: string }>();
const bgLevel = useCardBgMode(props.bg);
const bgClass = bgLevel === "solid" ? "" : `bg-${bgLevel}`;

/* 波形声骸进度条：44 根振杆，点亮比例 = 当前进度 */
const bars = computed(() => {
  const N = 44;
  const onCount = Math.round(N * progressPercent.value / 100);
  return Array.from({ length: N }, (_, i) => ({
    h: 25 + 60 * Math.abs(Math.sin(i * 1.7)) * (i % 5 === 0 ? 0.85 : 1),
    on: i < onCount,
  }));
});
</script>
