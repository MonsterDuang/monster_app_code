<template>
  <div class="Home">
    <div class="defaultBg">
      <img src="../../assets/images/logo.png" alt="" v-show="nowBackgroundUrl==''">
    </div>
    <img :src="nowBackgroundUrl" v-show="nowBackgroundUrl!=''" class="nowImg" alt="">
    <div class="right-btn">
      <router-link :to="{path: '/songplay', query: {play_list: 1}}" class="right-btn-link"><img src="../../assets/images/11.png" alt="" :class="{'animated fadeOut infinite':this.nowPlayList===1}"></router-link>
      <router-link :to="{path: '/songplay', query: {play_list: 2}}" class="right-btn-link"><img src="../../assets/images/21.png" alt="" :class="{'animated fadeOut infinite':this.nowPlayList===2}"></router-link>
      <router-link :to="{path: '/songplay', query: {play_list: 3}}" class="right-btn-link"><img src="../../assets/images/31.png" alt="" :class="{'animated fadeOut infinite':this.nowPlayList===3}"></router-link>
      <router-link :to="{path: '/songplay', query: {play_list: 4}}" class="right-btn-link"><img src="../../assets/images/41.png" alt="" :class="{'animated fadeOut infinite':this.nowPlayList===4}"></router-link>
      <router-link :to="{path: '/songplay', query: {play_list: 5}}" class="right-btn-link"><img src="../../assets/images/51.png" alt="" :class="{'animated fadeOut infinite':this.nowPlayList===5}"></router-link>
      <router-link to="/search" class="right-btn-link"><img src="../../assets/images/61.png" alt="" :class="{'animated fadeOut infinite':this.nowPlayList===6}"></router-link>
    </div>
    <div class="bottom-btn">
      <router-link to="/user" class="bottom-btn-link">
        <img src="../../assets/images/head.png" alt="" v-show="this.userInfo.id===undefined">
        <img src="../../assets/images/head_logined.jpg" alt="" style="border-radius: 2em;border:1px solid #151b16" v-show="this.userInfo.id!==undefined">
      </router-link>
      <span class="bottom-btn-link" @click="changeNowPlayList"><img src="../../assets/images/heart_tiny.png" alt="" :class="{'animated fadeOut infinite':this.nowPlayList===7}"></span>
    </div>
    <div class="masked"></div>
    <div class="bgList" ref="bglist">
      <p><span>powered &nbsp;by</span> Monster</p>
      <ul class="img-container">
        <router-link :to="{'path':'/bgimage',query:{'img':item.img}}" tag="li" v-for="(item) in backgroundImg" :key="item.id"><img :src="item.img" alt=""></router-link>
      </ul>
    </div>
  </div>
</template>
<script>
import bg1 from '../../assets/images/bg1.jpg'
import bg2 from '../../assets/images/bg2.jpg'
import bg3 from '../../assets/images/bg3.jpg'
import bg4 from '../../assets/images/bg4.jpg'
import bg5 from '../../assets/images/bg5.jpg'
import bg6 from '../../assets/images/bg6.jpg'
import bg7 from '../../assets/images/bg7.jpg'
export default {
  data () {
    return {
      backgroundImg: [
        {id: 1, img: bg1},
        {id: 2, img: bg2},
        {id: 3, img: bg3},
        {id: 4, img: bg4},
        {id: 5, img: bg5},
        {id: 6, img: bg6},
        {id: 7, img: bg7}
      ]
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    nowPlayList () {
      return this.$store.state.nowPlayList
    },
    nowBackgroundUrl () {
      return this.$store.state.nowBackgroundUrl
    }
  },
  methods: {
    changeNowPlayList () {
      if (this.$store.state.userInfo.id === undefined) {
        return this.$msg('提示', '请先登录')
      } else {
        this.$store.commit('CHANGE_NOW_PLAY_LIST')
        this.$router.push('/like')
      }
    }
  }
}
</script>
<style scoped>
.Home{
  width: 100%;
  height: 100%;
  position: relative;
}
.Home > img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}
.defaultBg{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d9e2e8;
  z-index: -1
}
.defaultBg img{
  width: 50%;
}
.right-btn{
  width: 9%;
  height: 45%;
  position: absolute;
  right: 3%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.right-btn-link {
  display: block;
  width: 90%;
  height: 12%;
}
.right-btn-link img{
  height: 100%;
}
.bottom-btn{
  width: 100%;
  height: 9%;
  padding: 0 3%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0.5%
}
.bottom-btn-link{
  display: block;
  width: 8%;
  height: 50%;
}
.bottom-btn-link img{
  height: 100%;
}
.masked{
  width: 100%;
  height: 100%;
  background: #000;
  opacity: .5;
  position: absolute;
  top: 0;
  display: none;
  z-index: 10
}
.bgList{
  width: 100%;
  height: 20%;
  position: absolute;
  bottom: -20%;
  background: #fff;
  border-top: solid 1px #ccc;
  padding: 1%;
  box-sizing: border-box;
  z-index: 10
}
.bgList p{
  font-size: .6rem;
}
.bgList p span{
  color: #999
}
.img-container{
  width: 100%;
  height: 82%;
  margin-top: 1%;
  display: flex;
  flex-flow: row nowrap;
  overflow-x: auto;
  overflow-y: hidden
}
.img-container li{
  float: left;
  height: 100%;
  margin-right: 1%;
}
.img-container li img{
  height: 100%;
}
</style>
