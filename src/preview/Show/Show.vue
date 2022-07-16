<template>
  <div class="totalShow">
    <div class="play">
      <template v-if="template === 'SimpleAll' || template==='请选择模板'">
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
      </template>
      <template v-if="template === 'SimpleCover'">
        <div>
          <media-cover></media-cover>
        </div>
      </template>
      <!-- <template v-if="template === 'SimpleLyric'">
        <div>
          <p><current-lyric></current-lyric></p>
        </div>
      </template> -->
      <template v-if="template === 'SimplePlayer'">
        <div>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto+Mono:100,300,400,500,700"
          />
          <div class="player">
            <div class="front">
              <media-cover></media-cover>
              <div class="bar">
                <hr />
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
        </div>
      </template>
      <template v-if="template === 'SimplePlaying'">
        <div>
          <media-title></media-title>
          ---
          <media-artist></media-artist>
          ---
          <media-username></media-username>
        </div>
      </template>
      <template v-if="template === 'SimplePlaylist'">
        <div>
          <playlist-container></playlist-container>
        </div>
      </template>
    </div>

    <el-form label-width="100px" style="width: 400px">
      <el-form-item label="mediaCover">
        <el-input
          v-model="mediaCover"
          autosize
          type="textarea"
          @input="changeCSS()"
        />
      </el-form-item>
      <el-form-item label="currentPlaying">
        <el-input
          v-model="currentPlaying"
          autosize
          type="textarea"
          @input="changeCSS()"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {ElConfigProvider} from "element-plus";
export default {
  name: "Show",
  components: {
    ElConfigProvider
  },
  data() {
    return {
      mediaCover: `width: 128px;height: 128px;`,
      currentPlaying: "font-weight: bold;",
    };
  },
  computed: {
    ...mapState(["template"]),
  },
  methods: {
    changeCSS() {
      let mediaCover = document.querySelector(".media-cover");
      let currentPlaying = document.querySelector(".current-playing");
      mediaCover.style = this.mediaCover;
      currentPlaying.style = this.currentPlaying;
    },
  },
  mounted(){
    console.log(this.template);
  }
};
</script>

<style scoped>
.totalShow {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.play {
  margin: 0 30px;
}
.el-form {
  margin-right: 90px;
}

.media-cover {
  width: 128px;
  height: 128px;
}

.current-playing {
  font-weight: bold;
}
</style>