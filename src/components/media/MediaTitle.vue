<template>
  <span class="media-title">{{ data }}</span>
</template>

<script>
export default {
  name: "MediaTitle",
  tmplName: "media-title",
  className: "media-title",
  computed: {
    data() {
      return this.$store.state.current.Title;
    },
  }
}
</script>

<style scoped>
.media-title {

}
</style>