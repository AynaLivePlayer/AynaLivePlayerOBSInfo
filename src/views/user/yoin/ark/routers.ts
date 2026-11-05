import type { Router } from 'vue-router'
import ArkPlayer from "@/views/user/yoin/ark/PlayerArk.vue";
import ArkPlaylist from "@/views/user/yoin/ark/PlaylistArk.vue";


export const createUserArkRouter = (router: Router): void => {
    router.addRoute({
        path: '/user/yoin',
        children: [
            {
                path: '/user/yoin/player',
                name: 'yoin_ark_player',
                component: ArkPlayer,
            },
            {
                path: '/user/yoin/playlist',
                name: 'yoin_ark_playlist',
                component: ArkPlaylist,
            },
        ],
    })
}
