<template>
  <component :is="{template:getValidTemplate(textTemplate)}">
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
  },
  methods: {
    getValidTemplate(tmpl) {
      if (tmpl === undefined) {
        return ""
      }
      let doc = document.createElement('div');
      doc.innerHTML = tmpl;
      return doc.innerHTML;
    },
  }
}
</script>

<style scoped>
</style>