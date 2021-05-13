<template>
    <div v-if="getSongsUrl.play">
        <audio :src="getSongsUrl.mp3.url" autoplay></audio>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'audioPlay',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      getSongsUrl: 'getSongsUrl'
    })
  }
}
</script>
<style lang="stylus" scoped>

</style>
