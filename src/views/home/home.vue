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
                <div class="block-img">
                    <!-- 第一个图片上的日期 -->
                    <div class="dt" v-show="index == 0">{{day}}</div>
                    <img :src="item.iconUrl" alt="" srcset="">
                </div>
                <p class="block-name">{{item.name}}</p>
              </swiper-slide>
            </swiper>
        </div>
        <!-- 推荐歌单 -->
    </div>
</template>
<script>
export default {
  name: 'foundIndex',
  data () {
    return {
      value: '',
      listBanner: [],
      swiperInner: [],
      swiperOption: {
        slidesPerView: 5.4,
        // spaceBetween: 1,
        freeMode: true
      }
    }
  },
  methods: {
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
  }
}
</script>
<style lang="stylus" scoped>
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
