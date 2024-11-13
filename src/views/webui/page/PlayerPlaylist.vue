<script setup lang="ts">
import {usePlaylistsStore} from "@/stores/playlists";
import {getPictureUrl, getUsername} from "@/utils";
import {WebInfoClient} from "@/api/client";
import {usePlayInfoStore} from "@/stores/playinfo";


const playinfoStore = usePlayInfoStore();
const wsClient = WebInfoClient.getInstance();

</script>

<template>
  <div class="m-4 md:m-8 flex flex-col gap-y-8 items-center">
    <table class="table table-zebra table-fixed w-full">
      <thead>
      <tr>
        <th class="w-16"></th>
        <th>歌名</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>点歌用户</th>
        <!--        <th class="w-16">Time</th>-->
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(media, index) in playinfoStore.playlist"
          :key="index"
          class="h-16 hover group"
      >
        <td>
          <div @click="" class="relative">
            <img
                :src="getPictureUrl(media.Info.Cover)"
                class="object-cover rounded group-hover:brightness-75 aspect-square"
            />
            <div
                class="absolute bottom-0 w-full h-full hidden group-hover:flex justify-center items-center"
            >
              <font-awesome-icon
                  icon="fa-solid fa-play"
                  class="w-2 text-neutral"
              />
            </div>
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
  </div>
</template>

<style scoped>

</style>
