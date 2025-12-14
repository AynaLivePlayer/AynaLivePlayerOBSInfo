import {defineStore} from "pinia";
import {ref} from "vue";
import type {LiveRoomProviderInfo} from "@/api/model";

export const useProvidersStore = defineStore('providers', () => {
    const mediaProviders = ref<string[]>([]);
    const liveRoomProviders = ref<LiveRoomProviderInfo[]>([]);

    function setMediaProviders(providers: string[]) {
        mediaProviders.value = providers;
    }

    function setLiveRoomProviders(providers: LiveRoomProviderInfo[]) {
        liveRoomProviders.value = providers;
    }

    return {
        mediaProviders,
        liveRoomProviders,
        setMediaProviders,
        setLiveRoomProviders,
    };
});
