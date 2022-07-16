<template>
  <span class="media-index">{{ current.Index }}</span>
</template>

<script>
export default {
  name: "MediaIndex",
  tmplName: "media-index",
  className: "media-index",
  computed: {
    current() {
      return this.$store.state.current;
    },
  },
  template:
      `<span class="media-index">{{ current.Index }}</span>`
}
</script>

<style scoped>
.media-index {

}
</style>