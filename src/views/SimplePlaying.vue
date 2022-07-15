<template>
<div>
  <media-title></media-title>
  ---
  <media-artist></media-artist>
  ---
  <media-username></media-username>
</div>
</template>

<script>
import MediaTitle from "../components/media/MediaTitle.vue";
import MediaArtist from "../components/media/MediaArtist.vue";
import MediaUsername from "../components/media/MediaUsername.vue";
export default {
  name: "CurrentPlaying",
  components: {MediaUsername, MediaArtist, MediaTitle}
}
</script>

<style scoped>

</style>