<template>
  <div id="app">
    <!-- <keep-alive> -->
      <!-- 带了缓存的功能 -->
     <router-view></router-view>
    <!-- </keep-alive> -->
     <!-- 引入三个播放的组件 -->
     <full-play></full-play>
     <mini-player></mini-player>
     <audio-play></audio-play>
  </div>
</template>
<script>
import AudioPlay from './components/audioPlay.vue'
import FullPlay from './components/fullPlay.vue'
import MiniPlayer from './components/miniPlayer.vue'

export default {
  name: 'app',
  components: { FullPlay, AudioPlay, MiniPlayer  }
}
</script>
<style lang="stylus">
</style>
