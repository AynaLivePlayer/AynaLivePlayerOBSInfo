<template>
  <span class="playlist-index">{{ data }}</span>
</template>

<script>
export default {
  name: "PlaylistIndex",
  tmplName: "playlist-index",
  className: "playlist-index",
  props: ['index'],
  computed: {
    data() {
      if (this.index < this.$store.state.playlist.length){
        return this.$store.state.playlist[this.index].Index;
      }
      return ""
    },
  },
  template:
      `<span class="playlist-index">{{ data }}</span>`
}
</script>

<style scoped>

</style>