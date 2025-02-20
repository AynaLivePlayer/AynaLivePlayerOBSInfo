import type { Router } from 'vue-router'
import Webui from "@/views/webui/webui.vue";
import Playlist from "@/views/webui/page/Playlist.vue";
import PlayerPlaylist from "@/views/webui/page/PlayerPlaylist.vue";
import Player from "@/views/webui/page/Player.vue";
import AiiPlayerNormal from "@/views/user/AiiKisaraki/PlayerNormal-Aii.vue";
import AiiPlayerMini from "@/views/user/AiiKisaraki/PlayerMini-Aii.vue";
import AiiPlayerPage from "@/views/user/AiiKisaraki/PlayerPage-Aii.vue";
import AiiPlaylist from "@/views/user/AiiKisaraki/Playlist-Aii.vue";
import Sandbox from "@/views/Sandbox.vue";


export const createAiiKisarakiRouter = (router: Router): void => {
    router.addRoute({
        path: '/user/aiikisaraki',
        children: [
            {
                path: '/user/aiikisaraki/playernormal',
                name: 'aii_player_normal',
                component: AiiPlayerNormal,
            },
            {
                path: '/user/aiikisaraki/playermini',
                name: 'aii_player_mini',
                component: AiiPlayerMini,
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
                path: '/sandbox',
                name: 'sandbox',
                component: Sandbox,
            }
        ],
    })
}
