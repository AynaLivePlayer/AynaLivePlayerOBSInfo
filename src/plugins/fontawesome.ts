import type {App} from "vue";

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
    faVolumeLow,
    faCircleMinus,
    faMinus,
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
    faVolumeLow,
    faCircleMinus,
    faMinus
);


export const setupFontAwesome = (app: App) => {
    app.component('font-awesome-icon', FontAwesomeIcon)
}
