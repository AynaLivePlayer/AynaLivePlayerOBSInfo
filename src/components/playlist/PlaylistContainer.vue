<template>
  <div class="playlist-container">
    <div v-for="(item, index) in playlist" :key="index">
      <p>
        #
        <playlist-index :index="index"></playlist-index>
        -
        <playlist-title :index="index"></playlist-title>
        -
        <playlist-username :index="index"></playlist-username>
      </p>
    </div>
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
    },
  },
  template:
      `
        <div class="playlist-container">
        <div v-for="(item, index) in playlist" :key="index">
          <p>
            #
            <playlist-index :index="index"></playlist-index>
            -
            <playlist-title :index="index"></playlist-title>
            -
            <playlist-username :index="index"></playlist-username>
          </p>
        </div>
        </div>
      `
};
</script>

<style scoped>
</style>