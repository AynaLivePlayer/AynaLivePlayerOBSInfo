import type { Router } from 'vue-router'
import WuwaPlayer from "@/views/user/yoin/wuwa/PlayerWuwa.vue";
import WuwaPlaylist from "@/views/user/yoin/wuwa/PlaylistWuwa.vue";


export const createUserWuwaRouter = (router: Router): void => {
    router.addRoute({
        path: '/user/yoin/wuwa',
        children: [
            {
                path: '/user/yoin/wuwa/player',
                name: 'yoin_wuwa_player',
                component: WuwaPlayer,
            },
            {
                path: '/user/yoin/wuwa/playlist',
                name: 'yoin_wuwa_playlist',
                component: WuwaPlaylist,
            },
        ],
    })
}
