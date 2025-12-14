<script setup lang="ts">
import {useHistoryStore} from "@/stores/history";
import {WebInfoClient} from "@/api/client";
import type {Media} from "@/api/model";
import {getPictureUrl, getUsername} from "@/utils";

const historyStore = useHistoryStore();
const wsClient = WebInfoClient.getInstance();

const play = (media: Media) => {
  wsClient?.sendEvent(
    "cmd.player.op.play",
    {
      Media: media,
    },
  );
}

const addToQueue = (media: Media) => {
  wsClient?.sendEvent(
    "cmd.playlist.insert.player",
    {
      Position: -1,
      Media: media,
    },
  );
}
</script>

<template>
  <div class="p-4 md:p-6 space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold">历史播放</h2>
      <span class="text-sm text-base-content/60">共 {{ historyStore.items.length }} 条</span>
    </div>
    <div class="card bg-base-100 shadow">
      <div class="card-body overflow-x-auto">
        <table class="table table-zebra">
          <thead>
          <tr>
            <th class="w-10">#</th>
            <th class="w-16"></th>
            <th>歌名</th>
            <th>歌手</th>
            <th>点歌用户</th>
            <th class="w-28 text-center">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="(media, index) in historyStore.latestFirst"
            :key="index"
            class="hover"
          >
            <td>{{ index + 1 }}</td>
            <td>
              <img
                :src="getPictureUrl(media.Info.Cover)"
                class="w-12 h-12 rounded object-cover"
                alt="cover"
              />
            </td>
            <td class="truncate">{{ media.Info.Title }}</td>
            <td class="truncate">{{ media.Info.Artist }}</td>
            <td class="truncate">{{ getUsername(media.User) }}</td>
            <td>
              <div class="join w-full justify-center">
                <button class="btn btn-xs join-item" @click="play(media)">播放</button>
                <button class="btn btn-xs join-item" @click="addToQueue(media)">加入</button>
              </div>
            </td>
          </tr>
          <tr v-if="historyStore.latestFirst.length === 0">
            <td colspan="6" class="text-center text-base-content/60">暂无历史记录</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
