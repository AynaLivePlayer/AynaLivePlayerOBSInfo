<template>
  <span class="media-artist">{{ current.Artist }}</span>
</template>

<script>
export default {
  name: "MediaArtist",
  className: "media-artist",
  tmplName: "media-artist",
  computed: {
    current() {
      return this.$store.state.current;
    },
  }
}
</script>

<style scoped>
.media-artist {

}
</style>