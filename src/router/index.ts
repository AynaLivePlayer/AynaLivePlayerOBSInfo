/*
   * 主路由
   * 贡献者: @Aynakeya, @Aiikisaraki
*/
import {createRouter, createWebHistory} from 'vue-router'
import AboutView from "@/views/AboutView.vue";
import Sandbox from '@/views/Sandbox.vue';
import Player1 from "@/views/builtin/player1/Player1.vue";
import Player2 from "@/views/builtin/player2/Player2.vue";
import Player2Right from "@/views/builtin/player2/Player2Right.vue";
import Playlist1 from "@/views/builtin/player1/Playlist1.vue";
import Welcome from "@/views/Welcome.vue";

import NekoPlaylist from "@/views/user/neko/Playlist3.vue";
import NekoPlayer from "@/views/user/neko/Player3.vue";
import AiiPlayerNormal from "@/views/user/AiiKisaraki/PlayerNormal-Aii.vue";
import AiiPlayerMini from "@/views/user/AiiKisaraki/PlayerMini-Aii.vue";
import AiiPlayerPage from "@/views/user/AiiKisaraki/PlayerPage-Aii.vue";
import AiiPlaylist from "@/views/user/AiiKisaraki/Playlist-Aii.vue";
import MediaSessionVue from '@/views/control/MediaSession.vue';
import {createWebuiRouter} from "@/views/webui/routers";
import {createAiiKisarakiRouter} from "@/views/user/AiiKisaraki/routers";
import {createUserNekoRouter} from "@/views/user/neko/routers";
import {createComponentsRouter} from "@/views/component/routers";

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
            path: '/controller/demo',
            name: 'media_session',
            component: MediaSessionVue,
        },
    ]
})

createAiiKisarakiRouter(router);
createUserNekoRouter(router);
createWebuiRouter(router);
createComponentsRouter(router);

export default router
