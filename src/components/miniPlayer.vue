<template>
    <div class="mini" v-if="openMini" @click="toFull()">
        迷你版播放器
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'miniPlayer',
  data () {
    return {
    }
  },
  methods: {
    ...mapMutations(['toFull']) // 点击mini打开全屏
  },
  computed: {
    ...mapState({
      openMini: 'openMini'
    })
  }
}
</script>
<style lang="stylus" scoped>
.mini
  width 100%
  height 1rem
  background-color #e8e8e8
  position fixed
  left 0
  bottom 0
  z-index 11
</style>
