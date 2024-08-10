import {defineComponent} from "vue";
/* eslint-disable */
declare module "*.vue" {
    const component: ReturnType<typeof defineComponent>;
    export default component;
}
