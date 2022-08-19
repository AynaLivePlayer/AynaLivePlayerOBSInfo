<template>
  <div class="preview">
    <div class="layout">
      <p>
        <el-link href="/#/previewV2" type="primary">系统模板</el-link>
        <span> / </span>
        <el-link href="/#/custom/edit" type="primary">自定义模板</el-link>
      </p>
      <el-form>
        <el-form-item label="新建模板(输入模板名字):">
          <el-input
              v-model="newTmplName"
          >
          </el-input>
          <el-button
              type="primary"
              @click="createTemplate"
          >新建
          </el-button>
        </el-form-item>
      </el-form>
      <el-select
          v-model="tmplName" class="m-2" placeholder="Select" size="large"
          @change="updateTemplate"
      >
        <el-option
            v-for="key in templates"
            :key="key"
            :value="key"
        />
      </el-select>

      <el-input
          v-model="textTemplate"
          :autosize="{ minRows: 16, maxRows: 64 }"
          type="textarea"
          placeholder="请选择模板"
      />

      <el-button
          type="primary"
          @click="saveTemplate"
      >保存
      </el-button>
    </div>
    <div class="totalShow">
      <div>
        <p>
          <el-link v-bind:href="currentViewUrl" target="_blank" type="primary">{{ currentViewUrl }}</el-link>
        </p>
        <component :is="{template:getValidTemplate(textTemplate)}" class="play">
        </component>
      </div>
      <el-form label-width="128px">
        <el-scrollbar max-height="400px" style="height:auto">
          <el-form-item v-for="val in usableTmpls" :label="val.name">
            <p>html tag: &lt;{{ val.tmplName }}&gt;&lt;/{{ val.tmplName }}&gt;</p>
            <el-input
                v-model="userCSS[val.cssName]"
                autosize
                type="textarea"
                @change="changeCSS(val.cssName,$event)"
            />
          </el-form-item>
        </el-scrollbar>
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
import {Client} from "../api/client.js";
import myComp from "../components/index.js"
// import {parseFragment,serialize} from "parse5"

export default {
  name: 'CustomEdit',

  data() {
    let usableTmpls = []
    for (let name in myComp.components) {
      usableTmpls.push({
        tmplName: myComp.components[name].tmplName,
        cssName: myComp.components[name].className,
        name: myComp.components[name].name
      })
    }

    return {
      templates: ["default"],
      tmplName: 'default',
      textTemplate: '',
      newTmplName: '',
      usableTmpls: usableTmpls,
      userCSS: {}
    };
  },
  mounted() {
    document.body.className="scroll"
    this.updateTmplList();
    this.updateTemplate();
  },
  computed: {
    currentViewUrl() {
      return `http://${ window.location.host}/#/custom/view?name=${ this.tmplName}`
    },
    currentTemplate() {
      if (this.tmplName === '') {
        return {template: ''};
      }
      return routesMap[this.tmplName].component;
    },
    cssOut() {
      let cssText = []
      for (let key in this.userCSS) {
        cssText.push(`.${key} {${this.userCSS[key]}}`)
      }
      return cssText.join("\n")
    },
  },
  methods: {
    createTemplate() {
      if (this.newTmplName === '') {
        return
      }
      this.tmplName = this.newTmplName;
      this.updateTemplate();
      this.updateTmplList();
    },
    updateTmplList() {
      let _this = this;
      Client.get("/api/template/list").then(function (resp) {
        _this.templates = resp.data;
      })
    },
    updateTemplate() {
      let _this = this;
      Client.get("/api/template/get", {
        params: {
          name: _this.tmplName,
        }
      }).then(function (resp) {
        _this.textTemplate = resp.data.Template;
      })
    },
    saveTemplate() {
      let fm = new FormData();
      fm.append("name", this.tmplName);
      fm.append("template", this.textTemplate);
      console.log(this)
      Client.post("/api/template/save", fm)
    },
    getValidTemplate(tmpl) {
      if (tmpl === undefined) {
        return ""
      }
      let doc = document.createElement('div');
      doc.innerHTML = tmpl;
      // console.log(serialize(parseFragment(doc.innerHTML)));
      return doc.innerHTML;
    },
    changeCSS(cssName, content) {
      document.querySelectorAll('.' + cssName).forEach((elem) => {
        elem.style.cssText = content;
      })
    },
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