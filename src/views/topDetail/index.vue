<template>
    <div>
        <div class="top" :style='{"background-image":"url("+detailTop.coverImgUrl+")","backgroundSize":"100%"}'>
          <div
            class="topbg"
          >
          <p class="top-arr">
            <van-icon name="arrow-left" @click="goback()"/>
            <van-icon name="search"/>
          </p>
          <span class="top-wu">{{day}}更新</span>
          </div>
        </div>
        <div class="all-list">
          <p class="all" v-if="detailTop.tracks">
            <van-icon name="play-circle" class="tubo"/>
            <span>播放全部</span>
            <span class="len" v-if="detailTop">({{detailTop.tracks.length}})</span>
          </p>
          <ul>
            <li class="songs-list"
              v-for="(item, index) in detailTop.tracks"
              :key="index"
              @click="showFull(item.id,item.name)"
            >
              <span class="in">{{index + 1}}</span>
              <div class="ar-na">
                <p class="list-name lins">{{item.name}}</p>
                <p class="jianj">{{item.ar[0].name}}</p>
              </div>
            </li>
          </ul>
        </div>
    </div>
</template>
<script>
export default {
  name: 'topDetail',
  data () {
    return {
      detailTop: {}
    }
  },
  methods: {
    goback () { // 点击箭头返回上一级
      this.$router.go(-1)
    },
    showFull (id, name) { // 不能在这个地方请求mp3地址
    // 需要开启全屏播放器
      this.$store.dispatch('full', { id, name })
    },
    getResult () {
      const url = `/api/playlist/detail?id=${this.$route.params.id}`
      this.axios.get(url).then((res) => {
        // console.log(res)
        if (res.status === 200) {
          this.detailTop = res.data.playlist
        }
      }).catch((err) => {
        console.log(err)
      });
    }
  },
  mounted () {
    this.getResult()
  },
  computed: {
    day () {
      const Mou = new Date().getMonth() + 1
      const ri = new Date().getDate()
      const date = Mou + '月' + ri + '日'
      return date
    }
  }
}
</script>
<style lang="stylus" scoped>
// 单行省略号
.lins
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
.top
  width 100%
  height 5.5rem
  position relative
  .topbg
    width 100%
    height 100%
    .top-arr
      display flex
      justify-content space-between
      font-size .5rem
      color white
      width 100%
      height 1rem
      align-items center
      i
        width 1rem
        text-align center
    .top-wu
      color white
      font-size .3rem
      position absolute
      left 35%
      bottom .4rem
.all-list
  .all
    width 100%
    height 1rem
    display flex
    align-items center
    font-size .3rem
    .tubo
      color red
      margin 0rem .2rem
    .len
      margin 0rem .2rem
      color grey
  .songs-list
    width 100%
    height 1rem
    margin .2rem 0rem
    display flex
    align-items center
    .in
      width 1.4rem
      text-align center
      color balck
      font-size .34rem
  .songs-list:nth-child(-n+3) .in
      color red
    .ar-na
      width 4rem
      // display flex
      // flex-direction column
      .list-name
        font-size .34rem
        margin-bottom .2rem
      .jianj
        color grey
</style>
