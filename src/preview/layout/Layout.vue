<template>
  <div class="layout">
    <el-select v-model="value" class="m-2" placeholder="Select" size="large">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

    <el-input
      v-model="textTemplate"
      :autosize="{ minRows: 2, maxRows: 50 }"
      type="textarea"
      placeholder="请选择模板"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
// import {ElConfigProvider} from "element-plus";
export default {
  name: "Layout",
  components: {
    // ElConfigProvider
  },
  data() {
    return {
      value: "请选择模板",
      textTemplate:this.SimpleAll,
      options: [
        {
          value: "SimpleAll",
          label: this.SimpleAll,
        },
        {
          value: "SimpleCover",
          label: this.SimpleCover,
        },
        {
          value: "SimplePlayer",
          label: this.SimplePlayer,
        },
        {
          value: "SimplePlaying",
          label: this.SimplePlaying,
        },
        {
          value: "SimplePlaylist",
          label: this.SimplePlaylist,
        },
      ],
    };
  },
  computed: {
    ...mapState(["template", "SimpleAll", "SimpleCover",'SimplePlayer','SimplePlaying','SimplePlaylist']),
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue, oldValue) {
        this.$store.dispatch("changeTemp", newValue);
        if (newValue == "SimpleAll") {
          this.textTemplate = this.SimpleAll;
        } else if (newValue == "SimpleCover") {
          this.textTemplate = this.SimpleCover;
        }
      },
    },
  },
};
</script>

<style scoped>
.m-2 {
  width: 100%;
  margin-bottom: 30px;
}
</style>