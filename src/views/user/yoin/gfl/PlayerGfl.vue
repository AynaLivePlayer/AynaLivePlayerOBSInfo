<!--
  * Yoin 卡西米尔样式卡 · 少女前线风格播放器卡片 (640×220)
  * 黑金属 / 银白金属板 / 黄色警告色
  * 显示：封面 / 歌名 / 歌手 / 专辑 / 当前歌词 / 点歌人 / 进度 / 下一首及下一首点歌人
-->
<template>
  <div class="gfl-frame gfl-player"><div class="gfl-panel">
    <div class="gfl-hd">
      <div class="gfl-iconblk">♪</div>
      <div class="gfl-pair">
        <span class="gfl-cn">正在播放</span>
        <span class="gfl-en">NOW PLAYING</span>
      </div>
      <span class="gfl-spacer"></span>
      <span class="gfl-res" v-if="identifier">ID <b>{{ identifier }}</b></span>
    </div>

    <div class="gfl-body">
      <div class="gfl-cover-wrap">
        <div class="gfl-cover"><img :src="coverSrc" alt="cover" /></div>
        <div class="gfl-cover-corner"></div>
      </div>

      <div class="gfl-info">
        <div class="gfl-title-row">
          <span class="gfl-title">{{ title }}</span>
          <span class="gfl-tag" v-if="identifier">{{ providerLabel }}</span>
          <span class="gfl-tag">点歌 @{{ username }}</span>
        </div>
        <div class="gfl-meta">歌手：<b>{{ artist }}</b>　专辑：<b>{{ album }}</b></div>

        <div class="gfl-lyric"><span class="gfl-pfx">▸</span><span class="gfl-lt">{{ lyricText }}</span></div>

        <div class="gfl-progress">
          <span class="gfl-t elapsed">{{ fmtTime(store.timePos) }}</span>
          <div class="gfl-bar">
            <i :style="{ width: progressPercent + '%' }"></i>
            <div class="gfl-checker" :style="{ left: progressPercent + '%' }"></div>
          </div>
          <span class="gfl-t">{{ fmtTime(store.duration) }}</span>
        </div>

        <div class="gfl-next gfl-plate">
          <template v-if="next">
            <span class="gfl-nx">NEXT ▸</span>
            <span class="gfl-next-name">{{ next.Info.Title }} <span class="gfl-na">/ {{ next.Info.Artist }}</span></span>
            <span class="gfl-tag">@{{ mediaUsername(next) }}</span>
          </template>
          <template v-else>
            <span class="gfl-nx">NEXT ▸</span>
            <span class="gfl-next-empty">队列空，等待点歌</span>
          </template>
        </div>
      </div>
    </div>
  </div></div>
</template>

<script setup lang="ts">
import "./gfl.css";
import { usePlayerInfo } from "@/views/user/yoin/use-player";

const { store, coverSrc, identifier, providerLabel, title, artist, album, username,
        lyricText, progressPercent, fmtTime, next, mediaUsername } = usePlayerInfo();
</script>
