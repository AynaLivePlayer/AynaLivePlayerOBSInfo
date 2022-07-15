import {BaseUrl, InfoApi, WsApi} from "./index.js";
import axios from "axios";
import store from "../store/index.js";

const Client = axios.create({
    baseURL: BaseUrl,
})

class WebInfoClient {
    constructor () {
        this.websocket = null
        this.running = false
    }

    connect () {
        if (this.running) {
            return
        }
        Client.get(InfoApi)
            .then(function (response) {
                store.commit("current",response.data.Current);
                store.commit("currentTime",response.data.CurrentTime);
                store.commit("totalTime",response.data.TotalTime);
                store.commit("lyric",response.data.Lyric);
                store.commit("playlist",response.data.Playlist);

            })
        this.running = true
        this.websocket = new WebSocket(WsApi)
        this.websocket.onopen = this.onWsOpen
        this.websocket.onclose = this.onWsClose
        this.websocket.onmessage = this.onWsMessage
    }

    disconnect() {
        this.running = false
        if (this.websocket) {
            this.websocket.close()
        }
    }

    onWsOpen () {
        console.info(`websocket 连接成功`)
    }

    onWsClose () {
        this.websocket = null
        if (!this.running) {
            return
        }
        console.info(`掉线重连中...`)
        this.connect()
    }

    onWsMessage (event) {
        let jsonData = JSON.parse(event.data)
        let update = jsonData.Update;
        update = update.charAt(0).toLowerCase() + update.slice(1)
        store.commit(update,jsonData.Data[jsonData.Update])
    }
}

export {Client,WebInfoClient}