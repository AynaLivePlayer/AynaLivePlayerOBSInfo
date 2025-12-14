import type { Router } from 'vue-router'
import Webui from "@/views/webui/webui.vue";
import Playlist from "@/views/webui/page/Playlist.vue";
import PlayerPlaylist from "@/views/webui/page/PlayerPlaylist.vue";
import Player from "@/views/webui/page/Player.vue";
import Search from "@/views/webui/page/Search.vue";
import PlaylistsHome from "@/views/webui/page/PlaylistsHome.vue";
import History from "@/views/webui/page/History.vue";
import LiveRooms from "@/views/webui/page/LiveRooms.vue";
import Config from "@/views/webui/page/Config.vue";


export const createWebuiRouter = (router: Router): void => {
    router.addRoute({
        path: '/webui',
        component: Webui,
        children: [
            {
                path: '',
                redirect: '/webui/player',
            },
            {
                path: '/webui/playlists/:id', // Playlist by ID
                component: Playlist,
                name: "webui.playlists",
                meta: {
                    keepAlive: true,
                },
            },
            {
                path: "/webui/playlists",
                component: PlaylistsHome,
                name: "webui.playlists.home",
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
            },
            {
                path: "/webui/search",
                component: Search,
                name: "webui.search",
            },
            {
                path: "/webui/history",
                component: History,
                name: "webui.history",
            },
            {
                path: "/webui/rooms",
                component: LiveRooms,
                name: "webui.rooms",
            },
            {
                path: "/webui/config",
                component: Config,
                name: "webui.config",
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
