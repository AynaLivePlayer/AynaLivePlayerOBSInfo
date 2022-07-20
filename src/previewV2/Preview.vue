<template>
  <div class="preview">
    <div class="layout">
      <p>
        <el-link href="/#/previewV2" type="primary">系统模板</el-link>
        <span> / </span>
        <el-link href="/#/custom/edit" type="primary">自定义模板</el-link>
      </p>
      <el-select
          v-model="tmplName" class="m-2" placeholder="Select" size="large"
          @change="updateTmpl"
      >
        <el-option
            v-for="(value, key) in options"
            :key="key"
            :value="key"
        />
      </el-select>

      <el-input
          v-model="textTemplate"
          :autosize="{ minRows: 16, maxRows: 64 }"
          type="textarea"
          placeholder="请选择模板"
          :readonly="true"
      />
    </div>
    <div class="totalShow">
      <div>
        <p>
          <el-link v-bind:href="currentViewUrl" target="_blank" type="primary">{{currentViewUrl}}</el-link>
        </p>
        <component :is="currentTemplate" class="play">
        </component>
      </div>
      <el-form label-width="100px" style="width: 400px">
        <el-form-item v-for="val in currentCssList" :label="val.name">
          <el-input
              v-model="userCSS[val.css]"
              autosize
              type="textarea"
              @change="changeCSS(val.css,$event)"
          />
        </el-form-item>
        <el-form-item label="CSS 输出">
          <el-input
              v-model="cssOut"
              :autosize="{ minRows: 16, maxRows: 64 }"
              type="textarea"
              :readonly="true"
          >
          </el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {componentRoutes, routesMap, simpleRoutes} from "../router/index.js";

export default {
  name: 'Preview',
  components: {
  },
  mounted() {
    document.body.className="scroll"
  },
  data(){
    let opts = {}
    let routes = [...componentRoutes,...simpleRoutes];
    for (let index in routes) {
      opts[routes[index].component.name] = {
        name: routes[index].component.name,
        path: routes[index].path,
        tmpl: routes[index].component.template
      }
    }
    return {
      tmplName: routes[0].component.name,
      textTemplate:opts[routes[0].component.name].tmpl,
      options: opts,
      userCSS: {}
    };
  },
  computed: {
    currentViewUrl() {
      return `http://${ window.location.host}/#${routesMap[this.tmplName].path}`
    },
    currentTemplate() {
      if (this.tmplName === '') {
        return {template:''};
      }
      return routesMap[this.tmplName].component;
    },
    currentCssList() {
      if (this.tmplName === '') {
        return [];
      }
      let c = [];
      this.getCssList(routesMap[this.tmplName].component,c);
      return c;
    },
    cssOut() {
      let cssText =[]
      for (let key in this.userCSS) {
        cssText.push(`.${key} {${this.userCSS[key]}}`)
      }
      return cssText.join("\n")
    }
  },
  methods: {
    updateTmpl(val) {
      this.userCSS = {};
      this.textTemplate = this.options[val].tmpl;
    },
    changeCSS(cssName,content) {
      document.querySelectorAll('.'+cssName).forEach((elem)=>{
        elem.style.cssText = content;
      })
    },
    getCssList(comp,cssList) {
      if (comp.className !== undefined) {
        cssList.push({
          name:comp.name,
          css:comp.className
        })
      }
      for (let v in comp.components) {
        this.getCssList(comp.components[v],cssList);
      }
    }
  }
}
</script>

<style scoped>
.preview {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 30px;
}

.m-2 {
  width: 100%;
  margin-bottom: 30px;
}

.totalShow {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.play {
  margin: 0 30px;
}
</style>