/*
 * Yoin 卡西米尔样式卡 · 共享数据逻辑
 * 各风格卡片（方舟/终末地/少前/鸣潮）共用的 store 读取与派生值
*/
import { computed } from "vue";
import { usePlayInfoStore } from "@/stores/playinfo";
import type { Media } from "@/api/model";

export function usePlayerInfo() {
    const store = usePlayInfoStore();

    /* 封面：优先 base64，回退 URL */
    const coverSrc = computed(() => {
        const cover = store.current.Info.Cover;
        if (cover.Data && cover.Data.length > 0) {
            return "data:image/jpeg;base64," + cover.Data;
        }
        return cover.Url;
    });

    const identifier = computed(() => store.current.Info.Meta.Identifier || "");
    const providerLabel = computed(() => (store.current.Info.Meta.Provider || "unknown").toUpperCase());
    const title = computed(() => store.current.Info.Title);
    const artist = computed(() => store.current.Info.Artist);
    const album = computed(() => store.current.Info.Album);
    const username = computed(() => store.currentUsername);

    /* 歌词逻辑与通用组件 CurrentLyric.vue 保持一致 */
    const lyricText = computed(() => {
        if (store.lyrics.Content.length === 0
            || store.lyrics.Content.some(obj => obj.Lyric === "纯音乐，请欣赏")) {
            return "[No Lyric]";
        } else if (store.currentLyric.Lyric === "") {
            return "[No Current Lyric]";
        }
        return store.currentLyric.Lyric;
    });

    const progressPercent = computed(() => {
        if (store.duration > 0) {
            return Math.min(100, (store.timePos / store.duration) * 100);
        }
        return 0;
    });

    const fmtTime = (t: number): string => {
        const total = Math.max(0, Math.floor(t));
        const m = Math.floor(total / 60);
        const s = total % 60;
        return `${m}:${String(s).padStart(2, "0")}`;
    };

    /* 播放器的待播放队列，第一首即为下一首 */
    const next = computed<Media | undefined>(() => store.playlist[0]);
    const queue = computed<Media[]>(() => store.playlist);

    const mediaUsername = (media: Media): string => {
        if ("Username" in media.User) {
            return media.User.Username;
        }
        return media.User.Name;
    };

    return {
        store, coverSrc, identifier, providerLabel,
        title, artist, album, username,
        lyricText, progressPercent, fmtTime,
        next, queue, mediaUsername,
    };
}
