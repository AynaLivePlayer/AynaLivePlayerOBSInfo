<script setup lang="ts">
import {computed, reactive, watch} from "vue";
import {useLiveRoomStore} from "@/stores/liverooms";
import {WebInfoClient} from "@/api/client";
import {getLiveRoomIdentifier} from "@/utils";

const liveRoomStore = useLiveRoomStore();
const wsClient = WebInfoClient.getInstance();

const form = reactive({
  title: "",
  provider: "",
  room: "",
});

const selectedId = computed(() => liveRoomStore.selectedRoomId);

watch(
  () => liveRoomStore.providers,
  (providers) => {
    if (!form.provider && providers.length > 0) {
      form.provider = providers[0].Name;
    }
  },
  {deep: true},
);

function pickRoom(provider: string, room: string) {
  liveRoomStore.setSelectedRoom(getLiveRoomIdentifier(provider, room));
}

function connectRoom(connect: boolean) {
  const room = liveRoomStore.selectedRoom;
  if (!room) return;
  wsClient?.sendEvent("cmd.liveroom.operation", {
    Identifier: getLiveRoomIdentifier(room.LiveRoom.Provider, room.LiveRoom.Room),
    SetConnect: connect,
  });
}

function toggleAutoConnect(checked: boolean) {
  const room = liveRoomStore.selectedRoom;
  if (!room) return;
  wsClient?.sendEvent("cmd.liveroom.config.change", {
    Identifier: getLiveRoomIdentifier(room.LiveRoom.Provider, room.LiveRoom.Room),
    Config: {
      AutoConnect: checked,
    },
  });
}

function removeRoom() {
  const room = liveRoomStore.selectedRoom;
  if (!room) return;
  wsClient?.sendEvent("cmd.liveroom.remove", {
    Identifier: getLiveRoomIdentifier(room.LiveRoom.Provider, room.LiveRoom.Room),
  });
}

function submitNewRoom() {
  if (!form.provider || !form.room) return;
  wsClient?.sendEvent("cmd.liveroom.add", {
    Title: form.title,
    Provider: form.provider,
    RoomKey: form.room,
  });
  form.title = "";
  form.room = "";
}

const selectedRoom = computed(() => liveRoomStore.selectedRoom);
</script>

<template>
  <div class="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4">
    <div class="space-y-4">
      <div class="card bg-base-200 shadow">
        <div class="card-body space-y-3">
          <div class="form-control">
            <label class="label">
              <span class="label-text text-sm">直播平台</span>
            </label>
            <select
              v-model="form.provider"
              class="select select-bordered"
            >
              <option value="" disabled>选择平台</option>
              <option
                v-for="provider in liveRoomStore.providers"
                :key="provider.Name"
                :value="provider.Name"
              >
                {{ provider.Name }}
              </option>
            </select>
            <p class="text-xs text-base-content/60 mt-1">
              {{
                liveRoomStore.providers.find((p) => p.Name === form.provider)?.Description
                  || '选择平台后输入房间号'
              }}
            </p>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-sm">房间号 / 链接</span>
            </label>
            <input
              v-model="form.room"
              class="input input-bordered"
              placeholder="例如 123456"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-sm">自定义名称 (可选)</span>
            </label>
            <input
              v-model="form.title"
              class="input input-bordered"
              placeholder="展示名"
            />
          </div>
          <button class="btn btn-primary w-full" :disabled="!form.provider || !form.room" @click="submitNewRoom">
            添加直播间
          </button>
        </div>
      </div>

      <div class="card bg-base-100 shadow">
        <div class="card-body p-0">
          <div class="px-4 py-3 border-b border-base-200 flex items-center justify-between">
            <h3 class="font-semibold">直播间列表</h3>
            <span class="text-xs text-base-content/60">{{ liveRoomStore.rooms.length }} 个</span>
          </div>
          <div class="max-h-[400px] overflow-y-auto">
            <ul class="menu p-2">
              <li
                v-for="room in liveRoomStore.rooms"
                :key="getLiveRoomIdentifier(room.LiveRoom.Provider, room.LiveRoom.Room)"
              >
                <a
                  class="flex justify-between"
                  :class="{'active': selectedId === getLiveRoomIdentifier(room.LiveRoom.Provider, room.LiveRoom.Room)}"
                  @click="pickRoom(room.LiveRoom.Provider, room.LiveRoom.Room)"
                >
                  <div>
                    <div class="font-medium truncate">{{ room.Title || getLiveRoomIdentifier(room.LiveRoom.Provider, room.LiveRoom.Room) }}</div>
                    <div class="text-xs text-base-content/60 truncate">{{ room.LiveRoom.Provider }} / {{ room.LiveRoom.Room }}</div>
                  </div>
                  <span
                    class="badge badge-sm"
                    :class="room.Status ? 'badge-success' : 'badge-ghost'"
                  >
                    {{ room.Status ? '已连接' : '未连接' }}
                  </span>
                </a>
              </li>
              <li v-if="liveRoomStore.rooms.length === 0" class="px-4 py-2 text-sm text-base-content/60">
                暂无直播间
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow min-h-[300px]">
      <div class="card-body">
        <template v-if="selectedRoom">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-semibold">{{ selectedRoom.Title || getLiveRoomIdentifier(selectedRoom.LiveRoom.Provider, selectedRoom.LiveRoom.Room) }}</h2>
              <p class="text-sm text-base-content/60">
                {{ selectedRoom.LiveRoom.Provider }} / {{ selectedRoom.LiveRoom.Room }}
              </p>
            </div>
            <div class="badge" :class="selectedRoom.Status ? 'badge-success' : 'badge-ghost'">
              {{ selectedRoom.Status ? '已连接' : '未连接' }}
            </div>
          </div>

          <div class="divider my-3"></div>

          <div class="flex flex-wrap gap-2">
            <button class="btn btn-sm" @click="connectRoom(true)">连接</button>
            <button class="btn btn-sm" @click="connectRoom(false)">断开</button>
            <button class="btn btn-sm btn-outline" @click="removeRoom">删除</button>
          </div>

          <div class="form-control mt-4">
            <label class="label cursor-pointer">
              <span class="label-text">自动连接</span>
              <input
                type="checkbox"
                class="toggle"
                :checked="selectedRoom.Config.AutoConnect"
                @change="toggleAutoConnect(($event.target as HTMLInputElement).checked)"
              />
            </label>
          </div>
        </template>
        <template v-else>
          <p class="text-base-content/60">请选择一个直播间</p>
        </template>
      </div>
    </div>
  </div>
</template>
