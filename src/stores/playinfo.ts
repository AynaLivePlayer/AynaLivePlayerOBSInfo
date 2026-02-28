import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";
import type {Lyrics, Media} from "@/api/model";

function createDefaultMedia(): Media {
    return {
        Info: {
            Title: "NoTitle",
            Artist: "Unknown",
            Cover: {
                Url: "",
                Data: ""
            },
            Album: "Unknown",
            Meta: {
                Provider: "",
                Identifier: ""
            }
        },
        User: {
            Name: "Unknown"
        }
    };
}

export const usePlayInfoStore = defineStore('playinfo', () => {
    const current = reactive<Media>(createDefaultMedia());
    const paused = ref(true);
    const duration = ref(0);
    const timePos = ref(0);
    const volume = ref(0.0);
    const currentLyric = reactive({
        Lyric: "",
        CurrentIndex:-1,
        Total: 0
    })
    const lyrics = ref<Lyrics>({
        Lang: "",
        Content: []
    });
    const playlist = reactive<Media[]>([]);

    function setCurrent(newMedia: Media) {
        // Replace the entire current object
        current.Info = { ...newMedia.Info };
        current.User = { ...newMedia.User };
    }

    function resetCurrent() {
        const d = createDefaultMedia();
        current.Info = {...d.Info};
        current.User = {...d.User};
    }

    // New method to set the entire playlist
    function setPlaylist(newPlaylist: Media[]) {
        playlist.splice(0, playlist.length, ...newPlaylist); // Replace the content reactively
    }

    function setPaused(newPaused: boolean) {
        paused.value = newPaused;
    }

    function setVolume(newVolume: number) {
        volume.value = newVolume;
    }

    function setLyrics(newLyrics: Lyrics) {
        lyrics.value = newLyrics;
    }

    function resetPlaybackState() {
        paused.value = true;
        duration.value = 0;
        timePos.value = 0;
        currentLyric.Lyric = "";
        currentLyric.CurrentIndex = -1;
        currentLyric.Total = 0;
        lyrics.value = {
            Lang: "",
            Content: [],
        };
        resetCurrent();
    }

    // Computed property to get either User.Name or User.Username
    const currentUsername = computed(() => {
        if ('Username' in current.User) {
            return current.User.Username;
        } else {
            return current.User.Name;
        }
    });

    return {
        setCurrent,
        resetCurrent,
        resetPlaybackState,
        current, currentUsername,
        currentLyric,
        lyrics, setLyrics,
        playlist,setPlaylist,
        paused,setPaused,
        volume,setVolume,
        duration, timePos }
})
