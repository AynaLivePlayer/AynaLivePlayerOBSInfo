<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono:100,300,400,500,700">
  <div class="player">
    <div class="front">
      <media-cover></media-cover>
      <div class="bar">
        <hr>
      </div>
      <div class="meta">
        <time>
          <current-time format="m:s"></current-time>
          <total-time format="m:s"></total-time>
        </time>
        <div class="info">
          <h1><media-title></media-title></h1>
          <h2><media-artist></media-artist></h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlaylistContainer from "../components/playlist/PlaylistContainer.vue"
import MediaCover from "../components/media/MediaCover.vue";
import MediaTitle from "../components/media/MediaTitle.vue";
import MediaArtist from "../components/media/MediaArtist.vue";
import CurrentTime from "../components/info/CurrentTime.vue";
import TotalTime from "../components/info/TotalTime.vue";
export default {
  name: "SimplePlayer",
  components: {TotalTime, CurrentTime, MediaArtist, MediaTitle, MediaCover, PlaylistContainer}
}
</script>

<style scoped>
.media-cover {
  border-radius: 2px 2px 0 0;
  display: block;
  width: 128px;
  height: 128px;
}
.bar hr {
  transform: translateX(-50%);
  margin-bottom: 0;
  padding: 0;
  border: 0;
  background: #EB2045;
}
* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  transform-style: preserve-3d;
}
.player,  .front {
  will-change: transform;
  transform-origin: center center;
  transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.front{
  transition: all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background: white;
  border-radius: 2px;
  box-shadow: 0 0 15px rgba(123, 22, 40, 0.2);
}

.meta {
  text-align: center;
}
.meta time {
  display: flex;
  justify-content: space-between;
  padding: 0 4px;
  font-size: 10px;
}
.meta .info {
  padding: 12px;
  word-wrap: break-word;
  word-break: break-all;
}
.meta h1 {
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 6px;
}
.meta h2 {
  font-size: 14px;
  font-weight: 500;

}
</style>