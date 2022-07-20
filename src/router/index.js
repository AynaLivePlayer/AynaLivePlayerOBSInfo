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
import Lyric from "../components/info/CurrentLyric.vue";
import CurrentTime from "../components/info/CurrentTime.vue";
import TotalTime from "../components/info/TotalTime.vue";
import Preview from '../preview/Preview.vue'
import PreviewV2 from '../previewV2/Preview.vue'
import PlaylistContainer from "../components/playlist/PlaylistContainer.vue";
import CustomEdit from "../custom/CustomEdit.vue"
import CustomView from "../custom/CustomView.vue"

// component parts
const componentRoutes = [
    {path: "/comp/album", component: MediaAlbum},
    {path: "/comp/artist", component: MediaArtist},
    {path: "/comp/title", component: MediaTitle},
    {path: "/comp/cover", component: MediaCover},
    {path: "/comp/username", component: MediaUsername},
    {path: "/comp/lyric", component: Lyric},
    {path: "/comp/current_time", component: CurrentTime},
    {path: "/comp/total_time", component: TotalTime},
    {path:"/comp/playlist",component: PlaylistContainer}
]

// simple parts
const simpleRoutes = [
    {path: "/simple/playing", component: SimplePlaying},
    {path: "/simple/cover", component: SimpleCover},
    {path: "/simple/playlist", component: SimplePlaylist},
    {path: "/simple/lyric", component: SimpleLyric},
    {path: "/simple/all", component: SimpleAll},
    {path: "/simple/player", component: SimplePlayer},
]

const otherRoutes = [
    {path: "/test", component: HelloWorld},
    // preview
    {path: "/preview", component: Preview},
    {path: "/previewV2", component: PreviewV2},
    {path: "/custom/edit",component: CustomEdit},
    {path: "/custom/view",component: CustomView}
]

const routes = [...otherRoutes, ...componentRoutes, ...simpleRoutes]

const routesMap = {}
for (let index in routes) {
    routesMap[routes[index].component.name] = routes[index]
}

const router = createRouter({
    routes: routes, // `routes: routes` 的缩写
    history: createWebHashHistory(),
})

export {componentRoutes, simpleRoutes, routesMap, router}