<script setup lang="ts">
import {computed, watch} from "vue";
import {useSearchStore} from "@/stores/search";
import {useProvidersStore} from "@/stores/providers";
import {WebInfoClient} from "@/api/client";
import type {Media} from "@/api/model";
import {getPictureUrl} from "@/utils";

const searchStore = useSearchStore();
const providersStore = useProvidersStore();
const wsClient = WebInfoClient.getInstance();

const canSearch = computed(() => searchStore.keyword.trim().length > 0 && searchStore.provider !== "");

watch(
  () => providersStore.mediaProviders,
  (providers) => {
    if (!searchStore.provider && providers.length > 0) {
      searchStore.setProvider(providers[0]);
    }
  },
  {deep: true},
);

function doSearch() {
  if (!canSearch.value) return;
  searchStore.setLoading(true);
  wsClient?.sendEvent("cmd.search", {
    Keyword: searchStore.keyword,
    Provider: searchStore.provider,
  });
}

function play(media: Media) {
  wsClient?.sendEvent("cmd.player.op.play", {
    Media: media,
  });
}

function addToQueue(media: Media) {
  wsClient?.sendEvent("cmd.playlist.insert.player", {
    Position: -1,
    Media: media,
  });
}
</script>

<template>
  <div class="p-4 md:p-6 space-y-4">
    <div class="card bg-base-200 shadow">
      <div class="card-body">
        <div class="grid grid-cols-1 md:grid-cols-[2fr_1fr_auto] gap-4 items-end">
          <div class="form-control">
            <label class="label">
              <span class="label-text text-sm">关键字</span>
            </label>
            <input
              v-model="searchStore.keyword"
              type="text"
              class="input input-bordered"
              placeholder="歌曲 / 歌手 / 链接"
              @keyup.enter="doSearch"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-sm">来源</span>
            </label>
            <select
              v-model="searchStore.provider"
              class="select select-bordered"
            >
              <option
                v-for="provider in providersStore.mediaProviders"
                :key="provider"
                :value="provider"
              >
                {{ provider }}
              </option>
            </select>
          </div>
          <button
            class="btn btn-primary"
            :disabled="!canSearch || searchStore.loading"
            @click="doSearch"
          >
            <span v-if="searchStore.loading" class="loading loading-spinner"></span>
            <span>搜索</span>
          </button>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow">
      <div class="card-body overflow-x-auto">
        <div class="flex items-center justify-between mb-2">
          <h3 class="font-semibold">搜索结果</h3>
          <span class="text-sm text-base-content/60">共 {{ searchStore.results.length }} 条</span>
        </div>
        <div class="overflow-x-auto">
          <table class="table table-zebra">
            <thead>
            <tr>
              <th class="w-10">#</th>
              <th class="w-16"></th>
              <th>歌名</th>
              <th>歌手</th>
              <th>来源</th>
              <th class="w-28 text-center">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr
              v-for="(media, index) in searchStore.results"
              :key="index"
              class="hover"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <img
                  :src="getPictureUrl(media.Info.Cover)"
                  alt="cover"
                  class="w-14 h-14 object-cover rounded"
                />
              </td>
              <td class="truncate">{{ media.Info.Title }}</td>
              <td class="truncate">{{ media.Info.Artist }}</td>
              <td class="truncate">{{ media.Info.Meta.Provider }}</td>
              <td>
                <div class="join w-full justify-center">
                  <button class="btn btn-xs join-item" @click="play(media)">播放</button>
                  <button class="btn btn-xs join-item" @click="addToQueue(media)">加入</button>
                </div>
              </td>
            </tr>
            <tr v-if="searchStore.results.length === 0">
              <td colspan="6" class="text-center text-base-content/60">暂无结果</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
