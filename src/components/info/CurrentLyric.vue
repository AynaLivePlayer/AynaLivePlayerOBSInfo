<template>
  <span class="current-lyric">{{ lyric }}</span>
</template>

<script>
export default {
  name: "CurrentLyric",
  tmplName: "current-lyric",
  className: "current-lyric",
  computed: {
    lyric() {
      return this.$store.state.lyric;
    },
  },
  template:
      `<span class="current-lyric">{{ lyric }}</span>`
}
</script>

<style scoped>
.current-lyric{}
</style>