<!--
  * Yoin 卡西米尔样式卡 · 终末地风格播放器卡片 (640×220)
  * 显示：封面 / 歌名 / 歌手 / 专辑 / 当前歌词 / 点歌人 / 进度 / 下一首及下一首点歌人
-->
<template>
  <div class="ef-frame ef-player">
    <div class="ef-panel">
      <div class="ef-tri"></div>

      <div class="ef-cover-wrap">
        <div class="ef-cover-shadow ef-hatch"></div>
        <div class="ef-cover"><img :src="coverSrc" alt="cover" /></div>
        <div class="ef-cover-tag" v-if="identifier">
          <span class="ef-tag">No.{{ identifier }}</span>
        </div>
      </div>

      <div class="ef-info">
        <div class="ef-row-top">
          <span class="ef-eyebrow">// NOW PLAYING</span>
          <span class="ef-tag"><span class="ef-cn">点歌</span>&nbsp;@{{ username }}</span>
        </div>

        <div class="ef-title">{{ title }}</div>

        <div class="ef-meta">
          <span class="ef-field" v-if="identifier">{{ providerLabel }} / {{ identifier }}</span>
          <span class="ef-field" v-else>{{ providerLabel }}</span>
          <span class="ef-rule-v"></span>
          <span class="ef-artist"><span class="ef-cn">{{ artist }}</span> / <span class="ef-cn">{{ album }}</span></span>
        </div>

        <div class="ef-lyric"><mark>{{ lyricText }}</mark></div>

        <div class="ef-progress">
          <span class="ef-t elapsed">{{ fmtTime(store.timePos) }}</span>
          <div class="ef-bar">
            <i :style="{ width: progressPercent + '%' }"></i>
            <u :style="{ left: progressPercent + '%' }"></u>
          </div>
          <span class="ef-t">{{ fmtTime(store.duration) }}</span>
        </div>

        <div class="ef-next">
          <template v-if="next">
            <span class="ef-eyebrow">// NEXT</span>
            <span class="ef-next-name">{{ next.Info.Title }} <span class="ef-na">/ {{ next.Info.Artist }}</span></span>
            <span class="ef-tag"><span class="ef-cn">@</span>{{ mediaUsername(next) }}</span>
          </template>
          <template v-else>
            <span class="ef-eyebrow">// NEXT</span>
            <span class="ef-next-empty">队列空，等待点歌</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "./endfield.css";
import { usePlayerInfo } from "@/views/user/yoin/use-player";

const { store, coverSrc, identifier, providerLabel, title, artist, album, username,
        lyricText, progressPercent, fmtTime, next, mediaUsername } = usePlayerInfo();
</script>
