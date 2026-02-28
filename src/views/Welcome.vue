<script setup lang="ts">
import {computed} from "vue";
import {useRouter} from "vue-router";
import Player1 from "@/views/builtin/player1/Player1.vue";
import Playlist1 from "@/views/builtin/player1/Playlist1.vue";
import Player2 from "@/views/builtin/player2/Player2.vue";
import Player2Right from "@/views/builtin/player2/Player2Right.vue";
import NowPlaying1 from "@/views/builtin/nowplaying/NowPlaying1.vue";
import NowPlaying2 from "@/views/builtin/nowplaying/NowPlaying2.vue";
import NowPlayingPlaylist1 from "@/views/builtin/nowplaying/NowPlayingPlaylist1.vue";
import PlayerNormalAii from "@/views/user/AiiKisaraki/PlayerNormal-Aii.vue";
import PlayerMiniAii from "@/views/user/AiiKisaraki/PlayerMini-Aii.vue";
import PlaylistAii from "@/views/user/AiiKisaraki/Playlist-Aii.vue";
import PlayerPageAii from "@/views/user/AiiKisaraki/PlayerPage-Aii.vue";
import WebuiPlayer from "@/views/webui/page/Player.vue";

const router = useRouter();

type Showcase = {
  title: string;
  author?: string;
  path: string;
  size?: string;
  tag?: string;
  component: any;
  scale?: number;
  height?: string;
};

const groups: Record<string, Showcase[]> = {
  "官方样式": [
    { title: "播放器样式1", author: "Aynakeya", path: "/builtin/player1", size: "600 × 200", tag: "Player", component: Player1, scale: 0.6, height: "220px" },
    { title: "播放列表", author: "Aynakeya", path: "/builtin/player1/playlist", size: "600 × auto", tag: "Playlist", component: Playlist1, scale: 0.82, height: "260px" },
    { title: "播放器样式2", author: "@立青", path: "/builtin/player2", size: "450 × 150+", tag: "Player", component: Player2, scale: 0.95, height: "200px" },
    { title: "播放器样式2 右对齐", author: "@立青", path: "/builtin/player2_right", size: "450 × 150+", tag: "Player", component: Player2Right, scale: 0.95, height: "200px" },
  ],
  "nowplaying样式": [
    { title: "当前播放1", author: "Aynakeya", path: "/builtin/nowplaying/1", size: "596 × 200", tag: "NowPlaying", component: NowPlaying1, scale: 0.62, height: "220px" },
    { title: "当前播放2", author: "Aynakeya", path: "/builtin/nowplaying/2", size: "280 × 610", tag: "NowPlaying", component: NowPlaying2, scale: 0.42, height: "320px" },
    { title: "播放列表1", author: "Aynakeya", path: "/builtin/nowplaying/playlist1", size: "596 × 300", tag: "Playlist", component: NowPlayingPlaylist1, scale: 0.62, height: "250px" },
  ],
  "Aii 如樱如月": [
    { title: "大播放器", author: "@Aii如樱如月", path: "/user/aiikisaraki/playernormal", size: "600 × 200", tag: "Player", component: PlayerNormalAii, scale: 0.6, height: "320px" },
    { title: "迷你播放器", author: "@Aii如樱如月", path: "/user/aiikisaraki/playermini", size: "220 × 80", tag: "Player", component: PlayerMiniAii, scale: 1, height: "140px" },
    { title: "当前播放列表", author: "@Aii如樱如月", path: "/user/aiikisaraki/playlist", size: "600 × 1000", tag: "Playlist", component: PlaylistAii, scale: 0.6, height: "520px" },
    { title: "点歌机展示页", author: "@Aii如樱如月", path: "/user/aiikisaraki/playerpage", size: "全屏", tag: "Page", component: PlayerPageAii, scale: 0.2, height: "420px" },
  ],
  "WebUI": [
    { title: "控制台 WebUI", author: "Aynakeya", path: "/webui/player", size: "响应式", tag: "WebUI", component: WebuiPlayer, scale: 0.2, height: "260px" },
  ],
};

const cards = computed(() =>
  Object.entries(groups).map(([name, items]) => ({ name, items }))
);

const openLink = (path: string) => router.push(path);
</script>

<template>
  <div class="px-6 py-8 space-y-6">
    <div class="card bg-gradient-to-r from-primary/10 via-base-100 to-secondary/10 shadow-md">
      <div class="card-body">
        <h1 class="text-3xl font-bold text-base-content">欢迎使用 AynaLivePlayer OBS Info</h1>
        <p class="text-base text-base-content/70">
          开启 WebSocket 服务器后，直接在下方卡片中实时预览各类样式，点击即可跳转到对应路由。
        </p>
        <div class="flex flex-wrap gap-3 mt-3">
          <a
            class="btn btn-primary btn-sm"
            href="https://www.bilibili.com/video/BV1Zw4m1y7xQ/?p=3"
            target="_blank"
          >
            使用教程
          </a>
          <a
            class="btn btn-outline btn-sm"
            href="https://github.com/AynaLivePlayer/AynaLivePlayerOBSInfo"
            target="_blank"
          >
            GitHub
          </a>
          <router-link to="/webui/player" class="btn btn-secondary btn-sm">
            直接进入 WebUI
          </router-link>
        </div>
      </div>
    </div>

    <div class="space-y-8">
      <div
        v-for="group in cards"
        :key="group.name"
        class="space-y-3"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold text-base-content">{{ group.name }}</h2>
          <span class="text-sm text-base-content/60">点击卡片即可跳转</span>
        </div>
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1800px)]:grid-cols-5">
          <div
            v-for="item in group.items"
            :key="item.path"
            class="card bg-base-100 shadow hover:shadow-lg transition-shadow cursor-pointer border border-base-200"
            @click="openLink(item.path)"
          >
            <div class="card-body space-y-3">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-semibold text-lg truncate">{{ item.title }}</h3>
                  <p class="text-sm text-base-content/60">{{ item.author }}</p>
                </div>
                <div class="badge badge-outline">{{ item.tag }}</div>
              </div>
              <div
                class="rounded-lg overflow-hidden border border-base-200 bg-base-200 relative"
                :style="{height: item.height || '240px', minHeight: item.height || '240px'}"
              >
                <div
                  class="absolute inset-0 overflow-hidden pointer-events-none"
                  :style="{
                    transform: `scale(${item.scale || 1})`,
                    transformOrigin: 'top left',
                    width: item.scale ? `${100 / (item.scale || 1)}%` : '100%',
                    height: item.scale ? `${100 / (item.scale || 1)}%` : '100%'
                  }"
                >
                  <component :is="item.component" />
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-base-100/50 to-transparent pointer-events-none"></div>
              </div>
              <div class="flex items-center justify-between text-sm text-base-content/60">
                <span>{{ item.size }}</span>
                <span class="link text-primary">点击预览</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-sm text-base-content/60 space-y-1">
      <p>代码开源，欢迎 Fork / PR，一起丰富更多模板！</p>
      <p>需要定制样式可以联系作者或贡献者协助完成。</p>
      <p>— By Aynakeya</p>
    </div>
  </div>
</template>
