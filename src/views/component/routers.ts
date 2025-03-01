import type {Router} from "vue-router";
import CurrentLyric from "@/components/current/CurrentLyric.vue";
import CurrentLyricCN from "@/components/current/CurrentLyricCN.vue";
import CurrentTime from "@/components/current/CurrentTime.vue";
import MediaAlbum from "@/components/current/MediaAlbum.vue";
import MediaTitle from "@/components/current/MediaTitle.vue";
import MediaCover from "@/components/current/MediaCover.vue";
import MediaArtist from "@/components/current/MediaArtist.vue";
import MediaUsername from "@/components/current/MediaUsername.vue";

export const createComponentsRouter = (router: Router): void => {
    router.addRoute({
        path: '/components',
        children: [
            {
                path: '/components/current-lyric',
                name: 'components.current-lyric',
                component: CurrentLyric,
            },
            {
                path: '/components/current-lyric/cn',
                name: 'components.current-lyric.cn',
                component: CurrentLyricCN,
            },
            {
                path: '/components/current-time',
                name: ' components.current-time',
                component: CurrentTime,
            },
            {
                path: '/components/media/album',
                name: ' components.media.album',
                component: MediaAlbum,
            },
            {
                path: '/components/media/artist',
                name: ' components.media.artist',
                component: MediaArtist,
            },
            {
                path: '/components/media/cover',
                name: ' components.media.cover',
                component: MediaCover,
            },
            {
                path: '/components/media/title',
                name: ' components.media.title',
                component: MediaTitle,
            },
            {
                path: '/components/media/username',
                name: ' components.media.username',
                component: MediaUsername,
            },
        ],
    })
}
