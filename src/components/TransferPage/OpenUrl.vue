<template>
  <div class="openurl">
    <span class="header" @click="$router.go(-1)" v-if="this.type == 2 || this.type == 3">
      <i class="iconfont icon-back"></i>&nbsp;返回
    </span>
    <iframe frameborder=0 :src="Url" class="weibo" v-if="this.type == 1"></iframe>
    <iframe frameborder=0 :src="Url" class="app_downloda" v-if="this.type == 3"></iframe>
    <div class="github" v-if="this.type == 2">
      <img src="../../assets/images/logo.png" width="60%" alt="">
      <span>由于GitHub网站限制,请复制链接到浏览器打开.</span>
      <span class="url">{{Url}}</span>
    </div>
    <div class="showQrcode" v-if="this.type == 3">
      <span>下载新版本</span>
      <img src="../../assets/images/logo.png" width="60%" alt="">
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      Url: '',
      type: 0
    }
  },
  created () {
    let url = this.$route.query.url
    let type = this.$route.query.type
    this.Url = url
    this.type = type
  }
}
</script>
<style scoped>
  .openurl{
    width: 100%;
    height: 100%;
  }
  .header {
    background: #f5f5f5;
    color: #636363;
    width: 100%;
    height: 6%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 0.625rem;
    font-size: 1rem;
  }
  .header i{
    font-size: 1.5rem
  }
  .weibo{
    width: 100%;
    height: 100%;
  }
  .github{
    width: 100%;
    height: 94%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #000;
  }
  .app_downloda{
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
  }
  .github span{
    margin-bottom: 15px;
  }
  .github img{
    border: 1px dashed #ccc;
    margin-bottom: 20px;
  }
  .url{
    font-size: 14px;
    color: #0b9;
    font-weight: bold
  }
  .showQrcode{
  width: 100%;
  height: 94%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column
}
.showQrcode span{
 color: #000;
 font-size: 28px
}
</style>
