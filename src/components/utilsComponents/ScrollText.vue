<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';

const prop = defineProps({
    /**
     * @description 宽度, 传入数字为px单位, 传入字符串则使用为百分比
     */
    width: {
        type: [String, Number],
        default: 100
    },
    /**
     * @description 滚动速度, 单位为px/s
     */
    speed: {
        type: Number,
        default: 100
    },
    /**
     * @description 是否反向滚动
     */
    reverse: {
        type: Boolean,
        default: false
    },
    /**
     * @description 启动和停止滚动的延迟时间, 单位为ms
     */
    loopDelay: {
        type: Number,
        default: 0
    }
})
const outterStyle = reactive({
    width: typeof prop.width === 'number' ? `${prop.width}px` : prop.width
})
const wrapper = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const contentWidth = ref(0)
const wrapperWidth = ref(0)
const canScroll = ref(false)
const contentAnimate = ref<Animation | null>(null)

const resizeObserver = new ResizeObserver(() => {
    const wrapperDom = wrapper.value
    const contentDom = content.value
    if (!wrapperDom || !contentDom) return
    contentWidth.value = contentDom.offsetWidth
    wrapperWidth.value = wrapperDom.offsetWidth
    canScroll.value = contentWidth.value > wrapperWidth.value
})

const domObserver = new MutationObserver(() => {
    const wrapperDom = wrapper.value
    const contentDom = content.value
    if (!wrapperDom || !contentDom) return
    contentWidth.value = contentDom.offsetWidth
    wrapperWidth.value = wrapperDom.offsetWidth
    canScroll.value = contentWidth.value > wrapperWidth.value
})

watch(
    () => canScroll.value,
    (newVal) => {
        const wrapperDom = wrapper.value
        const contentDom = content.value
        if (!wrapperDom || !contentDom) return
        if (!newVal) return
        const distence = contentWidth.value - wrapperWidth.value
        let duration = distence / prop.speed * 1000
        let animatePath = [
            {transform: 'translateX(0)'},
            {transform: `translateX(-${distence}px)`},
        ]
        if (prop.reverse) {
            animatePath.push({transform: 'translateX(0)'})
            duration *= 2
        }
        if (contentAnimate.value) {
            contentAnimate.value.cancel()
        }
        contentAnimate.value = contentDom.animate(
            animatePath,
            {
                duration: duration,
                // iterations: Infinity,
                fill: 'forwards'
            }
        )
    }
)


onMounted(() => {
    const wrapperDom = wrapper.value
    const contentDom = content.value
    if (!wrapperDom || !contentDom) return
    resizeObserver.observe(wrapperDom)
    domObserver.observe(wrapperDom, {subtree: true, childList: true})
})

onUnmounted(() => {
    resizeObserver.disconnect()
    domObserver.disconnect()
})

</script>

<template>
    <div class="__scroll_text" :style="outterStyle">
        <div class="__scroll_text_wrapper" ref="wrapper">
            <div class="__scroll_text_content" ref="content">
                <slot></slot>
            </div>
        </div>
    </div>

</template>

<style lang="css" scoped>
.__scroll_text {
    overflow: hidden;
    background-color: red;
}

.__scroll_text > .__scroll_text_wrapper {
    width: 100%;
    height: 100%;
}

.__scroll_text > .__scroll_text_wrapper > .__scroll_text_content {
    white-space: nowrap;
    width: fit-content;
    height: fit-content;
    transition: transform .3s linear;
}
</style>