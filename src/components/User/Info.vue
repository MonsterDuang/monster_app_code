<template>
  <div class="Info">
    <div class="top">
      <img src="../../assets/images/logo_.png" alt="">
      <span>2.3.3</span>
    </div>
    <div class="findme">
      <router-link :to="{path: '/openurl', query: {url: 'https://weibo.com/u/5116956676', type: '1'}}">微博: @爽朗的请叫我爱罗</router-link>
      <router-link :to="{path: '/openurl', query: {url: 'https://github.com/MonsterDuang', type: '2'}}">GitHub: https://github.com/MonsterDuang</router-link>
      <span>联系我们: monsterluo1119@yeah.net</span>
      <img src="../../../static/qrcode.png" alt="">
    </div>
  </div>
</template>
<style scoped>
.Info{
  width: 100%;
  height: 100%;
  position: relative;
  background: #151b16
}
.top, .findme{
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 10%;
  color: #fff;
  font-size: .8rem
}
.top img{
  width: 20%;
}
.findme{
  justify-content: space-around;
  height: 45%
}
.findme a{
  color: #fff;
}
.findme img{
  width: 158px;
  height: 158px;
  margin-top: 5%;
  border: 1px dashed #ccc;
  padding: 5px
}
.cancel{
  width: 100%;
  height: 5%;
  text-align: center;
  position: absolute;
  bottom: 2%
}
.bottom-btn-link{
  display: inline-block;
  width: 9%;
  height: 100%;
}
.bottom-btn-link img{
  height: 50%;
}
</style>
