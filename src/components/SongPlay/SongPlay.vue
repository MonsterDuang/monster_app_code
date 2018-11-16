<template>
  <v-touch class="Song" @pan="onPan" :style='{color: textColor, background: bgColor}'>
    <Spin size="large" fix v-if="hasNowPlay"></Spin>
    <div class="play">
      <span class="btn-img">
        <i-circle :percent="percent" :stroke-width='2' :trail-width='2' :stroke-color='strokeColor' stroke-linecap="round" style="width:100%;height:110%">
          <span class="demo-Circle-inner"></span>
        </i-circle>
        <img src="../../assets/images/play.png" alt="" @click="stop" v-show="isPlaying">
        <img src="../../assets/images/stop.png" alt="" @click="play" v-show="!isPlaying">
      </span>
      <div style="text-align:center">
        <p class="song-name">{{nowPlay.songinfo.title}}</p>
        <span class="singer">{{nowPlay.songinfo.author}}</span>
      </div>
    </div>
    <div class="lrc">
      <div class="lrc_scroll" id="lrc_scroll" :class="{'nolrc_scroll': noLrc || nowPlayLrc.length < 15, 'one_item': nowPlayLrc.length == 1 && nowPlayLrc[0][2].length > 100, 'lrc_scroll': !noLrc}">
        <div v-if='!noLrc' v-for="(item, index) in nowPlayLrc" :key="index" :style="item[3]" :id="item[1]" class="lrc_item">
          <pre v-if="item[1]" style="white-space: pre-wrap">{{item[2].replace(/(^\s*)|(\s*$)/g, "")}}</pre>
          <pre v-else style="white-space: pre-wrap">{{item[2].replace(/(^\s*)|(\s*$)/g, "")}}</pre>
        </div>
        <div v-if='noLrc'>{{noLrc}}</div>
      </div>
    </div>
    <div class="bottom-btn">
      <i class="iconfont icon-LC_icon_reload_line" @click="reload" :class='{opacity: nowPlayList === 6}'></i>
      <i class="iconfont icon-listview" @click="showSongList"></i>
    </div>
    <Drawer :closable="false" v-model="songList" :styles="{color: textColor, background: bgColor, padding: '10px'}">
      <div class="items" v-for="(item, index) in SongUrl" :key="item.id" @click="toPlay(index)">
        <p class="list"><span v-if="nowPlayId==index"><img src="../../assets/images/play.gif" width="15px" height="15px" alt=""></span><span v-else>{{index+1}}. </span></p>
        <p class="songInfo"><span>{{item.songinfo.title}}</span><span>{{item.songinfo.author}}</span></p>
      </div>
    </Drawer>
  </v-touch>
