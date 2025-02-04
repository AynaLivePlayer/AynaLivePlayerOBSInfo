<script setup lang="ts">
import {usePlayInfoStore} from "@/stores/playinfo";
import {computed, watch, ref} from "vue";
import ScrollLeftRight from "@/components/common/ScrollLeftRight.vue";

class Timer {
  delay(ms: number): Promise<Timer> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this), ms);
    });
  }
}

const timer = new Timer();

interface Props {
  playlistshowing: boolean
}

interface Notification {
  Message: string,
  User: string,
  Type: string,
  Image: string | null
}

const props = defineProps<Props>();

const playInfoStore = usePlayInfoStore();
const isPlaylistShow = computed(() => props.playlistshowing);
const showNotification = ref<boolean>(false);

const notifications = ref<Notification[]>([]);
const currentNotification = ref<Notification | null>(null);
const playlistLength = computed( () => playInfoStore.playlist.length)
const isUser = ref<boolean>(false);
const hasCover = ref<boolean>(false);

watch(playlistLength, (newValue, oldValue) => {
  console.log(newValue, oldValue);
  if(newValue > oldValue) {
    console.log(playInfoStore.playlist[playInfoStore.playlist.length - 1].User.Username)
    if(playInfoStore.playlist[playInfoStore.playlist.length - 1].User.Username) {
      const notification: Notification = {
        Message: `成功点歌：${playInfoStore.playlist[playInfoStore.playlist.length - 1].Info.Title} - ${playInfoStore.playlist[playInfoStore.playlist.length - 1].Info.Artist}`,
        User: playInfoStore.playlist[playInfoStore.playlist.length - 1].User.Username,
        Type: "ordersong",
        Image: playInfoStore.playlist[playInfoStore.playlist.length - 1].Info.Cover.Url
      };
      notifications.value.push(notification);
      showNextNotification();
    } else {
      const notification: Notification = {
        Message: `主播成功添加歌曲：${playInfoStore.playlist[playInfoStore.playlist.length - 1].Info.Title} - ${playInfoStore.playlist[playInfoStore.playlist.length - 1].Info.Artist}`,
        User: 'System',
        Type: "ordersong",
        Image: playInfoStore.playlist[playInfoStore.playlist.length - 1].Info.Cover.Url
      };
      notifications.value.push(notification);
      showNextNotification();
    }
  }
},{ deep: true });

const showNextNotification = () => {
  // 如果当前没有显示通知，并且队列中有通知，则显示下一个通知
  if (!showNotification.value && notifications.value.length > 0) {
    currentNotification.value = notifications.value.shift();
    if(currentNotification.value?.User === "System") {isUser.value = false}
    else {isUser.value = true}
    if(currentNotification.value?.Image === "") {hasCover.value = false}
    else {hasCover.value = true}
    showNotification.value = true;
    console.log(currentNotification.value, "aaa", showNotification.value);
    // setTimeout(() => {
    //   showNotification.value = false;
    //   setTimeout(()=>{
    //     currentNotification.value = null;
    //     showNextNotification(); // 显示下一个通知
    //   }, 1000)
    // }, 5000); // 5秒后隐藏当前通知
    timer.delay(5000).then(() => {
      showNotification.value = false;
      console.log('5秒定时器完成');
      return timer.delay(1000);
    }).then(() => {
      currentNotification.value = null;
      showNextNotification(); // 显示下一个通知
      console.log('1秒定时器完成');
    });
  }
}

</script>

<template>
<div
    class="aii-player-event"
    :class="{'aii-player-event-active': showNotification && !isPlaylistShow, 'aii-player-event-hide': !(showNotification && !isPlaylistShow)}"
>
  <div class="aii-player-event-message">
    <ScrollLeftRight :stay_ms="1000" :px_per_ms="50">
      {{ currentNotification?.Message }}
    </ScrollLeftRight>
  </div>
  <div class="aii-player-event-user" v-if="isUser">
    <ScrollLeftRight :stay_ms="1000" :px_per_ms="50">
      by {{ currentNotification?.User }}
    </ScrollLeftRight>
  </div>
  <img :src="currentNotification?.Image" class="aii-player-event-img" v-if="hasCover">
  <img src="@/assets/imgs/default_cover.png" class="aii-player-event-img" v-if="!hasCover">
  <img src="@/assets/imgs/Aiikisaraki/star.png" alt="" class="aii-player-event-star-1">
</div>
</template>

<style scoped lang="less">
.aii-player-event {
  width: 20%;
  height: 10%;
  background-color: #d5e7f3;
  border-radius: 0 20px 20px 0;
  border-top: 3px solid #5484c4;
  border-right: 3px solid #5484c4;
  border-bottom: 3px solid #5484c4;
  position: absolute;
  top: 90px;
  font-size: 24px;
  transition: all 1s ease-in-out;
  .aii-player-event-message {
    width: 75%;
    position: absolute;
    top: 10px;
    left: 15px;
    color: #013454;
  }
  .aii-player-event-user {
    width: 75%;
    position: absolute;
    text-align: right;
    bottom: 10px;
    right: 15px;
    color: #7f196b;
  }
  .aii-player-event-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 2px solid #5484c4;
    position: absolute;
    top: -30px;
    right: -30px;
  }
  .aii-player-event-star-1 {
    width: 40px;
    height: 40px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    z-index: 2;
    transform: rotate(-15deg);
    filter: brightness(120%) contrast(120%) saturate(200%) hue-rotate(330deg);
  }
}
.aii-player-event-active {
  left: 0;
  opacity: 100%;
}
.aii-player-event-hide {
  left: -20%;
  opacity: 0;
}
</style>