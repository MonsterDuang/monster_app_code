<template>
  
</template>
<script>
export default {
  data () {
    this.$router.replace({path: '/songplay', query: {play_list: this.$store.state.nowPlayList}})
    this.$store.commit('clearNowPlayList')
    return {}
  }
}
</script>
