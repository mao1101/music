<template>
    <div>
        选择登录方式
        <p @click="tel()">手机登录</p>
        <p>邮箱登录</p>
        <p>二维码登录</p>
    </div>
</template>
<script>
export default {
  name: 'choose',
  methods: {
    tel () {
      this.$router.push('/tel')
    }
  }
}
</script>
