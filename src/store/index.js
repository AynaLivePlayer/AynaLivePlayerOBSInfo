
import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
    state () {
        return {
            current: {
                Index:0,
                Title:"",
                Artist:"",
                Album:"",
                Username:"",
                Cover:{
                    Url:"",
                    Data:null,
                }
            },
            currentTime: 0,
            totalTime: 0,
            lyric: "",
            playlist: []
        }
    },
    getters: {
        playlistSize(state){
            return state.playlist.length;
        }
    },
    mutations: {
        current(state,current) {
            state.current = current;
        },
        currentTime(state,currentTime) {
            state.currentTime = currentTime;
        },
        totalTime(state,totalTime) {
            state.totalTime = totalTime;
        },
        lyric(state,lyric) {
            state.lyric = lyric;
        },
        playlist(state,playlist) {
            state.playlist = playlist;
        }
    }
})

export default store