<template>
    <div>
        <p>请输入手机号</p>
        <p>+86 <input type="text" v-model="tel"></p>
        <p>密码 <input type="password" v-model="psd" @keyup.13="verification()"></p>
    </div>
</template>
<script>
export default {
  name: 'choose',
  data () {
    return {
      tel: '',
      psd: ''
    }
  },
  methods: {
    verification () {
      this.$toast('验证中')
      this.axios.get('/api/login/cellphone?phone=' + this.tel + '&password=' + this.psd).then((res) => {
        if (res.data.code === 200) {
          console.log(res);
          this.$toast('验证成功')
          //   跳转首页，存储用户数据，让app知道已经登陆
          // 一直保持登录状态： 本地存储
          // 想要保持某时间段登录有效 cookies
          this.$router.push('/')
          const end = 3 * 24 * 60 * 60 * 1000
          const time = new Date()
          time.setTime(time.getTime() + end) // 设置时间
          document.cookie = 'nickname' + res.data.profile.nickname + ';expires= ' + time.toGMTString()
          this.$store.commit('nick', res.data.profile.nickname)
        } else {
          this.$toast('信息错误')
        }
      })
    }
  }
}
</script>
