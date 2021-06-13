<template>
    <div>
         <!-- 头部 -->
        <van-row class="top">
            <van-col class="left" @click= 'toGo()' span="4"><van-icon name="arrow-left" /></van-col>
            <van-col span="20"><input class="sear" type="text" v-model="inpVal" placeholder="歌曲名" /></van-col>
        </van-row>
        <!-- tab标签栏 -->
        <van-tabs>
            <van-tab title="综合">
                <!-- 你可能感兴趣的 -->
                <div class="interested">
                    <p>你可能感兴趣</p>
                    <ul class="box">
                        <li class="box-see">
                            <img src="" alt="" srcset="">
                            <div class="see-right">
                                <p>歌单</p>
                                <p>歌曲</p>
                            </div>
                        </li>
                        <li class="box-see">
                            <img src="" alt="" srcset="">
                            <div class="see-right">
                                <p>歌单</p>
                                <p>歌曲</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- 单曲 -->
                <div class="singles">
                    <div class="singles-top">
                        <h3>单曲</h3>
                        <p><van-icon name="play" />播放</p>
                    </div>
                    <div
                    class="songsList"
                    v-for="(item, index) in deailSong"
                    :key="index"
                    @click="toFull(item.id, item.name, index)"
                    >
                        <p class="list-name">{{item.name}}</p>
                        <p class="list-ar">{{item.artists[0].name}}</p>
                    </div>
                </div>
            </van-tab>
            <van-tab title="单曲"></van-tab>
            <van-tab title="歌单"></van-tab>
            <van-tab title="视频"></van-tab>
            <van-tab title="歌手"></van-tab>
            <van-tab title="播单"></van-tab>
        </van-tabs>
    </div>
</template>
<script>
// import bus from '@/bus.js'
export default {
  name: 'searchSong',
  data () {
    return {
      inpVal: this.$route.query.n,
      deailSong: []
    }
  },
  methods: {
    toGo () {
      this.$router.go(-1)
    },
    toFull (id, name, i) { // 点击歌曲打开全屏播放器
      this.$store.dispatch('full', [id, name])
      this.$store.commit('songsList', [this.deailSong, i])
      this.$store.commit('index', i) // 点击的下标
    },
    getS () { // 请求搜索关键字。搜索歌曲的详情页面
      this.axios('/api/search?keywords= ' + this.$route.params.name).then((res) => {
        console.log(res)
        if (res.status === 200) {
          this.deailSong = res.data.result.songs
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getS()
  }
}
</script>
<style lang="stylus" scoped>
// 单曲
.singles
  padding .2rem
  margin .2rem .3rem
  background-color #FDFDFD
  .singles-top
    display flex
    justify-content space-between
    padding .3rem 0rem
    border-bottom 1px solid #F0F0F0
    h3
      font-size .35rem
      font-weight bold
    p
      font-size .12rem
      padding .1rem .2rem
      border 1px solid grey
      border-radius .2rem
  .songsList
    padding .5rem 0rem
    border-bottom 1px solid #F0F0F0
    .list-name
      color #456172
      font-size .34rem
      margin-bottom .1rem
    .list-ar
      color grey
// 感兴趣
.interested
  padding .2rem
  margin .2rem
  background-color #FDFDFD
  >p
    color grey

// 头部
.top
  width 100%
  height 1rem
  display flex
  align-items center
  .left
    font-size .4rem
    text-align center
    // color white
  .sear
    border none
    outline none
    border-bottom 1px solid #ccc
    width 100%
    height .8rem
    line-height .8rem
</style>
