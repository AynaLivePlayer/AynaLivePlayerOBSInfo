<script setup lang="ts">
import ScrollText from "@/components/utilsComponents/ScrollText.vue";
</script>

<template>
    <div>
        <ScrollText>
            <span v-for="i in 20" :key="i">{{ i }}</span>
        </ScrollText>
    </div>
</template>

<style lang="css" scoped>

</style>