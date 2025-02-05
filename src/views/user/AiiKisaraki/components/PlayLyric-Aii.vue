<script lang="ts" setup>
import { usePlayInfoStore } from "@/stores/playinfo";
import type {LyricLine, Lyrics, Media} from "@/api/model";
import {computed, nextTick, onMounted, ref, watch} from "vue";
const playInfoStore = usePlayInfoStore();

interface Props {
  lyrics: Lyrics
}

interface LyricItem {
  pre: number,
  time: number,
  lrc: string
}

const props = defineProps<Props>();

const musicLyric = ref();
const lyricContainer = ref();

// const lyricsCurMusic = computed(() => props.lyrics);
const lyricsCurMusic = computed(() => {
  const arr: LyricItem[] = [];
  props.lyrics.Content.forEach((item: LyricLine, index: number) => {
    const thisLyric = item.Lyric.length === 0 ? " " : item.Lyric;
    if(index === 0 || props.lyrics.Content.length === 1) {
      arr.push({time: item.Time, pre: 99999999999, lrc: thisLyric});
    } else if (index === props.lyrics.Content.length - 1) {
      arr[index - 1].pre = item.Time;
    } else {
      arr.push({time: item.Time, pre: 99999999999, lrc: thisLyric});
      arr[index - 1].pre = item.Time;
    }
  });
  return arr;
});

const activeIndex = computed(() => {
  for(let i = lyricsCurMusic.value.length - 1; i >= 0; i--) {
    if(playInfoStore.timePos >= lyricsCurMusic.value[i].time) {
      return i;
    }
  }
  if(isBili.value || isEmptyLyric.value) return 0;
  return -1;
});

const scrollLyrics = () => {
  watch(activeIndex, (index) => {
    if(musicLyric.value !== null) {
      const lines = musicLyric.value.children;
      if(lines !== null && lines !== undefined && lines.length > 0) {
        // 计算当前歌词中心高度
        const currentIndexLyricCenterHeight = (lines[index].getBoundingClientRect().top + lines[index].getBoundingClientRect().bottom) / 2;
        const curLyricInParentHeight = currentIndexLyricCenterHeight - musicLyric.value.getBoundingClientRect().top - lyricContainer.value.getBoundingClientRect().top / 2;
        const targetScrollTop = lyricContainer.value.getBoundingClientRect().top - curLyricInParentHeight;
        musicLyric.value.style.transform = `translateY(${targetScrollTop}px)`;
      }
    }
  },{immediate: true})
}

const isBili = computed(() => {
  return playInfoStore.current.Info.Meta.Provider === "bilibili-video"
})

const isEmptyLyric = computed(() => {
  if(playInfoStore.lyrics.Content.length === 0) {
    return true;
  }
  let isEmpty:boolean = true;
  for(let i = 0; i < playInfoStore.lyrics.Content.length; i++) {
    if(playInfoStore.lyrics.Content[i].Lyric !== "" && playInfoStore.lyrics.Content[i].Lyric !== null) {
      isEmpty = false;
      break;
    }
  }
  return isEmpty;
})

onMounted(() => {
  nextTick(()=> {
    scrollLyrics();
  })
})

console.log(lyricsCurMusic);
</script>

<template>
  <div class="aii-player-lyric-container" ref="lyricContainer">
    <div class="musicLyric" ref="musicLyric">
      <p
          class="lyric"
          v-for="(item, index) in lyricsCurMusic"
          :key="index"
          :class="{active: /* currentTime < item.pre && currentTime > item.time */index === activeIndex}"
          v-if="!(isBili || isEmptyLyric)"
      >
        {{ item.lrc }}
      </p>
      <p
          class="lyric active"
          v-else-if="isBili"
      >
        B站歌曲暂无歌词~~
      </p>
      <p
          class="lyric active"
          v-else-if="isEmptyLyric"
      >
        本曲暂无歌词~~
      </p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.aii-player-lyric-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0 30px;
  .musicLyric {
    width: 100%;
    height: 100%;
    font-size: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #90a4c8;
    text-shadow: 0px 0px 1px #c8c8c8;
    //overflow: hidden;
    will-change: transform; /* 提示浏览器该元素将使用transform，以优化性能 */
    transition: transform 0.3s ease-out; /* 平滑过渡效果 */
    //overflow-y: scroll;
    //overflow-x: hidden;
    //scrollbar-width: none; /* 对于Firefox */
    //-ms-overflow-style: none; /* 对于IE和Edge */
    //scroll-behavior: smooth;
    p.lyric {
      width: 100%;
      margin: 5px;
      text-align: center;
      word-wrap: break-word; /* 超出容器范围自动换行 */
      overflow-wrap: break-word; /* 兼容性更好的属性 */
      //transition: transform 0.3s;
    }
    p.lyric.active {
      color: #0d16a0;
      font-size: 42px;
    }
  }
}
</style>