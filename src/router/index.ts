import { createRouter, createWebHistory } from 'vue-router'
import AboutView from "@/views/AboutView.vue";
import Player1 from "@/views/builtin/player1/Player1.vue";
import Player2 from "@/views/builtin/player2/Player2.vue";
import Player2Right from "@/views/builtin/player2/Player2Right.vue";
import Playlist1 from "@/views/builtin/player1/Playlist1.vue";
import Welcome from "@/views/Welcome.vue";

import NekoPlaylist from "@/views/user/neko/Playlist3.vue";
import NekoPlayer from "@/views/user/neko/Player3.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/builtin/player1',
      name: 'player1',
      component: Player1,
    },
    {
      path: '/builtin/player1/playlist',
      name: 'player1-playlist',
      component: Playlist1,
    },
    {
      path: '/builtin/player2',
      name: 'player2',
      component: Player2,
    },
    {
      path: '/builtin/player2_right',
      name: 'player2_right',
      component: Player2Right,
    },
    {
      path: '/user/neko/player',
      name: 'neko_player',
      component: NekoPlayer,
    },
    {
      path: '/user/neko/playlist',
      name: 'neko_playlist',
      component: NekoPlaylist,
    },
  ]
})

export default router
