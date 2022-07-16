<template>
  <span class="playlist-artist">{{ data }}</span>
</template>

<script>
export default {
  name: "PlaylistArtist",
  className: "playlist-artist",
  tmplName: "playlist-artist",
  props: {
    index:0,
  },
  computed: {
    data() {
      if (this.index < this.$store.state.playlist.length){
        return this.$store.state.playlist[this.index].Artist;
      }
      return ""
    },
  },
  template:
      `<span class="playlist-artist">{{ data }}</span>`
}
</script>

<style scoped>
.playlist-artist {
}
</style>