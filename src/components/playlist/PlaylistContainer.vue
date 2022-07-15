<template>
  <div class="playlist-container">
    <template v-for="(_, index) in playlist.length">
      <slot v-bind:index="index">
        <p>#<playlist-index :index="index"></playlist-index> - <playlist-title :index="index"></playlist-title> - <playlist-username :index="index"></playlist-username></p>
      </slot>
    </template>
  </div>
</template>

<script>
import PlaylistIndex from "./Index.vue";
import PlaylistTitle from "./Title.vue";
import PlaylistUsername from "./Username.vue";
export default {
  name: "PlaylistContainer",
  components: {PlaylistUsername, PlaylistTitle, PlaylistIndex},
  className: "playlist-container",
  tmplName: "playlist-container",
  computed: {
    playlist() {
      return this.$store.state.playlist;
    }
  }
}
</script>

<style scoped>
.playlist-container{
}
</style>