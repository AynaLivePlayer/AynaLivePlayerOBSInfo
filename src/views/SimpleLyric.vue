<template>
  <p>
    <CurrentLyric></CurrentLyric>
  </p>
</template>

<script>
import CurrentLyric from "../components/info/CurrentLyric.vue";

export default {
  name: "SimpleLyric",
  components: {CurrentLyric},
  template:
      `
        <p>
        <CurrentLyric></CurrentLyric>
        </p>
      `
}
</script>

<style scoped>
body{overflow: hidden}
</style>