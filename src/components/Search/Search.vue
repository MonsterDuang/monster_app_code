<template>
  <div class="Search">
    <header>
      <input type="text" @keyup="bindsearch" ref='search' autofocus placeholder="歌手、歌曲名">
      <router-link :to="{path: '/songplay', query: {play_list: 6}}" tag="span" class="isPlay" v-show="nowPlayList === 6 && percent !== 0"><img src="../../assets/images/play.gif" alt=""></router-link>
    </header>
    <Spin size="large" fix v-if="searchBol"></Spin>
    <div class="empty" style="text-align: center" v-if="searchList.length === 0">
      <img src="../../assets/images/logo_.png" alt="">
      <p class="slogan">To me</p>
      <p class="slogan">Past is black and white</p>
      <p class="slogan">But the future is always color</p>
    </div>
    <div class="SongList" v-else>
      <div class="song-list" v-for="(item,index) in searchList" :key="item.id" @click="searchToPlay(item.song_id)">
        <p class="count">
          <span class="list-icon">{{index+1}}</span>
        </p>
        <div class="song-msg">
          <p class="song-name">
            {{item.title.split(/<.*?>/ig)[0]}}<b class="highlight">{{item.title.split(/<.*?>/ig)[1]}}</b>{{item.title.split(/<.*?>/ig)[2]}}
          </p>
          <span class="singer">
            {{item.author.split(/<.*?>/ig)[0]}}<b class="highlight">{{item.author.split(/<.*?>/ig)[1]}}</b>{{item.author.split(/<.*?>/ig)[2]}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import http from 'axios'
import api from '@/api'
export default {
  data () {
    return {
      searchBol: false
    }
  },
  created () {
    this.$store.commit('SEARCH_LIST')
  },
  methods: {
    bindsearch (e) {
      if (e.keyCode === 13) {
        this.searchBol = true
        let url = api.search + this.$refs.search.value
        http.get(url).then(res => {
          this.$store.commit('SAVE_SONG_ID', res.data.song_list)
          this.$refs.search.blur()
          this.searchBol = false
        }).catch(res => {
          if (res) {
            this.$msg('提示', '搜索失败或网络不佳')
            this.$refs.search.blur()
            this.searchBol = false
          }
        }).then(res => {
          this.$store.dispatch('getSongUrl')
        })
      }
    },
    searchToPlay (songId) {
      this.$store.dispatch('searchToPlay', songId)
      this.$store.dispatch('changeSpin')
      if (!this.isPlaying) {
        this.$store.commit('CHANGE_IS_PLAYING_TRUE')
      }
      this.$router.push({path: '/songplay', query: {play_list: 6}})
    }
  },
  computed: {
    nowPlayList () {
      return this.$store.state.nowPlayList
    },
    percent () {
      return this.$store.state.percent
    },
    searchList () {
      return this.$store.state.searchList
    },
    isPlaying () {
      return this.$store.state.isPlaying
    }
  }
}
</script>
<style scoped>
.Search{
  width: 100%;
  height: 100%;
  background: #dee8e8;
}
header {
  width: 100%;
  height: 50px;
  border-bottom: #666 1px solid;
  position: fixed;
}
header > input {
  width: 80%;
  height: 80%;
  position: absolute;
  top: 10%;
  left: 10%;
  outline: none;
  text-indent: 1em;
  border-left: none;
  border-top: none;
  border-right: none;
  border-bottom: #000 1px solid;
  background: #dee8e8;
  color: #000;
  text-align: center;
  font-size: .9rem
}
.isPlay{
  height: 60%;
  position: absolute;
  top: 20%;
  right: 3%;
}
.empty,
.SongList{
  width: 100%;
  position: absolute;
  top: 50px;
  bottom: 0;
  overflow-y: auto;
  padding: 2%;
}
.empty > img {
  width: 40%;
}
.slogan{
  color:#fff;
  font-size: 1.3rem;
  line-height: 2.5rem
}
.song-list{
  width: 96%;
  height: 55px;
  padding: 2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: #fff 1px solid;
}
.count{
  width: 5%;
  height: 100%;
  text-align: center;
  line-height: 2.6rem;
  color: #999;
  font-size: .8rem;
  position: relative;
}
.list-icon{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0
}
.song-msg{
  width: 93%;
  height: 100%;
}
.song-name{
  color: #000;
  font-size: .8rem
}
.singer{
  color: #000;
  font-size: .6rem;
}
.highlight {
  color: darkcyan;
}
</style>
