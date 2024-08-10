import { createRouter, createWebHistory } from 'vue-router'
import AboutView from "@/views/AboutView.vue";
import Player1 from "@/views/builtin/player1/Player1.vue";
import Player2 from "@/views/builtin/player2/Player2.vue";
import Player2Right from "@/views/builtin/player2/Player2Right.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: '/builtin/player2',
      name: 'player2',
      component: Player2,
    },
    {
      path: '/builtin/player2_right',
      name: 'player2_right',
      component: Player2Right,
    }
  ]
})

export default router
