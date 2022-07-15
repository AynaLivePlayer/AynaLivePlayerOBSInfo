import axios from "axios";

const Base = process.env.NODE_ENV === 'production' ? window.location.host : 'localhost:4000';
const BaseUrl = 'http://' + Base;
const WsApi = 'ws://' + Base + '/ws/info';
const InfoApi = 'http://' + Base + '/api/info';

export {BaseUrl, WsApi, InfoApi}
