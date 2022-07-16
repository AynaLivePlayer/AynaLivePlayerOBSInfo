<template>
  <img v-bind:src="imgSrc" class="media-cover"/>
</template>

<script>
export default {
  name: "MediaCover",
  tmplName: "media-cover",
  className: "media-cover",
  computed: {
    current() {
      return this.$store.state.current;
    },
    imgSrc() {
      if (this.$store.state.current.Cover.Data !== null) {
        return 'data:image/jpeg;base64,'+this.$store.state.current.Cover.Data;
      }
      return this.$store.state.current.Cover.Url;
    }
  },
  template:
      `<img v-bind:src="imgSrc" class="media-cover"/>`
}
</script>

<style scoped>
.media-cover {
  width: auto;
  height: auto;
}
</style>