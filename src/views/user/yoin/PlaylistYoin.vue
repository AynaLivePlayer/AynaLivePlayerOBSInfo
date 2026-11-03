<!--
  * Yoin 卡西米尔样式卡 · 明日方舟风格点歌列表卡片 (640×360)
  * 视觉语言：明日方舟
  * 显示：待播放队列（歌名 / 歌手 / 点歌人），第一行黄色高亮 = 下一首播放
-->
<template>
  <div class="yoin-frame yoin-playlist">
    <div class="yoin-panel">
      <div class="yoin-pl-head">
        <span class="yoin-sq"></span>
        <span class="yoin-lbl">Music Queue</span>
        <span class="yoin-cn">点歌队列</span>
        <span class="yoin-barcode"></span>
        <span class="yoin-pl-count">{{ String(queue.length).padStart(2, "0") }} TRACKS</span>
      </div>

      <div class="yoin-pl-body">
        <template v-if="rows.length > 0">
          <div
            v-for="(media, index) in rows"
            :key="index"
            class="yoin-pl-row"
            :class="{ nextup: index === 0 }"
          >
            <span class="yoin-pl-idx">{{ String(index + 1).padStart(2, "0") }}</span>
            <span class="yoin-pl-t">{{ media.Info.Title }}</span>
            <span class="yoin-pl-a">{{ media.Info.Artist }}</span>
            <span class="yoin-req"><span class="yoin-at">@</span><span class="yoin-name">{{ mediaUsername(media) }}</span></span>
          </div>
        </template>
        <div v-else class="yoin-pl-empty">
          <span class="yoin-lbl">Queue Empty</span>
          <span>暂无点歌，快来点第一首吧</span>
        </div>
      </div>

      <div class="yoin-pl-foot">
        <span class="yoin-txt">AYNALIVEPLAYER // KAZIMIERZ RADIO</span>
        <span class="yoin-plus">＋</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "./cards.css";
import { computed } from "vue";
import { usePlayerInfo } from "@/views/user/yoin/use-player";
import type { Media } from "@/api/model";

const { queue, mediaUsername } = usePlayerInfo();

/* 待播放队列，最多展示 6 首 */
const rows = computed<Media[]>(() => queue.value.slice(0, 6));
</script>
