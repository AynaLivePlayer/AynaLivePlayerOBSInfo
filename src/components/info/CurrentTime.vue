<template>
  <span class="current-time">{{ time }}</span>
</template>

<script>
export default {
  name: "CurrentTime",
  tmplName: "current-time",
  className: "current-time",
  props : {
    format: String
  },
  computed: {
    time() {
      if (this.format === 'm:s') {
        return Math.floor(this.$store.state.currentTime/60) +":" + (this.$store.state.currentTime % 60)
      }
      return this.$store.state.currentTime;
    },
  }
}
</script>

<style scoped>
.current-time {
  
}
</style>