<template>
    <div>
        <audio ref="audio" :src="getSongsUrl.mp3.url" autoplay></audio>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import bus from '@/bus.js'
export default {
  name: 'audioPlay',
  data () {
    return {
    }
  },
  methods: {
    handlerEvent () {
      this.$refs.audio.addEventListener('play', () => { // 音频暂停
        console.log(this.$refs.audio)
      })
      this.$refs.audio.addEventListener('timeupdate', () => { // 播放位置改变时触发
        const that = this
        setTimeout(function () { // 节流
          bus.$emit('currenttime', that.$refs.audio.currentTime)
        }, 1000)
      })
      this.$refs.audio.addEventListener('ended', () => { // 播放完成之后自动换下一首
        bus.$emit('nextSongs', this.idx)
      })
    }
  },
  computed: {
    ...mapState({
      getSongsUrl: 'getSongsUrl',
      idx: 'idx',
      songsList: 'songsList'
    })
  },
  mounted () {
    this.handlerEvent()
    bus.$on('control', (p) => {
      if (p) {
        this.$refs.audio.play() // 播放
      } else {
        this.$refs.audio.pause()
      }
    })
  }
}
</script>
<style lang="stylus" scoped>

</style>
