<template>
  <h1 class="text-xl font-bold underline">
    Hello world!
  </h1>
  <MediaAlbum></MediaAlbum>
  <MediaUsername></MediaUsername>
  <MediaCover></MediaCover>
  <CurrentTime format="m:s"></Currenttime>
</template>

<style>
</style>
<script setup>
import MediaAlbum from "@/components/current/MediaAlbum.vue";
import MediaUsername from "@/components/current/MediaUsername.vue";
import MediaCover from "@/components/current/MediaCover.vue";
import CurrentTime from "@/components/current/CurrentTime.vue";
</script>
