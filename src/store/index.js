import {
    createStore
} from 'vuex'

import {simpleRoutes,componentRoutes} from '../router/index.js'
const systemRoutes = [...simpleRoutes,...componentRoutes]

// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            current: {
                Index: 0,
                Title: "",
                Artist: "",
                Album: "",
                Username: "",
                Cover: {
                    Url: "",
                    Data: null,
                }
            },
            currentTime: 0,
            totalTime: 0,
            lyric: "",
            playlist: [],

            systemRoutes : systemRoutes,

            template: '',
            SimpleAll: `<div>
            <media-cover></media-cover>
            <div class="current-playing">
              <media-title></media-title>
              ---
              <media-artist></media-artist>
              ---
              <media-username></media-username>
            </div>
          </div>
          <div>
            <playlist-container></playlist-container>
          </div>`,
            SimpleCover: `<media-cover></media-cover>`,
            SimplePlayer:`  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono:100,300,400,500,700">
            <div class="player">
              <div class="front">
                <media-cover></media-cover>
                <div class="bar">
                  <hr>
                </div>
                <div class="meta">
                  <time>
                    <current-time format="m:s"></current-time>
                    <total-time format="m:s"></total-time>
                  </time>
                  <div class="info">
                    <h1><media-title></media-title></h1>
                    <h2><media-artist></media-artist></h2>
                  </div>
                </div>
              </div>
            </div>`,
            SimplePlaying:`<div>
            <media-title></media-title>
            ---
            <media-artist></media-artist>
            ---
            <media-username></media-username>
          </div>`,
            SimplePlaylist:`<playlist-container></playlist-container>`,
        }
    },
    getters: {
        playlistSize(state) {
            return state.playlist.length;
        }
    },
    actions: {
        changeTemp(context, changeTemplate) {
            context.commit('changeTemp',changeTemplate);
        }
    },
    mutations: {
        current(state, current) {
            state.current = current;
        },
        currentTime(state, currentTime) {
            state.currentTime = currentTime;
        },
        totalTime(state, totalTime) {
            state.totalTime = totalTime;
        },
        lyric(state, lyric) {
            state.lyric = lyric;
        },
        playlist(state, playlist) {
            state.playlist = playlist;
            // console.log(playlist);
        },

        changeTemp(state, TempName) {
            state.template=TempName;
            // console.log(state.template)
        }
    }
})

export default store