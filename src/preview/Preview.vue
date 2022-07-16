<template>
  <div class="preview">
    <Layout class="layout"></Layout>
    <Show class="show"></Show>
  </div>
</template>

<script>
import Layout from './layout/Layout.vue'
import Show from './Show/Show.vue'
export default {
    name:'Preview',
    components:{
        Layout,Show,
    }
}
</script>

<style scoped>
.preview{
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 30px;
}
</style>