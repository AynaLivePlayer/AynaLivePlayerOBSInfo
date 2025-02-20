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
