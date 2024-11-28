<script setup lang="ts">

import HeaderPlaylists from "@/views/webui/components/header/HeaderPlaylists.vue";
import HeaderBasic from "@/views/webui/components/header/HeaderBasic.vue";
</script>

<template>
  <ul class="menu menu-compact p-3 gap-y-3">
    <HeaderBasic />
      <li class="menu-title">
        直播间
      </li>
      <li>
        建设中
      </li>
    <HeaderPlaylists />
  </ul>
</template>
