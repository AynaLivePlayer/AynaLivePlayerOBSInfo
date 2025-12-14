import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import type {PlaylistInfo, Media} from "@/api/model";

export const usePlaylistsStore = defineStore('playlists', () => {

    const playlists = reactive<PlaylistInfo[]>([]);
    const currentPlaylistMedias = ref<Media[]>([]);
    const systemPlaylist = ref<PlaylistInfo | null>(null);

    function setPlaylists(newPlaylist: PlaylistInfo[]) {
        playlists.splice(0, playlists.length, ...newPlaylist);
    }

    function setCurrentPlaylistMedias(newMedias: Media[]) {
        currentPlaylistMedias.value = newMedias;
    }

    function setSystemPlaylist(info: PlaylistInfo) {
        systemPlaylist.value = info;
    }

    return {
        playlists,
        setPlaylists,
        currentPlaylistMedias,
        setCurrentPlaylistMedias,
        systemPlaylist,
        setSystemPlaylist,
    }
});
