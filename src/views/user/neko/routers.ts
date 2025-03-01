import type { Router } from 'vue-router'
import NekoPlayer from "@/views/user/neko/Player3.vue";
import NekoPlaylist from "@/views/user/neko/Playlist3.vue";


export const createUserNekoRouter = (router: Router): void => {
    router.addRoute({
        path: '/user/neko',
        children: [
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
        ],
    })
}
