/*
 * Yoin 卡西米尔样式卡 · 共享数据逻辑
 * 各风格卡片（方舟/终末地/少前/鸣潮）共用的 store 读取与派生值
*/
import { computed } from "vue";
import { usePlayInfoStore } from "@/stores/playinfo";
import type { Media } from "@/api/model";
import defaultCoverUrl from "@/assets/imgs/default_cover.png";

/* OBS 高清：URL 加 ?scale=2 时卡片按 2x 渲染（源尺寸 1280×440 / 1280×720），OBS 里再缩小不糊 */
export function useCardScale(): number {
    const raw = new URLSearchParams(window.location.search).get("scale") ?? "1";
    const v = parseFloat(raw);
    return Number.isFinite(v) && v > 0 ? v : 1;
}

/* 背景透明度：URL ?bg=N 选面板不透明度档位（75 / 50 / 25 / 0=全透明），不加 = 原实底版。
   旧参数兼容：trans/transparent → 75，ghost → 25；数字按最近档位归档（?bg=80 → 75）。
   入参供卡片墙内联预览覆盖 URL 参数（Welcome 的 Showcase.props） */
export type CardBgMode = "solid" | 0 | 25 | 50 | 75;
export function useCardBgMode(override?: string): CardBgMode {
    const raw = (override ?? new URLSearchParams(window.location.search).get("bg") ?? "").toLowerCase().trim();
    if (raw === "" || raw === "solid") return "solid";
    if (raw === "trans" || raw === "transparent") return 75;
    if (raw === "ghost") return 25;
    const n = Number.parseInt(raw, 10);
    if (!Number.isFinite(n)) return "solid";
    if (n <= 12) return 0;
    if (n <= 37) return 25;
    if (n <= 62) return 50;
    if (n <= 87) return 75;
    return "solid";
}

export function usePlayerInfo() {
    const store = usePlayInfoStore();

    /* 封面：优先 base64，其次 URL，都没有时回退黑胶占位图 */
    const coverSrc = computed(() => {
        const cover = store.current.Info.Cover;
        if (cover.Data && cover.Data.length > 0) {
            return "data:image/jpeg;base64," + cover.Data;
        }
        if (cover.Url && cover.Url.length > 0) {
            return cover.Url;
        }
        return defaultCoverUrl;
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
