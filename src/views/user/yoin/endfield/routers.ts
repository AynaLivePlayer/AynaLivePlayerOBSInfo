import type { Router } from 'vue-router'
import EndfieldPlayer from "@/views/user/yoin/endfield/PlayerEndfield.vue";
import EndfieldPlaylist from "@/views/user/yoin/endfield/PlaylistEndfield.vue";


export const createUserEndfieldRouter = (router: Router): void => {
    router.addRoute({
        path: '/user/yoin/endfield',
        children: [
            {
                path: '/user/yoin/endfield/player',
                name: 'yoin_endfield_player',
                component: EndfieldPlayer,
            },
            {
                path: '/user/yoin/endfield/playlist',
                name: 'yoin_endfield_playlist',
                component: EndfieldPlaylist,
            },
        ],
    })
}
