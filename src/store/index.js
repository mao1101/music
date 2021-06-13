import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const usename = document.cookie.nickname ? document.cookie.nickname : ''
export default new Vuex.Store({
  state: {
    usename,
    showFull: false, // 控制全屏播放器
    openMini: false, // 控制迷你音乐播放器
    songsList: [], // 歌单列表
    idx: null, // 音乐索引
    getSongsUrl: { // 存储音乐变量
      play: false, // 控制开始按钮
      name: '', // 歌曲名字
      mp3: {}, // mp3的具体信息
      lrc: '' // 歌词数据
    }
  },
  mutations: {
    changeSt (state, name) { // 在mu中使用方法改变state的变量值
      state.showFull = true
      state.getSongsUrl.name = name
      state.openMini = false
    },
    closeF (state) { // 关闭全屏播放器
      state.showFull = false
      state.openMini = true
    },
    getSongsAudio (state, data) { // 存放音乐mp3
      state.getSongsUrl.play = true
      state.getSongsUrl.mp3 = data
    },
    getLrc (state, lrc) { // 存放音乐的歌词
      state.getSongsUrl.lrc = lrc
    },
    toFull (state) {
      state.openMini = false
      state.showFull = true
    },
    songsList (state, [songs, idx]) {
      state.songsList = songs
      state.idx = idx
    },
    index (state, i) {
      state.idx = i
    },
    nick (state, nick) { // cookies改变
      state.nickname = nick
    }
  },
  actions: {
    full (ctx, [id, name]) {
      ctx.commit('changeSt', name) // 传一个改变state的方法
      axios.get('/api/song/url?id=' + id).then((res) => { // 获取音乐Url
        // console.log(res)
        if (res.status === 200) {
          ctx.commit('getSongsAudio', res.data.data[0])
        }
      })
      axios.get('/api/lyric?id=' + id).then((res) => { // 获取歌词
        // console.log(res)
        if (res.status === 200) {
          ctx.commit('getLrc', res.data.lrc.lyric)
        }
      })
    }
  },
  modules: {
  }
})
