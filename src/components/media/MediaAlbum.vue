<template>
  <span class="media-album">{{ current.Album }}</span>
</template>

<script>
export default {
  name: "MediaAlbum",
  tmplName: "media-album",
  className: "media-album",
  computed: {
    current() {
      return this.$store.state.current;
    },
  },
  template:
      `<span class="media-album">{{ current.Album }}</span>`
}
</script>

<style scoped>
.media-album{}
</style>