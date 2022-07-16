<template>
  <playlist-container></playlist-container>
</template>

<script>
import PlaylistContainer from "../components/playlist/PlaylistContainer.vue"

export default {
  name: "SimplePlaylist",
  components: {PlaylistContainer},
  template:
      `
        <playlist-container></playlist-container>
      `
}
</script>

<style scoped>

</style>