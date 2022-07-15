<template>
  <span class="playlist-index">{{ data }}</span>
</template>

<script>
export default {
  name: "playlist-index",
  tmplName: "playlist-index",
  className: "playlist-index",
  props: {
    index:0,
  },
  computed: {
    data() {
      if (this.index < this.$store.state.playlist.length){
        return this.$store.state.playlist[this.index].Index;
      }
      return ""
    },
  }
}
</script>

<style scoped>
.playlist-index {

}
</style>