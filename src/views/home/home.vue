<template>
    <div id="foundIndex">
        <!-- 头部搜索 -->
        <van-row class="top">
        <van-col span="5" class="top-san"><van-icon name="wap-nav" /></van-col>
        <van-col span="19"><van-search
                    v-model="value"
                    shape="round"
                    placeholder="请输入搜索关键词"
                    /></van-col>
        </van-row>
        <!-- banner -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item
           v-for="item in listBanner"
           :key="item.id"
        >
        <img class="bannerImg" :src="item.imageUrl" alt="" srcset="">
        </van-swipe-item>
        </van-swipe>
        <!-- 每日推荐滑块 -->
        <div class="inner">
            <swiper class="swiper" :options='swiperOption'>
              <swiper-slide
                v-for="(item, index) in swiperInner"
                :key="item.id"
                class="inner-block"
              >
                <div class="block-img"
                  @click="toTop(index)"
                >
                    <!-- 第一个图片上的日期 -->
                    <div class="dt" v-show="index == 0">{{day}}</div>
                    <img :src="item.iconUrl" alt="" srcset="">
                </div>
                <p class="block-name">{{item.name}}</p>
              </swiper-slide>
            </swiper>
        </div>
        <!-- 推荐歌单 -->
        <div class="tui-song">
          <div class="tui-top">
            <h2>推荐歌单</h2>
            <p>更多<van-icon name="arrow" /></p>
          </div>
          <swiper class="swiper2" :options="swiperOption2">
            <swiper-slide class="tuidan" v-for="(item, index) in swiperTui" :key="index">
              <div class="tuijian-img">
                <p class="songNum"><van-icon name="play-circle-o" />{{item.playCount | numberFormat}}</p>
                 <img :src="item.picUrl" alt="" srcset="">
              </div>
              <p class="tuidan-zi">
                {{item.name}}
              </p>
              </swiper-slide>
          </swiper>
        </div>

           <!-- 排行榜 -->
        <div class="tui-song1">
          <div class="tui-top">
            <h2>排行榜</h2>
            <p>更多<van-icon name="arrow" /></p>
          </div>
          <swiper class="swiper2" :options="swiperOption3">
            <swiper-slide class="tuidan"
              v-for="(item, index) in getTopval"
              :key="index"
            >
            <!-- 排行榜音乐 -->
            <div class="pai">
              <div>
                <h3>{{item.name}}<van-icon name="arrow" /></h3>
                <div
                class="topsongs"
                v-for="(items, index) in getTopsongs[index]" :key="index"
                >
                <van-icon name="play" class="play" />
                <img :src="items.al.picUrl" alt="" srcset="">
                <p>
                  <span class="xia">{{index + 1}}</span>
                  <span class="songsname">{{items.al.name}}</span>
                  <span class="ar">-{{items.ar[0].name}}</span>
                </p>
                </div>
                </div>
            </div>
              </swiper-slide>
          </swiper>
        </div>

        <!-- 新歌新碟专辑 -->
        <div class="newsongs">
          <div class="newsongs-title">
            <h3>
            <span class="newsongs" @click="change()" ref="song" :index=0 :class="{ colorActive: flag === 0}">新歌</span>
            <span class="row">|</span>
            <span class="newdie" @click="change()" ref="song" :index=1 :class="{ colorActive: flag === 1}">新碟</span>
            <span class="row">|</span>
            <span class="numji" @click="change()" ref="song" :index=2 :class="{ colorActive: flag === 2}">数字专辑</span>
            </h3>
            <p>更多<van-icon name="arrow" /></p>
          </div>
          <!-- 新歌对应 -->
         <div class="noesongsswiper" v-show="flag === 0">
           <swiper class="swiper2" :options="swiperOption4">
            <swiper-slide class="newsongs-swiper"
              v-for="(item, index) in 2"
              :key="index"
            >
            <div
                class="newTop"
                v-for="(list, i) in newsongs[index]" :key="i"
                >
                <!-- <van-icon name="play" class="play" /> -->
                <img :src="list.picUrl" alt="" srcset="">
                <p>
                  <span class="songsname">{{list.name}}</span>
                  <span class="ar">-{{list.song.artists[0].name}}</span>
                </p>
                </div>
              </swiper-slide>
          </swiper>
        </div>
        <!-- 新歌新碟专辑 -->
        <div class="noesongsswiper" v-show="flag === 1">
           <swiper class="swiper2" :options="swiperOption4">
            <swiper-slide class="newsongs-swiper"
              v-for="(item, index) in 2"
              :key="index"
            >
            <div
                class="newTop"
                v-for="(list, i) in newdie[index]" :key="i"
                >
                <!-- <van-icon name="play" class="play" /> -->
                <img :src="list.blurPicUrl" alt="" srcset="">
                <p>
                  <span class="songsname">{{list.name}}</span>
                  <span class="ar">-{{list.artists[0].name}}</span>
                </p>
                </div>
              </swiper-slide>
          </swiper>
        </div>
        <!-- 数字专辑 -->
        <div class="noesongsswiper" v-show="flag === 2">
           <swiper class="swiper2" :options="swiperOption4">
            <swiper-slide class="newsongs-swiper"
              v-for="(item, index) in 2"
              :key="index"
            >
            <div
                class="newTop"
                v-for="(list, i) in numji[index]" :key="i"
                >
                <!-- <van-icon name="play" class="play" /> -->
                <img :src="list.coverUrl" alt="" srcset="">
                <p>
                  <span class="songsname">{{list.albumName}}</span>
                  <span class="ar">-{{list.artistName}}</span>
                </p>
                </div>
              </swiper-slide>
          </swiper>
        </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'foundIndex',
  data () {
    return {
      value: '',
      flag: 0,
      listBanner: [], // 存储获取的轮播图
      swiperInner: [], // 存储获取的首页圆形图标
      getTopval: [], // 排行榜歌曲
      getTopsongs: [], // 获取排行榜三首歌曲
      newsongs: [], // 获取新歌数据
      newdie: [], // 获取新碟数据
      numji: [], // 获取数字专辑数据
      swiperOption: {
        slidesPerView: 5.4,
        freeMode: true
      },
      swiperTui: [], // 存储获取的推荐歌单
      swiperOption2: {
        slidesPerView: 3,
        spaceBetween: 10,
        slidesPerGroup: 3
      },
      swiperOption3: {
        slidesPerView: 1.1,
        spaceBetween: 10,
        slidesPerGroup: 1
      },
      swiperOption4: {
        slidesPerView: 1,
        spaceBetween: 10,
        slidesPerGroup: 1
      }
    }
  },
  filters: { // 过滤器 播放量
    numberFormat: function (val) {
      var k = 10000
      var i = ''
      let unit = ''
      var size = ['', '万', '亿', '万亿']
      if (val > k) {
        i = Math.floor(Math.log(val) / Math.log(k))
        val = ((val / Math.pow(k, i))).toFixed(0)
        unit = size[i]
      }
      return val + unit
    }
  },
  methods: {
    toTop (index) { // 点击圆形图标跳转到相应页面
      switch (index) {
        case 0:
          // 每日推荐页面
          break
        case 3:
          // 下标为3跳转到排行榜
          this.$router.push({ name: 'topSongs' })
          break;
        default:
          break;
      }
    },
    change (e) { // 点击新歌新碟切换
      e = e || window.event
      // console.log(e.target.attributes.index.value) // 获取标签上绑定的index
      this.flag = parseInt(e.target.attributes.index.value)
    },
    getBanner () { // 获取banner数据的
      this.axios.get('/api/banner').then((res) => {
        console.log(res)
        if (res.status === 200) {
          this.listBanner = res.data.banners
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getInner () { // 获取圆形图标列表
      this.axios.get('/api/homepage/dragon/ball').then((res) => {
        console.log(res)
        if (res.status === 200) {
          this.swiperInner = res.data.data
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getTuisong () { // 获取推荐歌单
      this.axios.get('/api/personalized?limit=30').then((res) => {
        console.log(res)
        if (res.status === 200) {
          // this.swiperTui = res.data.result
          while (this.swiperTui.length < 6) {
            const num = parseInt(Math.random() * 30)
            if (this.swiperTui.indexOf(res.data.result[num]) === -1) {
              this.swiperTui.push(res.data.result[num])
            }
          }
        }
      }).catch((err) => {
        console.log(err)
      });
    },
    getTop () { // 获取排行榜
      this.axios.get('/api/toplist').then((res) => {
        // console.log(res.data.list.slice(0, 6)[0].id)
        if (res.status === 200) {
          this.getTopval = res.data.list.slice(0, 6)
          this.getTopval.map((val, index) => {
            if (index === 4) {
              this.getTopval.splice(4, 1)
            }
            this.axios.get('/api/playlist/detail?id=' + val.id).then((result) => {
              this.getTopsongs.push(result.data.playlist.tracks.slice(0, 3))
              // console.log(this.getTopsongs)
            }).catch((err) => {
              console.log(err)
            });
          })
        }
      }).catch((err) => {
        console.log(err)
      });
    },
    getNewSongs () { // 新歌
      this.axios.get('/api/personalized/newsong?limit=6').then((result) => {
        console.log(result)
        if (result.status === 200) {
          // this.newsongs = result.data.result
          this.newsongs.push(result.data.result.slice(0, 3))
          this.newsongs.push(result.data.result.slice(3))
        }
      })
    },
    getNewdie () { // 新碟
      this.axios.get('/api/top/album?offset=0&limit=6&type=hot&area=ZH').then((result) => {
        console.log(result)
        if (result.status === 200) {
          this.newdie.push(result.data.monthData.slice(0, 3))
          this.newdie.push(result.data.monthData.slice(3, 6))
        }
      })
    },
    getNewnum () { // 数字专辑
      this.axios.get('/api/album/list?limit=6').then((result) => {
        console.log(result)
        if (result.status === 200) {
          this.numji.push(result.data.products.slice(0, 3))
          this.numji.push(result.data.products.slice(3))
        }
      })
    }
  },
  computed: {
    day () {
      const dt = new Date().getDate()
      return dt
    }
  },
  mounted () {
    this.getBanner()
    this.getInner()
    this.getTuisong()
    this.getTop()
    this.getNewSongs()
    this.getNewdie()
    this.getNewnum()
  }
}
</script>
<style lang="stylus" scoped>
// 新歌新碟专辑
.newsongs
  margin-top .2rem
  .newsongs-title
    margin-left .2rem
    font-size .34rem
    display flex
    justify-content space-between
    span
     margin 0rem .1rem
     color grey
    .colorActive
      color black
      font-weight bold
    .row
      color grey
      font-size .2rem
    p
      font-size 0.2rem
      margin-right .2rem
      padding .1rem .2rem
      border 1px solid #e8e8e8
      border-radius 20%
.newsongs-swiper
  margin-left .2rem
  .newTop
    display flex
    margin .1rem 0rem
    align-items center
    img
      width 1rem
      border-radius 5px
      margin-right .2rem
    .ar
      fonsise .2rem
      color grey
      margin-left .1rem
      display inline-block
      width: 1.5rem
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
// 排行榜歌曲
.tui-song1
  border-top 1px solid #e8e8e8
  border-bottom 1px solid #e8e8e8
  margin-top .2rem
  .tui-top
    width 100%
    height 1rem
    display flex
    align-items center
    justify-content space-between
    h2
      margin-left .2rem
      font-weight bolder
    p
      font-size 0.2rem
      margin-right .2rem
      padding .1rem .2rem
      border 1px solid #e8e8e8
      border-radius 20%
  .topsongs
    width 100%
    height .8rem
    display flex
    padding .2rem
    align-items center
    position relative
    .play
      position absolute
      left .45rem
      color white
      fonsize .7rem
    img
      width .8rem
      border-radius .1rem
    p
      .xia
        margin 0rem .2rem
        font-weight bold
    .songsname
        display inline-block
        width: 3rem
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
    .ar
      fonsise .2rem
      color grey
      margin-left .1rem
      display inline-block
      width: 1.5rem
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
// 排行榜
.pai
  margin-top .2rem
  border 1px solid #e8e8e8
  box-shadow 0px 0px 5px 5px #e8e8e8
  margin-left .2rem
  border-radius .3rem
  margin-bottom .2rem
  h3
    text-align center
    margin-top .2rem
    font-size .3rem
    font-weight bold
// 推荐歌单
.tui-song
  margin-bottom .2rem
  .tui-top
    width 100%
    height 1rem
    display flex
    align-items center
    justify-content space-between
    h2
      margin-left .2rem
      font-weight bolder
    p
      font-size 0.2rem
      margin-right .2rem
      padding .1rem .2rem
      border 1px solid #e8e8e8
      border-radius 20%
  .swiper2
    margin-left .2rem
    .tuidan
      height 3rem
      .tuijian-img
        width 100%
        position relative
        .songNum
          position absolute
          right .2rem
          top .1rem
          color white
          font-size .22rem
          background-color rgba(0,0,0,0.2)
          padding .1rem .1rem
          border-radius 30%
        img
          width 100%
          height 100%
          border-radius .3rem
      .tuidan-zi
        font-size .24rem
        display: -webkit-box
        -webkit-box-orient: vertical
        -webkit-line-clamp: 2
        overflow: hidden
        margin-top .1rem
        margin-bottom .2rem
// 头部
.top
  width 100%
  display flex
  align-items center
  justify-content center
  .top-san
    display flex
    align-items center
    justify-content center
// banner
.my-swipe
  width 90%
  margin 0 auto
  border-radius 15px
  overflow hidden
  .bannerImg
    width 100%
    height auto
// 圆形列表
.inner
  height 2rem
  border-bottom 1px solid #e8e8e8
  .swiper-container
    height 100%
    .inner-block
      height 100%
      display flex
      flex-direction column
      justify-content center
      align-items center
      .block-img
        width 1rem
        height 1rem
        border-radius 50%
        background-color #FEF1F6
        display flex
        align-items center
        justify-content center
        position relative
        .dt
          position absolute
          left 33%
          font-size 0.24rem
          margin-top .1rem
          color red
        img
          width 80%
          border-radius 50%
          background-color red
      .block-name
        font-size 0.2rem
        color rgba(0,0,0,0.9)
        margin-top 0.1rem
</style>
