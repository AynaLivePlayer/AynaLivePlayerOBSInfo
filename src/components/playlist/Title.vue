<template>
  <span class="playlist-title">{{ data }}</span>
</template>

<script>
export default {
  name: "PlaylistTitle",
  tmplName: "playlist-title",
  className: "playlist-title",
  props: {
    index:0,
  },
  computed: {
    data() {
      if (this.index < this.$store.state.playlist.length){
        return this.$store.state.playlist[this.index].Title;
      }
      return ""
    },
  }
}
</script>

<style scoped>
.playlist-title {

}
</style>