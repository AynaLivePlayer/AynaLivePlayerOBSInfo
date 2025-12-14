import {defineStore} from "pinia";
import {ref} from "vue";
import type {Media} from "@/api/model";

export const useSearchStore = defineStore('search', () => {
    const keyword = ref("");
    const provider = ref("");
    const loading = ref(false);
    const results = ref<Media[]>([]);

    function setKeyword(value: string) {
        keyword.value = value;
    }

    function setProvider(value: string) {
        provider.value = value;
    }

    function setLoading(value: boolean) {
        loading.value = value;
    }

    function setResults(items: Media[]) {
        results.value = items;
        loading.value = false;
    }

    return {
        keyword,
        provider,
        loading,
        results,
        setKeyword,
        setProvider,
        setLoading,
        setResults,
    };
});
