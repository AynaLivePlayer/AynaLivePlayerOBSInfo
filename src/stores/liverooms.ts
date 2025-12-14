import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type {LiveRoom, LiveRoomProviderInfo} from "@/api/model";
import {getLiveRoomIdentifier} from "@/utils";

export const useLiveRoomStore = defineStore('liverooms', () => {
    const providers = ref<LiveRoomProviderInfo[]>([]);
    const rooms = ref<LiveRoom[]>([]);
    const selectedRoomId = ref<string | null>(null);

    function setProviders(items: LiveRoomProviderInfo[]) {
        providers.value = items;
    }

    function setRooms(items: LiveRoom[]) {
        rooms.value = items;
        if (!selectedRoomId.value && items.length > 0) {
            selectedRoomId.value = getLiveRoomIdentifier(items[0].LiveRoom.Provider, items[0].LiveRoom.Room);
        }
        if (selectedRoomId.value) {
            const exists = items.find((r) => getLiveRoomIdentifier(r.LiveRoom.Provider, r.LiveRoom.Room) === selectedRoomId.value);
            if (!exists && items.length > 0) {
                selectedRoomId.value = getLiveRoomIdentifier(items[0].LiveRoom.Provider, items[0].LiveRoom.Room);
            }
        }
    }

    function updateRoom(room: LiveRoom) {
        const id = getLiveRoomIdentifier(room.LiveRoom.Provider, room.LiveRoom.Room);
        const idx = rooms.value.findIndex((r) => getLiveRoomIdentifier(r.LiveRoom.Provider, r.LiveRoom.Room) === id);
        if (idx === -1) {
            rooms.value = [...rooms.value, room];
            return;
        }
        const next = [...rooms.value];
        next[idx] = room;
        rooms.value = next;
    }

    function setSelectedRoom(id: string | null) {
        selectedRoomId.value = id;
    }

    const selectedRoom = computed(() => {
        if (!selectedRoomId.value) return null;
        return rooms.value.find((r) => getLiveRoomIdentifier(r.LiveRoom.Provider, r.LiveRoom.Room) === selectedRoomId.value) ?? null;
    });

    return {
        providers,
        setProviders,
        rooms,
        setRooms,
        updateRoom,
        selectedRoomId,
        setSelectedRoom,
        selectedRoom,
    };
});
