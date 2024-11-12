import type { Router } from 'vue-router'
import Webui from "@/views/webui/webui.vue";
import Playlist from "@/views/webui/page/Playlist.vue";



export const createWebuiRouter = (router: Router): void => {
    router.addRoute({
        path: '/webui',
        component: Webui,
        children: [
            {
                path: '/webui/playlist/:id', // Playlist by ID
                component: Playlist,
                name: "webui.playlist",
                meta: {
                    keepAlive: true,
                },
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
