<template>
  <div>
    <div>
      <media-cover></media-cover>
      <div class="current-playing">
        <media-title></media-title>
        ---
        <media-artist></media-artist>
        ---
        <media-username></media-username>
      </div>
    </div>
    <div>
      <playlist-container></playlist-container>
    </div>
  </div>
</template>

<script>
import MediaCover from "../components/media/MediaCover.vue";
import PlaylistContainer from "../components/playlist/PlaylistContainer.vue";
import MediaTitle from "../components/media/MediaTitle.vue";
import MediaArtist from "../components/media/MediaArtist.vue";
import MediaUsername from "../components/media/MediaUsername.vue";
export default {
  name: "SimpleCover",
  components: {PlaylistContainer, MediaCover,MediaUsername, MediaArtist, MediaTitle}
}
</script>

<style scoped>
.media-cover {
  width: 128px;
  height: 128px;
}
.current-playing {
  font-weight: bold;
}
</style>