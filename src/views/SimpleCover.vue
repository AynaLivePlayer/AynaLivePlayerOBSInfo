<template>
<media-cover></media-cover>
</template>

<script>
import MediaCover from "../components/media/MediaCover.vue";
export default {
  name: "SimpleCover",
  components: {MediaCover}
}
</script>

<style scoped>
.media-cover {
  width: 256px;
  height: 256px;
}
</style>