import {createRouter, createWebHashHistory} from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import SimplePlaying from "../views/SimplePlaying.vue";
import SimpleCover from "../views/SimpleCover.vue";
import SimplePlaylist from "../views/SimplePlaylist.vue";
import SimpleLyric from "../views/SimpleLyric.vue";
import SimpleAll from "../views/SimpleAll.vue";
import SimplePlayer from "../views/SimplePlayer.vue";
import MediaAlbum from "../components/media/MediaAlbum.vue";
import MediaArtist from "../components/media/MediaArtist.vue";
import MediaTitle from "../components/media/MediaTitle.vue";
import MediaCover from "../components/media/MediaCover.vue";
import MediaUsername from "../components/media/MediaUsername.vue";
import Lyric from "../components/info/Lyric.vue";
import CurrentTime from "../components/info/CurrentTime.vue";
import TotalTime from "../components/info/TotalTime.vue";

const routes = [
    {path: "/test", component: HelloWorld},
    // simple part
    {path: "/simple/playing", component: SimplePlaying},
    {path: "/simple/cover", component: SimpleCover},
    {path: "/simple/playlist", component: SimplePlaylist},
    {path: "/simple/lyric", component: SimpleLyric},
    {path: "/simple/all", component: SimpleAll},
    {path: "/simple/player", component: SimplePlayer},
    // component part
    {path: "/comp/album", component: MediaAlbum},
    {path: "/comp/artist", component: MediaArtist},
    {path: "/comp/title", component: MediaTitle},
    {path: "/comp/cover", component: MediaCover},
    {path: "/comp/username", component: MediaUsername},
    {path: "/comp/lyric", component: Lyric},
    {path: "/comp/current_time", component: CurrentTime},
    {path: "/comp/total_time", component: TotalTime},
]

const router = createRouter({
    routes, // `routes: routes` 的缩写
    history: createWebHashHistory(),
})

export default router