import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";
import type {PlaylistInfo, Media} from "@/api/model";

export const usePlaylistsStore = defineStore('playlists', () => {

    const playlists = reactive<PlaylistInfo[]>([]);
    const currentPlaylistMedias = ref<Media[]>([]);

    function setPlaylists(newPlaylist: PlaylistInfo[]) {
        playlists.splice(0, playlists.length, ...newPlaylist);
    }

    function setCurrentPlaylistMedias(newMedias: Media[]) {
        currentPlaylistMedias.value = newMedias;
    }

    return {
        playlists,
        setPlaylists,
        currentPlaylistMedias,
        setCurrentPlaylistMedias
    }
});
