import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type {Media} from "@/api/model";

export const useHistoryStore = defineStore('history', () => {
    const items = ref<Media[]>([]);
    const maxLength = 1000;

    function push(media: Media) {
        const next = [...items.value, media].slice(-maxLength);
        items.value = next;
    }

    const latestFirst = computed(() => [...items.value].reverse());

    function clear() {
        items.value = [];
    }

    return {
        items,
        latestFirst,
        push,
        clear,
    };
});
