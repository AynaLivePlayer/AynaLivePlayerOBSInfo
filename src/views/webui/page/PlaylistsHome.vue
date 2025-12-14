<script setup lang="ts">
import {ref, watch} from "vue";
import {useRouter} from "vue-router";
import {usePlaylistsStore} from "@/stores/playlists";
import {useProvidersStore} from "@/stores/providers";
import {WebInfoClient} from "@/api/client";
import {MetaID} from "@/utils";

const playlistsStore = usePlaylistsStore();
const providersStore = useProvidersStore();
const wsClient = WebInfoClient.getInstance();
const router = useRouter();

const form = ref({
  provider: "",
  url: "",
});

watch(
  () => providersStore.mediaProviders,
  (providers) => {
    if (!form.value.provider && providers.length > 0) {
      form.value.provider = providers[0];
    }
  },
  {deep: true},
);

function addPlaylist() {
  if (!form.value.provider || !form.value.url) return;
  wsClient?.sendEvent("cmd.playlist.manager.add", {
    Provider: form.value.provider,
    URL: form.value.url,
  });
  form.value.url = "";
}

function removePlaylist(id: string) {
  wsClient?.sendEvent("cmd.playlist.manager.remove", {
    PlaylistID: id,
  });
}

function setAsSystem(id: string) {
  wsClient?.sendEvent("cmd.playlist.manager.set.system", {
    PlaylistID: id,
  });
}

function openDetail(id: string) {
  router.push({name: "webui.playlists", params: {id}});
}
</script>

<template>
  <div class="p-4 md:p-6 space-y-4">
    <div class="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4">
      <div class="card bg-base-200 shadow">
        <div class="card-body space-y-4">
          <div class="space-y-1">
            <h3 class="text-lg font-semibold">添加歌单</h3>
            <p class="text-sm text-base-content/60">选择来源后填入链接或ID</p>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-sm">来源</span>
            </label>
            <select
              v-model="form.provider"
              class="select select-bordered"
            >
              <option value="" disabled>选择来源</option>
              <option
                v-for="provider in providersStore.mediaProviders"
                :key="provider"
                :value="provider"
              >
                {{ provider }}
              </option>
            </select>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-sm">歌单ID / 链接</span>
            </label>
            <input
              v-model="form.url"
              class="input input-bordered"
              placeholder="例如网易云歌单链接"
            />
          </div>
          <button class="btn btn-primary w-full" :disabled="!form.provider || !form.url" @click="addPlaylist">
            添加
          </button>
        </div>
      </div>

      <div class="card bg-base-100 shadow">
        <div class="card-body overflow-x-auto">
          <div class="flex items-center justify-between mb-2">
            <div>
              <h3 class="text-lg font-semibold">歌单列表</h3>
              <p class="text-sm text-base-content/60">
                当前系统歌单：
                <span v-if="playlistsStore.systemPlaylist">
                  {{ playlistsStore.systemPlaylist.Title || MetaID(playlistsStore.systemPlaylist.Meta) }}
                </span>
                <span v-else>未设置</span>
              </p>
            </div>
            <span class="text-xs text-base-content/60">{{ playlistsStore.playlists.length }} 个</span>
          </div>
          <table class="table">
            <thead>
            <tr>
              <th>名称</th>
              <th class="w-24 text-center">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr
              v-for="playlist in playlistsStore.playlists"
              :key="MetaID(playlist.Meta)"
            >
              <td>
                <div class="font-medium truncate">{{ playlist.Title || MetaID(playlist.Meta) }}</div>
                <div class="text-xs text-base-content/60 truncate">
                  {{ playlist.Meta.Provider }} / {{ playlist.Meta.Identifier }}
                </div>
              </td>
              <td>
                <div class="flex flex-wrap gap-1 justify-end">
                  <button class="btn btn-xs" @click="openDetail(MetaID(playlist.Meta))">查看</button>
                  <button class="btn btn-xs btn-outline" @click="setAsSystem(MetaID(playlist.Meta))">设为系统</button>
                  <button class="btn btn-xs btn-ghost text-error" @click="removePlaylist(MetaID(playlist.Meta))">删除</button>
                </div>
              </td>
            </tr>
            <tr v-if="playlistsStore.playlists.length === 0">
              <td colspan="2" class="text-center text-base-content/60">暂无歌单</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
