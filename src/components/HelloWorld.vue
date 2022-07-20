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
  <playlist-container>
    <template v-slot="v">
      <p>序号: <playlist-index :index="v.index"></playlist-index></p>
      <p>
        歌名: <playlist-title :index="v.index"></playlist-title>
      </p>
      <p>
        歌手: <playlist-artist :index="v.index"></playlist-artist>
      </p>
      <p>
        专辑名: <playlist-album :index="v.index"></playlist-album>
      </p>
      <p>
        点歌用户: <playlist-username :index="v.index"></playlist-username>
      </p>
    </template>
  </playlist-container>
</template>

<script>
import MediaArtist from "./media/MediaArtist.vue";
import MediaTitle from "./media/MediaTitle.vue";
import MediaCover from "./media/MediaCover.vue";
import CurrentLyric from "./info/CurrentLyric.vue";
import CurrentTime from "./info/CurrentTime.vue";
import TotalTime from "./info/TotalTime.vue";
import PlaylistUsername from "./playlist/Username.vue";
import PlaylistContainer from "./playlist/PlaylistContainer.vue";
import PlaylistTitle from "./playlist/Title.vue";
import PlaylistIndex from "./playlist/Index.vue";
import PlaylistAlbum from "./playlist/Album.vue";
import PlaylistArtist from "./playlist/Artist.vue";

export default {
  name: "HelloWorld",
  components: {
    PlaylistArtist,
    PlaylistAlbum,
    PlaylistIndex,
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
