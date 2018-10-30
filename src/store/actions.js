import http from 'axios'
import api from '@/api'
export default {
  // 获取歌曲信息
  getSong (store, data) {
    return http.get(data.url).then(res => {
      store.state.nowPlayList = data.play_list
      store.commit('SAVE_SONG_ID', res.data.song_list)
    })
  },
  // 获取歌曲的播放地址
  getSongUrl (store) {
    let result = []
    for (let i in store.state.SongId) {
      let songId = store.state.SongId[i]
      let url = api.song_id + songId
      http.get(url).then(res => {
        result.push(res.data)
        store.commit('SAVE_SONG_MSG', result)
      }).then(res => {
        /* eslint-disable */
        if (i == store.state.SongId.length - 1) {
          store.commit('SAVE_SONG_LRC')
        }
      })
    }
  },
  searchToPlay ({commit}, id) {
    let url = api.song_id + id
    http.get(url).then(res => {
      commit('SEARCH_TO_PLAY', res.data)
    }).then(res => {
      store.commit('SAVE_SONG_LRC')
    })
  },
  // 下一首
  changeNextSong ({commit}) {
    commit('CHANGE_NEXT_SONG')
  },
  // 上一首
  changeBeforeSong ({commit}) {
    commit('CHANGE_BEFORE_SONG')
  },
  changePercent ({commit}, percent) {
    commit('CHANGE_PERCENT', percent)
  },
  changeLrc ({commit}, nowTime) {
    commit('CHANGE_LRC', nowTime)
  },
  login ({commit}, phone) {
    let url = api.db + 'user?phone=' + phone
    return http.get(url)
      .then(res => {
        if (res.data.length > 0) {
          // 已有>>>登陆获取用户信息
          let data = res.data[0]
          commit('SAVE_USERINFO', data)
          // 获取该用户收藏夹
          let getCollectionApi = api.db + 'user/' + data.id + '?_embed=usercollection'
          http.get(getCollectionApi)
            .then(res => {
              // 保存收藏夹
              commit('SAVE_COLLECTION', res.data.usercollection)
            })
          return '登陆成功'
        } else {
          // 没有>>>注册
          let url = api.db + 'user'
          let userObj = {
            phone: phone
          }
          return http.post(url, userObj)
            .then(res => {
              // 用户信息保存userInfo
              commit('SAVE_USERINFO', res.data)
              return '注册成功'
            })
        }
      })
  }
}
