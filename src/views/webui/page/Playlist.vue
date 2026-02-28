<script setup lang="ts">
import {usePlaylistsStore} from "@/stores/playlists";
import {getPictureUrl, MetaID} from "@/utils";
import {computed, onMounted, watch} from "vue";
import {WebInfoClient} from "@/api/client";
import {useRoute} from "vue-router";
import type {Media} from "@/api/model";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const playlistsStore = usePlaylistsStore();
const wsClient = WebInfoClient.getInstance();

// from the route, get the playlist ID
const route = useRoute()

const playlistInfo = computed(() => {
  return playlistsStore.playlists.find((p) => MetaID(p.Meta) === route.params.id);
});

watch(
    () => route.params.id,
    async newId => {
      if (!newId) return;
      requestPlaylist(newId as string);
    }
)

onMounted(() => {
  if (route.params.id) {
    requestPlaylist(route.params.id as string);
  }
})

const requestPlaylist = (id: string) => {
  wsClient?.sendEvent(
      "cmd.playlist.manager.get.current",
      {
        PlaylistID: id,
      },
  )
}

const setSystem = () => {
  if (!route.params.id) return;
  wsClient?.sendEvent("cmd.playlist.manager.set.system", {
    PlaylistID: route.params.id,
  })
}

const refreshPlaylist = () => {
  if (!route.params.id) return;
  requestPlaylist(route.params.id as string);
  wsClient?.sendEvent("cmd.playlist.manager.refresh.current", {
    PlaylistID: route.params.id,
  });
}

const removePlaylist = () => {
  if (!route.params.id) return;
  wsClient?.sendEvent("cmd.playlist.manager.remove", {
    PlaylistID: route.params.id,
  });
}

const play = (media: Media) => {
  wsClient?.sendEvent(
      "cmd.player.op.play",
      {
        Media: media,
      },
  )
}

const addToQueue = (media: Media) => {
  wsClient?.sendEvent(
    "cmd.playlist.insert.player",
    {
      Position: -1,
      Media: media,
    },
  )
}

</script>

<template>
  <div class="m-4 md:m-8 flex flex-col gap-y-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 class="text-2xl font-semibold">
          {{ playlistInfo?.Title || '歌单详情' }}
        </h2>
        <p v-if="playlistInfo" class="text-sm text-base-content/60">
          {{ playlistInfo.Meta.Provider }} / {{ playlistInfo.Meta.Identifier }}
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button class="btn btn-sm" @click="refreshPlaylist">刷新</button>
        <button class="btn btn-sm btn-outline" @click="setSystem">设为系统歌单</button>
        <button class="btn btn-sm btn-ghost text-error" @click="removePlaylist">删除</button>
      </div>
    </div>

    <table class="table table-zebra table-fixed w-full">
      <thead>
      <tr>
        <th class="w-3"> #</th>
        <th class="w-16"></th>
        <th>歌名</th>
        <th>歌手</th>
        <th>专辑</th>
        <th class="w-28 text-center">操作</th>
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
        <td>
          <div class="join w-full justify-center">
            <button class="btn btn-xs join-item" @click="play(media)">播放</button>
            <button class="btn btn-xs join-item" @click="addToQueue(media)">加入</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
