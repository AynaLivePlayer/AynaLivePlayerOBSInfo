<script setup lang="ts">
import {usePlaylistsStore} from "@/stores/playlists";
import {getPictureUrl} from "@/utils";
import {onMounted, watch} from "vue";
import {WebInfoClient} from "@/api/client";
import {useRoute} from "vue-router";
import type {Media} from "@/api/model";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const playlistsStore = usePlaylistsStore();
const wsClient = WebInfoClient.getInstance();

// from the route, get the playlist ID
const route = useRoute()

watch(
    () => route.params.id,
    async newId => {
      wsClient?.sendEvent(
          "cmd.playlist.manager.get.current",
          {
            PlaylistID: route.params.id,
          },
      )
    }
)

const play = (media: Media) => {
  wsClient?.sendEvent(
      "cmd.player.op.play",
      {
        Media: media,
      },
  )
}

</script>

<template>
  <div class="m-4 md:m-8 flex flex-col gap-y-8 items-center">
    <!--    <CollectionHeader-->
    <!--        type="playlist"-->
    <!--        :collection="playlist"-->
    <!--        :play="() => play()"-->
    <!--    />-->

    <table class="table table-zebra table-fixed w-full">
      <thead>
      <tr>
        <th class="w-3"> #</th>
        <th class="w-16"></th>
        <th>歌名</th>
        <th>歌手</th>
        <th>专辑</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(media, index) in playlistsStore.currentPlaylistMedias"
          :key="index"
          class="h-16 hover group"
      >
        <td class="place-content-center">
          <div class="cursor-pointer"  @click="play(media)">
            <span class="group-hover:hidden w-full text-center">{{ index + 1 }}</span>
            <font-awesome-icon
                icon="fa-solid fa-play"
                class="inset-0 hidden group-hover:flex justify-center items-center w-2 text-neutral"
            />
          </div>
        </td>
        <td>
          <div @click="" class="relative">
            <img
                :src="getPictureUrl(media.Info.Cover)"
                class="object-cover rounded group-hover:brightness-75 aspect-square"
            />

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
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
