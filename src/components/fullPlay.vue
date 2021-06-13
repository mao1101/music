<template>
    <div class="container" v-if="isShowFull">
        <div class="top">
            <van-icon name="arrow-left" @click="closeF()"/>
            <p class="danhang">{{songsList.length === 0 ? '' : songsList[idx].name}}</p>
        </div>
        <div class="box">
          <div class="bang"
          :style="{'transform' : isPause ? '' : 'rotate(-30deg)'}"
          >
          </div>
          <div class="circle" :style="{'animation-play-state':isPause ? 'running':'paused'}">
            <img :src="songsList[idx].al === undefined ? songsList[idx].album.artist.img1v1Url : songsList[idx].al.picUrl " alt="" srcset="">
          </div>
          <div class="lrc" ref="lrcWrap">
            <div>
              <div class="lyric"
                v-for="(item, index) in this.currentLyric.lines"
                :key="index"
                ref="lines"
                :style="{'color' : index === currentIndex ? 'red' : ''}"
                >
                {{item.txt}}
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <ul class="icon">
            <li><van-icon name="like-o" /></li>
            <li><van-icon name="down" /></li>
            <li><van-icon name="ellipsis" /></li>
          </ul>
          <div class="jindu">
            <span class="start">{{currentTime}}</span>
            <div class="bar-bg" @click="jinCli()" ref="barJin">
              <div ref="actbg" class="active-bg" :style="{'width': progress}"></div>
              <div ref="cirbg" class="circle-bg" :style="{'left': progress}"></div>
            </div>
            <span class="end">{{end}}</span>
          </div>
          <ul class="zan">
            <li><van-icon name="replay" /></li>
            <li><van-icon name="arrow-left" @click="pre(idx)"/></li>
            <li><van-icon @click="isstart()" class="van-icon" :class="isPause?'van-icon-pause': 'van-icon-play'" /></li>
            <li><van-icon name="arrow" @click="next(idx)"/></li>
            <li><van-icon name="wap-nav" @click="showDidog()"/></li>
          </ul>
          <!-- 弹窗 -->
          <van-popup
            v-model="show"
            position="bottom"
            :style="{ height: '60%' }"
            >
            <div
              class="list-group"
              v-for="(item, index) in songsList"
              :key="index"
              @click="showFull(item.id,item.name,index)"
              >
              <div class="list-name danhang">{{item.name}}</div>
              <div class="list-ar danhang">- {{ item.ar ? item.ar[0].name : item.artists[0].name  }} </div>
            </div>
          </van-popup>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import bus from '@/bus.js'
