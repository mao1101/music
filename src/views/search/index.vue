<template>
    <div>
        <!-- 头部 -->
        <van-row class="top">
            <van-col class="left" @click="goBack()" span="4"><van-icon name="arrow-left" /></van-col>
            <van-col span="20"><input class="sear" type="text" v-model="inpVal" placeholder="歌曲名" /></van-col>
            <div class="sousuo" ref="sousuo">
              <ul>
                <li
                v-for="(item, index) in searchSongs"
                :key="index"
                @click="toDetail(item.name)"
                @blur="shi()"
                ref="li"
                >
                <van-icon name="search" />
                {{item.name}}
                </li>
              </ul>
            </div>
        </van-row>
        <!-- 历史记录 -->
        <div class="history">
            <div class="left-tex">历史</div>
            <div class="tex-wrap" ref="history">
                <!-- <span class="inner-tex">三个</span> -->
                <!-- <span class="inner-tex">三个</span>
                <span class="inner-tex">三个</span> -->
            </div>
            <div class="del"><van-icon name="delete-o" /></div>
        </div>
        <!-- 热搜榜 -->
        <div class="hot-search">
            <h3>热搜榜</h3>
            <ul class="hS-list">
                <li
                v-for="(item, index) in hotList" :key="index"
                >
                    <span class="index" :style="{'color' : index < 3 ? 'red' : ''}">{{index + 1}}</span>
                    <span class="text danhang" v-text="isShow ? item.first : item.searchWord "></span>
                    <span class="hot" v-if="index < 3">HOT</span>
                </li>
                 <p class="more-hot" @click="morehot()" v-show="isShow">
                  展开更多热搜
                </p>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  name: 'search',
  data () {
    return {
      inpVal: '',
      hotList: [], // 热门歌曲,
      searchSongs: [],
      isShow: true
    }
  },
  methods: {
    shi () {
      this.$refs.history.html('<span class="inner-tex">' + this.inpVal + '</span>')
    },
    toDetail (n) { // 点击搜索歌曲传递歌曲名字到搜索详情页
      this.$router.push({ name: 'searchSong', params: { name: n }  })
    },
    morehot () { // 点击更多热搜展开数据
      this.isShow = false
      this.axios.get('/api/search/hot/detail').then((res) => {
        if (res.status === 200) {
          this.hotList = res.data.data
        }
      })
    },
    goBack () { // 返回上一级
      this.$router.go(-1)
    },
    getHot () {
      this.axios.get('/api/search/hot').then((res) => {
        // console.log(res)
        if (res.status === 200) {
          this.hotList = res.data.result.hots
        }
      })
    },
    getSearch () {
      this.axios.get('/api/search/suggest?keywords=' + this.inpVal).then((res) => {
        console.log(res)
        if (res.status === 200) {
          this.searchSongs = res.data.result.songs
        }
      }).catch((err) => {
        console.log(err)
      });
    }
  },
  mounted () {
    this.getHot()
  },
  watch: {
    inpVal () {
      this.$refs.sousuo.style.display = 'block'
      this.getSearch()
      if (this.inpVal === '') {
        this.$refs.sousuo.style.display = 'none'
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
// 单行省略号
.danhang
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap
.sousuo
  width 100%
  padding .3rem
  background-color white
  position absolute
  top 1rem
  z-index 33
  display none
  h2
    font-size .3rem
    color grey
  ul
    li
      line-height .8rem
      i
        margin 0rem .2rem
// 热搜
.hot-search
  padding .3rem
  box-sizing border-box
  h3
    font-size .3rem
    font-weight bolder
    padding-bottom .2rem
    border-bottom 1px solid #ccc
  .hS-list
    display flex
    flex-wrap wrap
    .more-hot
      width 100%
      color grey
      text-align center
      margin-top .2rem
    li
      width 50%
      font-size .3rem
      height .8rem
      display flex
      align-items center
      .index
        display inline-block
        font-size .35rem
        width .4rem
        text-align center
      .text
        display inline-block
        margin 0 .1rem
        width 1.5rem
      .hot
        font-style italic
        color red
        font-weight bold
// 历史记录
.history
  padding .3rem
  display flex
  align-items center
  .left-tex,.del
    // padding 0 .2rem
    font-size .3rem
    font-weight bolder
  .del
    font-size .4rem
  .tex-wrap
    flex 1
    display flex
    // justify-content space-around
    span
      padding .1rem .2rem
      color #333
      background-color #ccc
      border-radius .2rem
      margin-left .4rem
// 头部
.top
  width 100%
  height 1rem
  display flex
  align-items center
  position relative
  box-sizing border-box
  .left
    font-size .4rem
    text-align center
    // color white
  .sear
    border none
    outline none
    border-bottom 1px solid #ccc
    width 82%
    height .8rem
    line-height .8rem
// #app
//   box-sizing border-box
</style>
