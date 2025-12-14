import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import type {AudioDevice, VersionInfo} from "@/api/model";

export const useConfigStore = defineStore('config', () => {
    const playlistModes = reactive<Record<string, number>>({
        player: 0,
        system: 0,
    });

    const audioDevices = ref<AudioDevice[]>([]);
    const currentAudioDevice = ref("");

    const updateInfo = ref<VersionInfo | null>(null);
    const hasUpdate = ref<boolean | null>(null);

    function setPlaylistMode(id: string, mode: number) {
        playlistModes[id] = mode;
    }

    function setAudioDevices(devices: AudioDevice[], current: string) {
        audioDevices.value = devices;
        currentAudioDevice.value = current;
    }

    function setUpdateInfo(info: VersionInfo, available: boolean) {
        updateInfo.value = info;
        hasUpdate.value = available;
    }

    return {
        playlistModes,
        setPlaylistMode,
        audioDevices,
        currentAudioDevice,
        setAudioDevices,
        updateInfo,
        hasUpdate,
        setUpdateInfo,
    };
});
