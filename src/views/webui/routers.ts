import type { Router } from 'vue-router'
import Webui from "@/views/webui/webui.vue";
import Playlist from "@/views/webui/page/Playlist.vue";
import PlayerPlaylist from "@/views/webui/page/PlayerPlaylist.vue";
import Player from "@/views/webui/page/Player.vue";


export const createWebuiRouter = (router: Router): void => {
    router.addRoute({
        path: '/webui',
        component: Webui,
        children: [
            {
                path: '/webui/playlists/:id', // Playlist by ID
                component: Playlist,
                name: "webui.playlists",
                meta: {
                    keepAlive: true,
                },
            },
            {
                path: "/webui/player", // New route for Player
                component: Player,
                name: "webui.player",
            },
            {
                path: "/webui/playlist",
                component: PlayerPlaylist,
                name: "webui.playlist",
            }
            // {
            //     path: '/music/playlist', // 正在播放列表
            //     component: () => import('@/views/webui/pages/playList/playList.vue'),
            //     meta: {
            //         keepAlive: true,
            //     },
            // },
        ],
    })
}
