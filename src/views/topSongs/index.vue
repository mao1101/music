<template>
    <div id="topSongs">
      <!-- 头部 -->
      <van-nav-bar
        title="排行榜"
        left-text=""
        left-arrow
        @click-left="onClickLeft"
        />
        <!-- 官方精选排序 -->
        <div id="listTitle">
            <van-tabs scrollspy>
                <van-tab title="官方榜">
                    <!-- 内容 -->
                    <div class="container">
                        <h3 class="offer">官方榜</h3>
                        <ul class="box">
                            <li
                              v-for="(item, index) in offerNum"
                              :key="index"
                              @click="toTopDetail(item.id, item.name)"
                            >
                                <div class="left-item">
                                    <p class="li-title">{{item.name}}</p>
                                    <img :src="item.coverImgUrl" alt="" srcset="">
                                </div>
                                <div class="right-item">
                                    <p class="detail danhang"
                                     v-for="(list, i) in item.tracks"
                                     :key="i"
                                    >
                                        <span class="index">{{i+1}}</span>
                                        <span class="name">{{list.first}}</span>
                                        <span class="ar">-{{list.second}}</span>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </van-tab>

                <van-tab title="精选">
                    <!-- 内容 -->
                    <div class="container">
                        <h3>精选榜</h3>
                        <ul class="box">
                            <li>
                                <div class="left-item">
                                    <p class="li-title"></p>
                                    <img src="" alt="" srcset="">
                                </div>
                                <div class="right-item">
                                    <p class="detail">
                                        <span class="index">1</span>
                                        <span class="name"></span>
                                        <span class="ar"></span>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </van-tab>
                <van-tab title="曲风"></van-tab>
                <van-tab title="全球"></van-tab>
                <van-tab title="Mv"></van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>
export default {
  name: 'topSongs',
  computed: {
    offerNum () {
      const list = this.topsongsList.slice(0, 4)
      return list
    }
  },
  data () {
    return {
      topsongsList: []
    }
  },
  methods: {
    onClickLeft () { // 点击返回
      this.$router.go(-1)
    },
    toTopDetail (id, name) { // 动态路由匹配榜单详情
      this.$router.push({ name: 'topDetail', params: { id, name } })
    },
    getTopList () {
      this.axios.get('/api/toplist/detail').then((res) => {
        // console.log(res)
        if (res.status === 200) {
          this.topsongsList = res.data.list
        }
      }).catch((err) => {
        console.log(err)
      });
    }
  },
  mounted () {
    this.getTopList()
  }
}
</script>
<style lang="stylus" scoped>
// 单行省略号
.danhang
  overflow: hidden
  text-overflow:ellipsis
  white-space: nowrap
.container
  padding .3rem
.offer
  font-size .4rem
  font-weight bolder
.box
  padding .2rem 0rem
.box li:nth-child(2n)
    background-color #E1E9EC
  li
    display flex
    padding .2rem
    align-items center
    background #F3E2E8
    margin .2rem 0rem
    border-radius 10px
  .left-item
    margin-right .2rem
    img
      width 1rem
      margin-top .2rem
    .li-title
      font-size .34rem
      font-weight bold
  .right-item
    .detail
      margin .2rem 0rem
      width 4.4rem
      .index
        margin 0rem .2rem
      .ar
        font-size .2rem
        color grey

</style>
