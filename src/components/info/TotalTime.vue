<template>
  <span class="total-time">{{ time }}</span>
</template>

<script>
export default {
  name: "TotalTime",
  tmplName: "total-time",
  className: "total-time",
  props : {
    format: String
  },
  computed: {
    time() {
      if (this.format === 'm:s') {
        return Math.floor(this.$store.state.totalTime/60) + ":" + (this.$store.state.totalTime % 60)
      }
      return this.$store.state.totalTime;
    },
  },
  template:
      `<span class="total-time">{{ time }}</span>`
}
</script>

<style scoped>
.total-time {
  
}
</style>