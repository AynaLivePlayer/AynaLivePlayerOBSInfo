<template>
  <span class="playlist-username">{{ data }}</span>
</template>

<script>
export default {
  name: "PlaylistUsername",
  tmplName: "playlist-username",
  className: "playlist-username",
  props: {
    index:0,
  },
  computed: {
    data() {
      if (this.index < this.$store.state.playlist.length){
        return this.$store.state.playlist[this.index].Username;
      }
      return ""
    },
  },
  template:
      `<span class="playlist-username">{{ data }}</span>`
}
</script>

<style scoped>

</style>