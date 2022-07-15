<template>
  <span class="playlist-album">{{ data }}</span>
</template>

<script>
export default {
  name: "PlaylistAlbum",
  tmplName: "playlist-album",
  className: "playlist-album",
  props: {
    index:0,
  },
  computed: {
    data() {
      if (this.index < this.$store.state.playlist.length){
        return this.$store.state.playlist[this.index].Album;
      }
      return ""
    },
  }
}
</script>

<style scoped>
.playlist-album {
  
}
</style>