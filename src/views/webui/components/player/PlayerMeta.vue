<script setup lang="ts">
// const { player, deviceId } = useSpotifyPlayer();
// const { spotifyApi } = useSpotifyApi();
// const state = await useSpotifyState();
//
// const volume = ref(state.value.device?.volume_percent ?? 100);
//
// watch(
//   () => state.value.device?.volume_percent,
//   (v) => {
//     volume.value = v;
//   }
// );
// watch(volume, (volume) => {
//   spotifyApi.value.setVolume(volume);
// });
//
// const spotConnDevices = ref<SpotifyApi.UserDevice[]>([]);
//
// async function refreshConn() {
//   const resp = await spotifyApi.value.getMyDevices();
//   spotConnDevices.value = resp.devices;
// }
//
// async function switchDevice(id: string) {
//   if (id === deviceId.value) await player.value.activateElement();
//   await spotifyApi.value.transferMyPlayback([id]);
//   refreshConn();
// }
// todo: finish this
import {usePlayInfoStore} from "@/stores/playinfo";
import {computed} from "vue";
import {WebInfoClient} from "@/api/client";

const playinfoStore = usePlayInfoStore();

const computedVolume = computed(() => {
  return playinfoStore.volume > 100 ? 100 : playinfoStore.volume;
});

const wsClient = WebInfoClient.getInstance();

function changeVolume(event: MouseEvent) {
  const target = event.target as HTMLInputElement;
  wsClient?.sendEvent("cmd.player.op.change_volume", {
    "Volume": target.valueAsNumber,
  });
}


</script>

<template>
  <div class="flex items-center justify-center gap-x-6">
    <div class="flex items-center justify-center gap-x-2">
      <font-awesome-icon icon="fa-solid fa-volume-low" class="fa-sm" />
      <input
        type="range"
        min="0"
        :value="computedVolume"
        max="100"
        @mouseup="changeVolume"
        class="w-20 slider"
        :style="`--progress: ${computedVolume}%`"
      />
      <font-awesome-icon icon="fa-solid fa-volume-high" class="fa-sm" />
    </div>

<!--    <div class="dropdown dropdown-end dropdown-hover">-->
<!--      <label-->
<!--        tabindex="0"-->
<!--        @mouseenter="refreshConn"-->
<!--        class="btn btn-sm btn-ghost"-->
<!--      >-->
<!--        <font-awesome-icon-->
<!--          icon="fa-solid fa-house-signal"-->
<!--          :class="{-->
<!--            'text-primary': !spotConnDevices.find((d) => d.id === deviceId)-->
<!--              ?.is_active-->
<!--          }"-->
<!--        />-->
<!--      </label>-->
<!--      <ul-->
<!--        tabindex="0"-->
<!--        class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"-->
<!--      >-->
<!--        <li-->
<!--          v-for="device in spotConnDevices.filter((d) => d.id !== null)"-->
<!--          :key="device.id!"-->
<!--        >-->
<!--          <a-->
<!--            @click="switchDevice(device.id!)"-->
<!--            class="grid grid-rows-2"-->
<!--            :class="{ active: device.is_active }"-->
<!--          >-->
<!--            <span>{{ device.name }}</span>-->
<!--            <span class="text-sm space-x-2">-->
<!--              <font-awesome-icon icon="fa-solid fa-house-laptop" />-->
<!--              <span>{{ device.type }}</span>-->
<!--            </span>-->
<!--          </a>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->
  </div>
</template>
