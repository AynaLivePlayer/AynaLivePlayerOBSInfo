<template>
  <p>
    <CurrentLyric></CurrentLyric>
  </p>
</template>

<script>
import CurrentLyric from "../components/info/Lyric.vue";

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
</style>