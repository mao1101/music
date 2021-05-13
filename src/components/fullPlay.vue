<template>
    <div class="container" v-if="isShowFull">
        <div class="top">
            <van-icon name="arrow-left" @click="closeF()"/>
            <p>{{getSongsUrl.name}}</p>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'fullPlay',
  data () {
    return {
    }
  },
  methods: {
    ...mapMutations(['closeF']) // 调用仓库里全屏播放器页面的关闭方法
  },
  computed: {
    ...mapState({
      isShowFull: 'showFull', // 控制全屏播放器的显示
      getSongsUrl: 'getSongsUrl'
    })
  },
  mounted () {
  }
}
</script>
<style lang="stylus" scoped>
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
    font-size .4rem
    color white
    i
      width 1rem
      text-align center
</style>
