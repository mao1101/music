<template>
    <div class="mini" v-if="openMini" @click="toFull()">
        <div class="tou">
           <img :src="songsList[idx].al === undefined ? songsList[idx].album.artist.img1v1Url : songsList[idx].al.picUrl " alt="" srcset="">
        </div>
        <div class="songsname">
          <p class="name danhang">{{getSongsUrl.name}}</p>
          <p class="ar danhang">-{{songsList[idx].ar ? songsList[idx].ar[0].name :  songsList[idx].artists[0].name }}</p>
        </div>
        <!-- <div class="last">
            <van-icon @click="isstart()" class="van-icon" :class="isPause?'van-icon-pause': 'van-icon-play'" />
            <van-icon name="arrow" @click="next(idx)"/>
        </div> -->
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'miniPlayer',
  data () {
    return {
      isPause: true

    }
  },
  methods: {
    ...mapMutations(['toFull']), // 点击mini打开全屏
    next (i) { // 点击播放下一首
      i++
      if (i > this.songsList.length) {
        i = 0
      }
      this.$store.dispatch('full', [this.songsList[i].id, this.songsList[i].name])
      this.$store.commit('index', i) // 点击的下标
      this.isPause = true
    }
  },
  computed: {
    ...mapState({
      openMini: 'openMini',
      getSongsUrl: 'getSongsUrl',
      songsList: 'songsList',
      idx: 'idx'
    })
  }
}
</script>
<style lang="stylus" scoped>
.last
  width 2rem
  height 1rem
  font-size .5rem
  display flex
  align-items center
  justify-content center
  z-index 13
@keyframes rotating {
  0%{
    transform rotateZ(0)
  }
  100%{
    transform rotateZ(360deg)
  }
}
.danhang
  overflow: hidden
  text-overflow:ellipsis
  white-space: nowrap
.mini
  width 100%
  height 1.2rem
  background-color #e8e8e8
  position fixed
  left 0
  bottom 0
  z-index 11
  display flex
  align-items center
  .tou
    width 1rem
    height 1rem
    border-radius 50%
    margin-left .1rem
    animation rotating 24s linear infinite
    transform-origin center
    img
      width 100%
      height 100%
      border-radius 50%
  .songsname
    margin-left .2rem
    display flex
    width 4rem
    .name
      color black
    .ar
      font-size .25rem
      color grey
</style>
