<template>
  <media-cover></media-cover>
  <h1>{{ Current.Title }}</h1>
  <current-lyric></current-lyric>
  <p>
    <current-time></current-time>
    /
    <total-time></total-time>
  </p>
  <p>
    <current-time format="m:s"></current-time>
    /
    <total-time format="m:s"></total-time>
  </p>
  <div>
    <media-title></media-title>
    <media-artist></media-artist>
  </div>
  <playlist-container></playlist-container>
  <playlist-container>
    <template v-slot="v">
      <p>
        <playlist-title :index="v.index"></playlist-title>
      </p>
    </template>
  </playlist-container>
</template>

<script>
import MediaArtist from "./media/MediaArtist.vue";
import MediaTitle from "./media/MediaTitle.vue";
import MediaCover from "./media/MediaCover.vue";
import CurrentLyric from "./info/Lyric.vue";
import CurrentTime from "./info/CurrentTime.vue";
import TotalTime from "./info/TotalTime.vue";
import PlaylistUsername from "./playlist/Username.vue";
import PlaylistContainer from "./playlist/PlaylistContainer.vue";
import PlaylistTitle from "./playlist/Title.vue";

export default {
  name: "HelloWorld",
  components: {
    PlaylistTitle,
    PlaylistContainer,
    PlaylistUsername, TotalTime, CurrentTime, CurrentLyric, MediaCover, MediaTitle, MediaArtist
  },
  mounted() {
    console.log(MediaArtist.tmplName, MediaArtist.className)
  },
  computed: {
    Current() {
      return this.$store.state.current;
    },
    Lyric() {
      return this.$store.state.lyric;
    }
  }
}

</script>

<style scoped>
.media-artist {
  color: #66CCFF;
}

.media-cover {
  width: 256px;
}
</style>