import Lyric from 'lyric-parser' // 引入歌词插件
import Bs from 'better-scroll' // 歌词插件
export default {
  name: 'fullPlay',
  data () {
    return {
      isPause: true,
      show: false,
      progress: '0%', // 进度
      currentTime: '00:00',
      currentLyric: { // 设置一个歌词属性用来维护
        lines: null
      },
      currentIndex: 0
    }
  },
  methods: {
    ...mapMutations(['closeF']), // 调用仓库里全屏播放器页面的关闭方法
    showDidog () {
      this.show = true
    },
    isstart () {
      this.isPause = !this.isPause
      this.currentLyric.togglePlay()
      // 停止歌词
      bus.$emit('control', this.isPause)
    },
    showFull (id, name, index) { // 不能在这个地方请求mp3地址
    // 需要开启全屏播放器
      this.$store.dispatch('full', [id, name])
      this.$store.commit('index', index) // 点击的下标
      this.show = false
      this.isPause = true // 点击切换歌曲通过isPause控制的歌曲播放开关，动画效果 打开
    },
    next (i) { // 点击播放下一首
      const that = this
      // var timer1 = null
      clearTimeout(that.timer1)
      that.timer1 = setTimeout(function () {
        that.isPause = true
        i++
        if (i > that.songsList.length) {
          i = 0
        }
        that.currentLyric.stop()
        that.$store.dispatch('full', [that.songsList[i].id, that.songsList[i].name])
        that.$store.commit('index', i) // 点击的下标
        that.lyric()
      }, 300)
    },
    pre (i) { // 点击播放上一首
      const that = this
      // var timer1 = null
      clearTimeout(that.timer1)
      that.timer1 = setTimeout(function () {
        that.isPause = true
        i--
        if (i < 0) {
          i = that.songsList.length - 1
        }
        // 先停止当前播放的歌词
        that.currentLyric.stop()
        that.$store.dispatch('full', [that.songsList[i].id, that.songsList[i].name])
        that.$store.commit('index', i) // 点击的下标
        that.lyric()
      }, 300)
    },
    // jinCli (event) { // 点击进度框，歌曲进度变化
    //   var e = event || window.event
    //   const jinwidth = e.offsetX / this.$refs.barJin.clientWidth
    //   this.progress = jinwidth * 100 + '%'
    //   this.$refs.actbg.style.width = this.progress
    //   this.$refs.cirbg.style.left = this.progress
    // },
    lyric () { // 歌词
      var that = this
      const str = this.getSongsUrl.lrc
      if (str) {
        this.currentLyric = new Lyric(str, that.handler)
        that.scroll = new Bs(that.$refs.lrcWrap, {
          click: true
        })
        this.currentLyric.play() // 开始播放
      }
    },
    handler ({ lineNum, txt }) {
      // 拿到歌词后做什么
      // console.log(txt)
      this.currentIndex = lineNum
      if (lineNum <= 1) {
        this.scroll.scrollTo(0, 0)
      } else {
        const lyr = this.$refs.lines[lineNum - 1]
        this.scroll.scrollToElement(lyr, 100)
      }
    }
  },
  computed: {
    ...mapState({
      isShowFull: 'showFull', // 控制全屏播放器的显示
      getSongsUrl: 'getSongsUrl',
      songsList: 'songsList',
      idx: 'idx'
    }),
    end () {
      var dt
      if (this.songsList[this.idx].dt) {
        dt = this.songsList[this.idx].dt // 毫秒
      } else {
        dt = this.songsList[this.idx].duration // 毫秒
      }
      // 分钟
      const m = parseInt(dt / 1000 / 60) < 10 ? '0' + parseInt(dt / 1000 / 60) : parseInt(dt / 1000 / 60)
      const s = parseInt(dt / 1000 % 60) < 10 ? '0' + parseInt(dt / 1000 % 60) : parseInt(dt / 1000 % 60)
      return `${m} : ${s}`
    }
  },
  mounted () {
    bus.$on('currenttime', time => {
      time = parseInt(time)
      // 计算滑块进度
      var p
      if (this.songsList[this.idx].dt) {
        p = (time / (this.songsList[this.idx].dt / 1000)) * 100
      } else {
        p = (time / (this.songsList[this.idx].duration / 1000)) * 100
      }
      p = p.toFixed(2) + '%'
      this.progress = p
      // 换算分和秒
      const m = parseInt(time / 60) < 10 ? '0' + parseInt(time / 60) : parseInt(time / 60)
      const s = parseInt(time % 60) < 10 ? '0' + parseInt(time % 60) : parseInt(time % 60)
      this.currentTime = `${m}:${s}`
    })
    bus.$on('nextSongs', (idx) => { // 播放完之后自动下一首
      this.next(idx)
    })
  },
  watch: {
    'getSongsUrl.lrc': function () {  // 监听组件的lrc数据
      if (this.currentLyric.lines) {
        this.currentLyric.stop()
      }
      this.lyric() // 只要lrc数据更改，这个方法就会被调用
    }
  }
}
</script>
<style lang="stylus" scoped>
.lrc
  position absolute
  width 60%
  height 1.1rem
  left 20%
  text-align center
  overflow hidden
// 弹窗
.list-group
  display flex
  height .6rem
  align-items center
  .list-name
    margin-left .2rem
  .list-ar
    color grey
    font-size .24rem
.jindu
  display flex
  align-items center
  span
    width 1rem
    text-align center
    color white
  .bar-bg
    flex 1
    height 2px
    background-color #95a5a6
    position relative
    .active-bg
      background #ecf0f1
      position absolute
      height 2px
      width 10%
    .circle-bg
      position absolute
      width 8px
      height 8px
      border-radius 50%
      background #ecf0f1
      left 10%
      margin-top -3px

.danhang
  overflow: hidden
  text-overflow:ellipsis
  white-space: nowrap
@keyframes rotating {
  0%{
    transform rotateZ(0)
  }
  100%{
    transform rotateZ(360deg)
  }
}
.box
  position relative
  margin 1.5rem 0rem
  height 7rem
  .circle
    background url(https://icon.qiantucdn.com/20200509/55828113a162610d404cf3a52c1344492) no-repeat
    background-size 100%
    width 6rem
    height 0
    padding-bottom 6rem
    display flex
    justify-content center
    margin  0.8rem auto
    animation rotating 24s linear infinite
    transform-origin center
    img
      border 1px solid #000
      width 4rem
      height 4rem
      margin-top 1rem
      border-radius 50%
      overflow hidden
  .bang
    width 2rem
    position absolute
    left 50%
    background url(https://icon.qiantucdn.com/20200509/cad9247361c2677cb1287c6fd8f866c92) no-repeat
    background-size 100%
    height 0
    padding-bottom 3rem
    transition all .3s
    transform-origin top left
    z-index 2
    // &:hover
    //   transform rotate(-30deg)
.container
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background #7f8c8d
  z-index 10
  .top
    width 100%
    height 1rem
    display flex
    align-items center
    font-size .3rem
    color white
    p
      width 4rem
    i
      width 1rem
      text-align center
.footer
  width 100%
  .icon
    display flex
    li
      flex 1
      font-size .5rem
      color white
      text-align center
  .jindu
    width 90%
    margin  0 auto
    height .8rem
  .zan
    display flex
    li
      flex 1
      font-size .5rem
      color white
      text-align center
</style>
