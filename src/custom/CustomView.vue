<template>
  <component :is="{template:textTemplate}">
  </component>
</template>

<script>
import {Client} from "../api/client.js";

export default {
  name: 'CustomEdit',
  props: {
    name: String
  },
  data() {
    let tmplName = "default";
    if (this.name !== '') {
      tmplName = this.name
    }
    if (this.$route.query.name !== undefined) {
      tmplName = this.$route.query.name
    }
    return {
      tmplName:tmplName,
      textTemplate: '',
    };
  },
  mounted() {
    let _this = this
    Client.get("/api/template/get", {
      params: {
        name: this.tmplName,
      }
    }).then(function (resp) {
      _this.textTemplate = resp.data.Template;
    })
  }
}
</script>

<style scoped>
</style>