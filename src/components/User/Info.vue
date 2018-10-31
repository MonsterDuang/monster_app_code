<template>
  <div class="Info">
    <div class="top">
      <img src="../../assets/images/logo_.png" alt="">
      <span>2.3.3</span>
    </div>
    <div class="findme">
      <span>微博: @爽朗的请叫我爱罗</span>
      <a href='https://github.com/MonsterDuang'>GitHub: https://github.com/MonsterDuang</a>
      <span>联系我们: monsterluo1119@yeah.net</span>
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
}
.findme a{
  color: #fff;
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
