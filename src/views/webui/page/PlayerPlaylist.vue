<script setup lang="ts">
import {getPictureUrl, getUsername} from "@/utils";
import {WebInfoClient} from "@/api/client";
import {usePlayInfoStore} from "@/stores/playinfo";
import type {Media} from "@/api/model";
import {type SortableEvent, VueDraggable} from "vue-draggable-plus";
import {ref, watch} from "vue";


const playinfoStore = usePlayInfoStore();
const wsClient = WebInfoClient.getInstance();

// this is pending playlist, so when play it we need to remove it from pending playlist
const play = (index: number, media: Media) => {
  wsClient?.sendEvent(
      "cmd.playlist.delete.player",
      {
        Index: index,
      },);
  wsClient?.sendEvent(
      "cmd.player.op.play",
      {
        Media: media,
      },
  )
}

const onDragEnd = (event: SortableEvent) => {
  if (event.oldIndex === event.newIndex) {
    return;
  }
  wsClient?.sendEvent(
      "cmd.playlist.move.player",
      {
        From: event.oldIndex,
        To: event.newIndex,
      },
  )
}

// currentMedias is copy of playlist, so we can drag it
const currentMedias = ref(playinfoStore.playlist.map((media) => media));

watch(playinfoStore.playlist, (newVal) => {
  currentMedias.value = newVal.map((media) => media);
})

</script>

<template>
  <div class="m-4 md:m-8 flex flex-col gap-y-8 items-center">
    <VueDraggable v-model="currentMedias" target=".draggable-playlist" :animation="150" @end="onDragEnd">
    <table class="table table-zebra table-fixed w-full">
      <thead>
      <tr>
        <th class="w-3"> #</th>
        <th class="w-16"></th>
        <th>歌名</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>点歌用户</th>
        <!--        <th class="w-16">Time</th>-->
      </tr>
      </thead>
      <tbody class="draggable-playlist" >
      <tr
          v-for="(media, index) in currentMedias"
          :key="index"
          class="h-16 hover group"
      >
        <td class="place-content-center" @click="play(index,media)">
          <span class="group-hover:hidden w-full text-center">{{ index + 1 }}</span>
          <font-awesome-icon
              icon="fa-solid fa-play"
              class="inset-0 hidden group-hover:flex justify-center items-center w-2 text-neutral"
          />
        </td>
        <td>
          <div class="relative cursor-move">
            <img :src="getPictureUrl(media.Info.Cover)"
                 class="object-cover rounded group-hover:brightness-75 aspect-square"/>
          </div>
        </td>
        <td class="truncate">
          {{ media.Info.Title }}
        </td>
        <td class="truncate">
          {{ media.Info.Artist }}
        </td>
        <td class="truncate">
          {{ media.Info.Album }}
        </td>
        <td class="truncate">
          {{ getUsername(media.User) }}
        </td>
        <!--        <td>-->
        <!--          {{ millisToMinutesAndSeconds(song.track.duration_ms) }}-->
        <!--        </td>-->
      </tr>
      </tbody>
    </table>
    </VueDraggable>
  </div>
</template>

<style scoped>

</style>
