<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-01-09 14:00:00
 * @LastEditors: Aii如樱如月 morikawa2021@163.com
 * @LastEditTime: 2025-01-12 23:13:50
 * @FilePath: \AynaLivePlayerOBSInfo\src\views\user\AiiKisaraki\PlayerPage-Aii.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="ts" setup>
import MediaCover from "@/components/current/MediaCover.vue";
import MediaTitle from "@/components/current/MediaTitle.vue";
import MediaArtist from "@/components/current/MediaArtist.vue";
import MediaUsername from "@/components/current/MediaUsername.vue";
import { computed, onMounted, ref, watch } from "vue";
import CurrentTime from "@/components/current/CurrentTime.vue";
import TotalTime from "@/components/current/TotalTime.vue";
import { usePlayInfoStore } from "@/stores/playinfo";
import CurrentLyricCN from "@/components/current/CurrentLyricCN.vue";
import ScrollLeftRight from "@/components/common/ScrollLeftRight.vue";

const playInfoStore = usePlayInfoStore();

const playStatus = ref(true);

const progressPercentage = computed(() => {
  if (playInfoStore.duration > 0) {
    return (playInfoStore.timePos / playInfoStore.duration) * 100;
  }
  return 0;
});
</script>

<template>
    <div class="aii-player relative rounded-3xl border-2 border-indigo-300 shadow-lg border-dashed">
        <div class="bottom-player absolute bottom-0"></div>
    </div>
</template>

<style scoped>
.aii-player {
    width: 1920px;
    height: 1080px;
    overflow: hidden;
}
.bottom-player {
    width: 1920px;
    height: 70px;
    background-color: orange;
}
</style>