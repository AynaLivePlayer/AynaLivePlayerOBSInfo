const urlParams = new URLSearchParams(window.location.search);
const baseParam = urlParams.get('server');
const Base = baseParam || 'localhost:29629';
const WsApi = 'ws://' + Base + '/wsinfo';

class WebInfoClient {
    private static instance: WebInfoClient | null = null;
    private websocket: WebSocket | null;
    private running: boolean;
    private wsApi: string;
    private onMessage: (event: MessageEvent) => void | null;

    public static getInstance(): WebInfoClient | null {
        return WebInfoClient.instance;
    }

    public static createInstance(onMessage: (event: MessageEvent) => void): WebInfoClient {
        WebInfoClient.instance = new WebInfoClient(onMessage);
        return WebInfoClient.instance;
    }

    constructor(onMessage: (event: MessageEvent) => void,
                 wsApi: string = WsApi) {
        this.websocket = null
        this.running = true
        this.onMessage = onMessage;
        this.wsApi = wsApi;
    }

    connect () {
        if (!this.running) {
            return
        }
        console.log("链接ws服务器中")
        this.websocket = new WebSocket(this.wsApi)
        this.websocket.onopen = this.onWsOpen.bind(this)
        this.websocket.onclose = this.onWsClose.bind(this)
        this.websocket.onmessage = this.onWsMessage.bind(this)
    }

    disconnect() {
        this.running = false;
        if (this.websocket) {
            this.websocket.close();
        }
    }

    onWsOpen () {
        console.info(`websocket 连接成功`)
    }

    onWsClose () {
        this.websocket = null;
        if (!this.running) {
            return
        }
        console.info(`掉线重连中...`);
        window.setTimeout(this.connect.bind(this), 1000)
    }

    onWsMessage (event: MessageEvent) {
        if (this.onMessage != null) {
            this.onMessage(event)
        }
    }

    sendEvent(eventID: string, data: any) {
        this.websocket?.send(JSON.stringify({EventID: eventID, Data: data}));
    }
}

export {WebInfoClient}
