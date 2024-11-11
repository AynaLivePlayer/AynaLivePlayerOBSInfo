import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/base.css'



/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faAnglesRight,
    faBackward,
    faBars,
    faCirclePlay,
    faClock,
    faEllipsis,
    faForward,
    faHouseLaptop,
    faHouseSignal,
    faListUl,
    faMicrophone,
    faMusic,
    faPause,
    faPlay,
    faPlus,
    faRecordVinyl,
    faRepeat,
    faShuffle,
    faTableCells,
    faTableCellsLarge,
    faTowerBroadcast,
    faVolumeHigh,
    faVolumeLow
} from "@fortawesome/free-solid-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(
    faAnglesRight,
    faBackward,
    faBars,
    faCirclePlay,
    faClock,
    faEllipsis,
    faForward,
    faHouseLaptop,
    faHouseSignal,
    faListUl,
    faMicrophone,
    faMusic,
    faPause,
    faPlay,
    faPlus,
    faRecordVinyl,
    faRepeat,
    faShuffle,
    faTableCells,
    faTableCellsLarge,
    faTowerBroadcast,
    faVolumeHigh,
    faVolumeLow
);

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
