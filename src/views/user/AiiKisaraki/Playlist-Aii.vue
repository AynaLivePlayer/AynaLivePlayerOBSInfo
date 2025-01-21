<script lang="ts" setup>
import {usePlayInfoStore} from "@/stores/playinfo";
import {onMounted, watch} from "vue";
import PlaylistTitle from "@/components/playlist/PlaylistTitle.vue";
import PlaylistArtist from "@/components/playlist/PlaylistArtist.vue";
import PlaylistUser from "@/components/playlist/PlaylistUser.vue";


const playInfoStore = usePlayInfoStore();



</script>

<template>
  <div class="playlist-content m-4 overflow-hidden">
    <div class="play-item">

    </div>
  </div>
</template>

<style lang="less" scoped>
  .playlist-content {
    width: 100%;
    height: 100%;
  }
</style>