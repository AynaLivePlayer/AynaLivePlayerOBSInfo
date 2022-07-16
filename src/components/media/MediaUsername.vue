<template>
  <span class="media-username">{{ current.Username }}</span>
</template>

<script>
export default {
  name: "MediaUsername",
  tmplName: "media-username",
  className: "media-username",
  computed: {
    current() {
      return this.$store.state.current;
    },
  },
  template:
      `<span class="media-username">{{ current.Username }}</span>`
}
</script>

<style scoped>
.media-username{

}
</style>