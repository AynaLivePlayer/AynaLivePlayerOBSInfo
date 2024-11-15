<script setup lang="ts">

</script>

<template>
  <div class="p-6 space-y-4">
    <p class="text-2xl font-bold text-gray-800">这边是欢迎页面</p>
    <p class="text-lg text-gray-600">在设置中启动websocket服务器后就可以预览了，如果需要开启自动启动websocket服务器请把自动启动打上勾</p>

    <p class="text-lg text-gray-600">教程请看: <a href="https://www.bilibili.com/video/BV1Zw4m1y7xQ/?p=3" target="_blank" class="text-blue-600 hover:underline hover:text-blue-800 text-base">BV1Zw4m1y7xQ?p=3</a></p>
    <p class="text-lg text-gray-600">下面是一些可选项: (点击可以预览)</p>
    <div class="space-y-2">
      <div class="flex items-center space-x-2">
        <router-link
            to="/builtin/player1"
            class="text-blue-600 hover:underline hover:text-blue-800"
        >
          播放器样式1 by Aynakeya
        </router-link>
        <span class="text-sm text-gray-500">(宽度: 600 高度: 200)</span>
      </div>

      <div class="flex items-center space-x-2">
        <router-link
            to="/builtin/player1/playlist"
            class="text-blue-600 hover:underline hover:text-blue-800"
        >
          播放列表 by Aynakeya
        </router-link>
        <span class="text-sm text-gray-500">(宽度: 600 高度: any)</span>
      </div>

      <div class="flex items-center space-x-2">
        <router-link
            to="/builtin/player2"
            class="text-blue-600 hover:underline hover:text-blue-800"
        >
          播放器样式2 by @立青
        </router-link>
        <span class="text-sm text-gray-500">(宽度: 450 高度: >=150)</span>
      </div>

      <div class="flex items-center space-x-2">
        <router-link
            to="/builtin/player2_right"
            class="text-blue-600 hover:underline hover:text-blue-800"
        >
          播放器样式2 右边对其 by @立青
        </router-link>
        <span class="text-sm text-gray-500">(宽度: 450 高度: >=150)</span>
      </div>
    </div>
    <p class="text-lg text-gray-600">这个连接是正在开发中的webui,需要开启websocket以及websocket控制才能使用</p>
    <div class="flex items-center space-x-2">
      <router-link
          to="/webui/player"
          class="text-blue-600 hover:underline hover:text-blue-800"
      >
        WebUI by Aynakeya
      </router-link>
    </div>
    <p class="text-sm text-gray-500">
      代码开源在
      <a href="https://github.com/AynaLivePlayer/AynaLivePlayerOBSInfo"
         class="text-blue-600 hover:underline hover:text-blue-800"
         target="_blank"
      >
        https://github.com/AynaLivePlayer/AynaLivePlayerOBSInfo
      </a>，欢迎fork/pull request，我会定期部署到自己的服务器。或者你也可以自行修改并部署~
    </p>
    <p class="text-sm text-gray-500">所以如果你需要自定义样式，可以找任何样式作者代写捏～ 当然也可以找我本人，当然复杂的就不是免费的喽</p>
    <p class="text-sm text-gray-500">- By Aynakeya</p>
  </div>
</template>

<style scoped>

</style>
