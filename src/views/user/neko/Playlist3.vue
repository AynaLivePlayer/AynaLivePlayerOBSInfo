<script setup lang="ts">
import {usePlayInfoStore} from "@/stores/playinfo";
import PlaylistTitle from "@/components/playlist/PlaylistTitle.vue";
import PlaylistArtist from "@/components/playlist/PlaylistArtist.vue";
import PlaylistUser from "@/components/playlist/PlaylistUser.vue";

const playInfoStore = usePlayInfoStore();

</script>

<template>
  <div class="m-4 overflow-hidden">
    <ul id="playlist" class="space-y-4">
      <li
          class="playlistItem flex justify-between items-center border-b pb-2"
          v-for="(item, index) in playInfoStore.playlist"
          :key="index"
      >
        <div class="flex items-center">
          <span class="font-semibold text-lg text-black">{{ "#" + (index + 1) }}</span>
          <playlist-title :index="index" class="ml-4 text-xl font-bold text-gray-700"></playlist-title>&nbsp;-&nbsp;
          <playlist-artist :index="index" class="text-xl font-bold text-gray-700"></playlist-artist>
          <span class="ml-4 text-base text-gray-500">@<playlist-user :index="index"></playlist-user></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.space-y-4 > :not([hidden]) ~ :not([hidden]){
	margin-top: 0;
}
.pb-2{
	padding: 0;
	line-height: 2;
}
</style>
