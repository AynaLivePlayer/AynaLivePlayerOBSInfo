/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-01-08 23:06:16
 * @LastEditors: Aii如樱如月 morikawa2021@163.com
 * @LastEditTime: 2025-01-12 22:48:09
 * @FilePath: \AynaLivePlayerOBSInfo\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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
import AiiPlayerPage from "@/views/user/AiiKisaraki/PlayerPage-Aii.vue";
import AiiPlaylist from "@/views/user/AiiKisaraki/Playlist-Aii.vue";
import MediaSessionVue from '@/views/control/MediaSession.vue';
import {createWebuiRouter} from "@/views/webui/routers";

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
        {
            path: '/user/aiikisaraki/playernormal',
            name: 'aii_player_normal',
            component: AiiPlayerNormal,
        },
        {
            path: '/user/aiikisaraki/playerpage',
            name: 'aii_player_page',
            component: AiiPlayerPage,
        },
        {
            path: '/user/aiikisaraki/playlist',
            name: 'aii_playlist',
            component: AiiPlaylist,
        },
        {
            path: '/controller/demo',
            name: 'media_session',
            component: MediaSessionVue,
        },
        {
            path: '/sandbox',
            name: 'sandbox',
            component: Sandbox,
        }
    ]
})

createWebuiRouter(router);

export default router
