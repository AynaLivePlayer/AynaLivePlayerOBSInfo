import type { Router } from 'vue-router'
import YoinPlayer from "@/views/user/yoin/PlayerYoin.vue";
import YoinPlaylist from "@/views/user/yoin/PlaylistYoin.vue";


export const createUserYoinRouter = (router: Router): void => {
    router.addRoute({
        path: '/user/yoin',
        children: [
            {
                path: '/user/yoin/player',
                name: 'yoin_player',
                component: YoinPlayer,
            },
            {
                path: '/user/yoin/playlist',
                name: 'yoin_playlist',
                component: YoinPlaylist,
            },
        ],
    })
}
