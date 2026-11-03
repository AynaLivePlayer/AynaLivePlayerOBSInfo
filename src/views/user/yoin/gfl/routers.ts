import type { Router } from 'vue-router'
import GflPlayer from "@/views/user/yoin/gfl/PlayerGfl.vue";
import GflPlaylist from "@/views/user/yoin/gfl/PlaylistGfl.vue";


export const createUserGflRouter = (router: Router): void => {
    router.addRoute({
        path: '/user/yoin/gfl',
        children: [
            {
                path: '/user/yoin/gfl/player',
                name: 'yoin_gfl_player',
                component: GflPlayer,
            },
            {
                path: '/user/yoin/gfl/playlist',
                name: 'yoin_gfl_playlist',
                component: GflPlaylist,
            },
        ],
    })
}