</template>
<script>
import api from '@/api'
export default {
  data () {
    return {
      strokeColor: '',
      textColor: '',
      bgColor: '',
      songList: false
    }
  },
  created () {
    let playList = this.$route.query.play_list
    let Url = ''
    switch (playList) {
      case 1:
        this.strokeColor = '#a86a27'
        this.textColor = 'rgba(213, 132, 42, 0.5)'
        this.bgColor = 'rgba(213, 132, 42, 0.1)'
        Url = api.new_song + Math.round(Math.random() * 99)
        break
      case 2:
        this.strokeColor = '#188a3f'
        this.textColor = 'rgba(23, 173, 75, 0.5)'
        this.bgColor = 'rgba(23, 173, 75, 0.1)'
        Url = api.hot_song + Math.round(Math.random() * 520)
        break
      case 3:
        this.strokeColor = '#281f72'
        this.textColor = 'rgba(45, 32, 142, 0.5)'
        this.bgColor = 'rgba(45, 32, 142, 0.1)'
        Url = api.eus_song + Math.round(Math.random() * 99)
        break
      case 4:
        this.strokeColor = '#9d0fbc'
        this.textColor = 'rgba(200, 10, 242, 0.5)'
        this.bgColor = 'rgba(200, 10, 242, 0.1)'
        Url = api.old_song + Math.round(Math.random() * 65)
        break
      case 5:
        this.strokeColor = '#9d1027'
        this.textColor = 'rgba(200, 12, 42, 0.5)'
        this.bgColor = 'rgba(200, 12, 42, 0.1)'
        Url = api.rock_song + Math.round(Math.random() * 89)
        break
      case 6:
        this.strokeColor = '#19b3b1'
        this.textColor = 'rgba(25, 179, 177, 0.5)'
        this.bgColor = 'rgba(25, 179, 177, 0.1)'
        break
    }
    if (this.nowPlayList !== playList && playList !== 6) {
      this.getData(playList, Url)
    }
  },
  computed: {
    nowPlay () {
      let nowPlay = this.$store.state.nowPlay
      if (nowPlay.songinfo !== undefined || nowPlay.bitrate !== undefined) {
        return nowPlay
      } else {
        return {
          songinfo: {},
          bitrate: {}
        }
      }
    },
    isPlaying () {
      return this.$store.state.isPlaying
    },
    percent () {
      return this.$store.state.percent
    },
    nowPlayList () {
      return this.$store.state.nowPlayList
    },
    nowPlayLrc: {
      get () {
        return this.$store.state.nowPlayLrc
      },
      set () {}
    },
    noLrc () {
      return this.$store.state.noLrc
    },
    hasNowPlay () {
      return this.$store.state.hasNowPlay
    },
    backHome () {
      return this.$store.state.backHome
    },
    SongUrl () {
      return this.$store.state.SongUrl
    },
    nowPlayId () {
      return this.$store.state.nowPlayId
    }
  },
  methods: {
    getData (playList, Url) {
      this.$store.dispatch('clearLrc')
      this.$store.dispatch('clearNoLrc')
      this.$store.dispatch('changeSpin')
      let data = {url: Url, play_list: playList}
      this.$store.dispatch('getSong', data)
      .then(res => {
        this.$store.dispatch('getSongUrl')
      }).then(res => {
        if (!this.isPlaying) {
          this.$store.commit('CHANGE_IS_PLAYING_TRUE')
        }
      })
    },
    play () {
      if (!this.isPlaying) {
        this.$store.commit('CHANGE_IS_PLAYING_TRUE')
      }
    },
    stop () {
      if (this.isPlaying) {
        this.$store.commit('CHANGE_IS_PLAYING_FALSE')
      }
    },
    onPan (value) {
      if (value.additionalEvent === 'panleft' && value.isFinal === true && value.deltaX < -100) {
        this.$store.dispatch('changeNextSong')
      } else if (value.additionalEvent === 'panright' && value.isFinal === true && value.deltaX > 100) {
        this.$store.dispatch('changeBeforeSong')
      }
    },
    showSongList () {
      this.songList = true
    },
    toPlay (index) {
      if (!this.isPlaying) {
        this.$store.commit('CHANGE_IS_PLAYING_TRUE')
      }
      this.songList = false
      this.$store.dispatch('toPlay', index)
    },
    reload () {
      if (this.nowPlayList !== 6) {
        this.$router.replace('/replacepage')
      }
    }
  }
}
</script>

<style scoped>
.Song{
  width: 100%;
  height: 100%;
}
.play{
  width: 100%;
  height: 40%;
  padding-top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.btn-img {
  width: 35%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.btn-img img{
  width: 100%;
}
.ivu-chart-circle{
  position: absolute;
  z-index: -1;
}
.song-name{
  font-size: 1.5rem;
}
.singer{
  font-size: .9rem
}
.lrc{
  width: 100%;;
  height: 50%;
  margin-top: 10px;
}
.lrc_scroll{
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 14px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 1.5rem
}
.nolrc_scroll{
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 1.5rem
}
.one_item{
  width: 100%;
  height: 100%;
  overflow: auto;
  font-size: 14px;
  display: inline-block;
  padding: 0 1.5rem
}
.lrc_item{
  text-align: center
}
.bottom-btn{
  width: 100%;
  height: 5%;
  position: absolute;
  bottom: 2%;
  padding: 0 2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.bottom-btn i{
  height: 100%;
  font-size: 2rem;
}
.bottom-btn i:last-of-type{
  font-size: 2.1rem
}
.opacity{
  opacity: 0.5;
}
.items{
  font-size: 12px;
  border-bottom: 1px solid #fff;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between
}
.items .songInfo{
  width: 90%;
  display: flex;
  justify-content: space-between;
  flex-direction: column
}
.items .songInfo span{
  font-size: 14px;
  display: inline-block;
  width: 100%;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
}
.items .songInfo span:last-of-type{
  font-size: 12px
}
</style>
