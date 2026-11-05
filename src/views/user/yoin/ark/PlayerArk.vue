<!--
  * Yoin 卡西米尔样式卡 · 明日方舟风格播放器卡片 (640×220)
  * 视觉语言：明日方舟（深色面板 + 方舟黄强调 + 切角面板 + 大写英文标签）
  * 显示：封面 / 歌名 / 歌手 / 专辑 / 当前歌词 / 点歌人 / 进度 / 下一首及下一首点歌人
-->
<template>
  <div class="yoin-frame yoin-player" :class="bgClass" :style="{ zoom: String(cardScale) }">
    <div class="yoin-panel">
      <div class="yoin-corner tl"></div>
      <div class="yoin-corner br"></div>

      <div class="yoin-cover-wrap">
        <div class="yoin-cover">
          <img :src="coverSrc" alt="cover" />
        </div>
        <div class="yoin-cover-tag">TR-{{ trackCode }}</div>
      </div>

      <div class="yoin-info">
        <div class="yoin-row-top">
          <span class="yoin-lbl"><span class="yoin-sq"></span>Now Playing · <b>正在播放</b></span>
          <span class="yoin-req"><span class="yoin-at">@</span><span class="yoin-name">{{ username }}</span>&nbsp;点歌</span>
        </div>

        <div class="yoin-title-row">
          <div class="yoin-title">{{ title }}</div>
          <div class="yoin-title-en">{{ providerLabel }}</div>
        </div>
        <div class="yoin-artist">
          {{ artist }}<span class="yoin-sep">/</span>专辑 · {{ album }}
        </div>

        <div class="yoin-lyric"><span class="yoin-pfx">&gt;</span>{{ lyricText }}</div>

        <div class="yoin-progress">
          <span>{{ fmtTime(store.timePos) }}</span>
          <div class="yoin-bar"><i :style="{ width: progressPercent + '%' }"></i></div>
          <span class="yoin-time-total">{{ fmtTime(store.duration) }}</span>
        </div>

        <div class="yoin-next">
          <template v-if="next">
            <span class="yoin-next-tag">NEXT ▸</span>
            <span class="yoin-next-arrow">»</span>
            <span class="yoin-next-name">
              {{ next.Info.Title }} <span class="yoin-next-artist">/ {{ next.Info.Artist }}</span>
            </span>
            <span class="yoin-req"><span class="yoin-at">@</span><span class="yoin-name">{{ mediaUsername(next) }}</span></span>
          </template>
          <template v-else>
            <span class="yoin-next-tag">NEXT ▸</span>
            <span class="yoin-next-empty">NO SIGNAL · 队列空，等待点歌</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "./ark.css";
import { computed } from "vue";
import { useCardBgMode, useCardScale, usePlayerInfo } from "@/views/user/yoin/use-player";

const { store, coverSrc, identifier, providerLabel, title, artist, album, username,
        lyricText, progressPercent, fmtTime, next, mediaUsername } = usePlayerInfo();

const cardScale = useCardScale();

/* 背景透明度：卡片墙传入 bg prop，或 URL ?bg=75/50/25/0（trans=75、ghost=25 别名） */
const props = defineProps<{ bg?: string }>();
const bgLevel = useCardBgMode(props.bg);
const bgClass = bgLevel === "solid" ? "" : `bg-${bgLevel}`;

const trackCode = computed(() => identifier.value ? identifier.value.slice(-4) : "????");
</script>
