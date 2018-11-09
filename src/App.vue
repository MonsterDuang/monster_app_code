<template>
  <div id="app">
    <transition name="animated">
        <router-view/>
    </transition>
    <audio :src="nowPlay.bitrate.show_link" ref="audio" @ended="audioEnd" @timeupdate='update' autoplay></audio>
    <div :class="{neight:isNeight}"></div>
    <div class="masked"></div>
  </div>
</template>
<script>
export default {
  name: 'app',
  computed: {
    nowPlay () {
      let nowPlay = this.$store.state.nowPlay
      if (nowPlay.bitrate !== undefined) {
        return nowPlay
      } else {
        return {
          bitrate: {}
        }
      }
    },
    isPlaying () {
      return this.$store.state.isPlaying
    },
    isNeight () {
      return this.$store.state.isNeight
    }
  },
  methods: {
    audioEnd () {
      this.$store.dispatch('changeNextSong')
    },
    update (data) {
      let nowTime = data.target.currentTime
      let percent = (nowTime / data.target.duration) * 100
      this.$store.dispatch('changePercent', percent)
      if (this.$route.path === '/songplay') {
        this.$store.dispatch('changeLrc', nowTime)
      }
    }
  },
  watch: {
    isPlaying (newValue) {
      let audio = this.$refs.audio
      if (newValue) {
        audio.play()
      } else {
        audio.pause()
      }
    }
  }
}
</script>
<style>
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.animated-enter-active {
  animation: slideInUp .3s
}
.animated-leave-active {
  animation: fadeOut .3s
}
.neight{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, .6);
  z-index: -1;
}
.masked{
  width: 100%;
  height: 100%;
  background: #000;
  opacity: .5;
  position: absolute;
  top: 0;
  display: none;
  z-index: 9
}
</style>
