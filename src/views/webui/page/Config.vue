<script setup lang="ts">
import {computed} from "vue";
import {WebInfoClient} from "@/api/client";
import {useConfigStore} from "@/stores/config";

const configStore = useConfigStore();
const wsClient = WebInfoClient.getInstance();

const audioDeviceOptions = computed(() => configStore.audioDevices);

function renderVersion(version: number | string) {
  if (typeof version === "number") {
    const major = (version >> 16) & 0xff;
    const minor = (version >> 8) & 0xff;
    const patch = version & 0xff;
    return `${major}.${minor}.${patch}`;
  }
  return version ?? "";
}

function togglePlaylistMode(id: "player" | "system", checked: boolean) {
  const mode = checked ? 1 : 0;
  wsClient?.sendEvent(`cmd.playlist.mode.${id}`, {
    Mode: mode,
  });
}

function selectAudioDevice(deviceName: string) {
  if (!deviceName) return;
  wsClient?.sendEvent("cmd.player.set_audio_device", {
    Device: deviceName,
  });
}

function checkUpdate() {
  wsClient?.sendEvent("cmd.update.check", {});
}

const updateStatus = computed(() => {
  if (configStore.hasUpdate === null) return "未检查";
  return configStore.hasUpdate ? "发现新版本" : "已是最新";
});
</script>

<template>
  <div class="p-4 md:p-6 space-y-4">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="card bg-base-100 shadow">
        <div class="card-body space-y-4">
          <h3 class="text-lg font-semibold">点歌模式</h3>
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">随机播放 - 点歌列表</span>
              <input
                type="checkbox"
                class="toggle"
                :checked="configStore.playlistModes.player !== 0"
                @change="togglePlaylistMode('player', ($event.target as HTMLInputElement).checked)"
              />
            </label>
          </div>
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">随机播放 - 系统歌单</span>
              <input
                type="checkbox"
                class="toggle"
                :checked="configStore.playlistModes.system !== 0"
                @change="togglePlaylistMode('system', ($event.target as HTMLInputElement).checked)"
              />
            </label>
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow">
        <div class="card-body space-y-4">
          <h3 class="text-lg font-semibold">输出设备</h3>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-sm">音频输出</span>
            </label>
            <select
              class="select select-bordered"
              :value="configStore.currentAudioDevice"
              @change="selectAudioDevice(($event.target as HTMLSelectElement).value)"
            >
              <option
                v-for="device in audioDeviceOptions"
                :key="device.Name"
                :value="device.Name"
              >
                {{ device.Description }}
              </option>
            </select>
            <p class="text-xs text-base-content/60 mt-1">
              设备列表由播放器提供，切换后稍等片刻生效。
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow">
      <div class="card-body space-y-2">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold">版本更新</h3>
            <p class="text-sm text-base-content/60">{{ updateStatus }}</p>
            <p v-if="configStore.updateInfo" class="text-sm mt-1">
              版本号：{{ renderVersion(configStore.updateInfo.Version) }}<br />
              {{ configStore.updateInfo.Info }}
            </p>
          </div>
          <button class="btn btn-primary" @click="checkUpdate">
            检查更新
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
