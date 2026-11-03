<!--
  * Yoin 卡西米尔样式卡 · 少女前线风格点歌列表卡片 (640×360)
  * 银白金属板梯形列表行，第 1 行 = 下一首播放（黄色序号块 + 下一首 pill）
-->
<template>
  <div class="gfl-frame gfl-playlist"><div class="gfl-panel">
    <div class="gfl-pl-hd">
      <div class="gfl-iconblk">♪</div>
      <div class="gfl-pair">
        <span class="gfl-cn">点歌队列</span>
        <span class="gfl-en">MUSIC QUEUE</span>
      </div>
      <span class="gfl-tab"><span class="gfl-num">{{ String(queue.length).padStart(2, "0") }}</span>&nbsp;/ {{ queue.length }} 首</span>
    </div>

    <div class="gfl-pl-body">
      <template v-if="rows.length > 0">
        <div
          v-for="(media, index) in rows"
          :key="index"
          class="gfl-pl-row gfl-plate"
          :class="{ now: index === 0 }"
        >
          <span class="gfl-pl-idx">{{ String(index + 1).padStart(2, "0") }}</span>
          <span class="gfl-pl-t">{{ media.Info.Title }}</span>
          <span class="gfl-pl-nextlbl" v-if="index === 0">下一首</span>
          <span class="gfl-pl-sep"></span>
          <span class="gfl-pl-a">歌手 <b>{{ media.Info.Artist }}</b></span>
          <span class="gfl-tag">@{{ mediaUsername(media) }}</span>
        </div>
      </template>
      <div v-else class="gfl-pl-empty">
        <span class="gfl-plate">暂无点歌，快来点第一首吧</span>
      </div>
    </div>

    <div class="gfl-pl-ft">
      <span class="gfl-stencil">GRIFFIN &amp; KRYUGER // PMC MUSIC CONTRACT 047</span>
      <span class="gfl-spacer"></span>
      <div class="gfl-warnblk"></div>
    </div>
  </div></div>
</template>

<script setup lang="ts">
import "./gfl.css";
import { computed } from "vue";
import { usePlayerInfo } from "@/views/user/yoin/use-player";
import type { Media } from "@/api/model";

const { queue, mediaUsername } = usePlayerInfo();

/* 待播放队列，最多展示 6 首 */
const rows = computed<Media[]>(() => queue.value.slice(0, 6));
</script>
