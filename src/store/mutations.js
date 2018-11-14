import http from 'axios'
import api from '@/api'
import util from '@/util'
export default {
  // 清空歌词
  CLEAR_LRC (state) {
    state.nowPlayLrc = []
  },
  CHANGE_SPIN (state) {
    state.hasNowPlay = true
  },
  clearNowPlayList (state) {
    state.nowPlayList = 0
  },
  // 存储歌曲id
  SAVE_SONG_ID (state, data) {
    if (state.nowPlayList === 6) {
      state.searchList = data
    }
    let result = []
    for (var item of data) {
      result.push(item.song_id)
    }
    state.SongId = result
    state.nowPlay = {}
    state.nowPlayId = 0
  },
  // 存储歌曲url
  SAVE_SONG_MSG (state, data) {
    state.SongUrl = data
    state.hasNowPlay = false
    if (state.nowPlayList !== 6) {
      state.nowPlay = state.SongUrl[state.nowPlayId]
    }
  },
  // 存储歌曲lrc
  SAVE_SONG_LRC (state) {
    state.nowPlayLrc = []
    state.noLrc = false
    let songId = state.nowPlay.songinfo.song_id
    let lrcUrl = api.song_id + 'lry&songid=' + songId
    http.get(lrcUrl).then(res => {
      if (res.data.error_code) {
        state.noLrc = true
      } else {
        let lrc = res.data.lrcContent
        if (lrc.indexOf('[') > -1) {
          lrc = lrc.split(/\n/)
          for (let i in lrc) {
            let str = lrc[i]
            let reg = /\[(.+)\](.+)?/
            if (str.match(reg) !== null) {
              if (str.match(reg)[2] !== undefined) {
                state.nowPlayLrc.push(str.match(reg))
              }
            }
          }
        } else {
          let Lrc = lrc.split()
          Lrc.unshift('')
          Lrc.unshift('')
          if (Lrc[2].length > 100) {
            Lrc[2] = '*该歌词不支持自动滚动*\n' + Lrc[2]
          }
          state.nowPlayLrc[0] = Lrc
        }
      }
    })
  },
  SEARCH_TO_PLAY (state, res) {
    state.hasNowPlay = false
    state.nowPlay = res
    for (let i in state.SongUrl) {
      if (state.SongUrl[i].songinfo.song_id === state.nowPlay.songinfo.song_id) {
        state.SongUrl.splice(i, 1)
      }
    }
    state.SongUrl.unshift(res)
  },
  CHANGE_NEXT_SONG (state) {
    state.isPlaying = true
    state.nowPlayId += 1
    if (state.nowPlayId === state.SongUrl.length) {
      state.nowPlayId = 0
    }
    state.nowPlay = state.SongUrl[state.nowPlayId]
  },
  CHANGE_BEFORE_SONG (state) {
    state.nowPlayId -= 1
    if (state.nowPlayId === -1) {
      state.nowPlayId = state.SongUrl.length - 1
    }
    state.nowPlay = state.SongUrl[state.nowPlayId]
  },
  CHANGE_PERCENT (state, percent) {
    state.percent = percent
  },
  CHANGE_LRC (state, nowTime) {
    /* eslint-disable */
    let heightLight = '', afterColor = ''
    switch (state.nowPlayList) {
      case 1:
        heightLight = 'rgba(213, 132, 42, 0.9)'
        afterColor = 'rgba(213, 132, 42, 0.3)'
        break
      case 2:
        heightLight = 'rgba(23, 173, 75, 0.9)'
        afterColor = 'rgba(23, 173, 75, 0.3)'
        break
      case 3:
        heightLight = 'rgba(45, 32, 142, 0.9)'
        afterColor = 'rgba(45, 32, 142, 0.3)'
        break
      case 4:
        heightLight = 'rgba(200, 10, 242, 0.9)'
        afterColor = 'rgba(200, 10, 242, 0.3)'
        break
      case 5:
        heightLight = 'rgba(200, 12, 42, 0.9)'
        afterColor = 'rgba(200, 12, 42, 0.3)'
        break
      case 6:
        heightLight = 'rgba(25, 179, 177, 0.9)'
        afterColor = 'rgba(25, 179, 177, 0.3)'
        break
    }
    state.nowPlayLrc.map((val, index) => {
      if (val[1].slice(0, 5) == util.sec_to_time(nowTime).slice(3, 8) && state.nowPlayLrc.length > 1) {
        val.push('color: ' + heightLight)
        let lrcScroll = document.getElementById('lrc_scroll')
        let lrcContainerTop = document.getElementsByClassName('lrc')[0].getBoundingClientRect().top
        let lrcContainerHeight = document.getElementsByClassName('lrc')[0].getBoundingClientRect().y
        let lrcTop = document.getElementById(val[1]).getBoundingClientRect().top
        if (lrcTop > (lrcContainerTop + lrcContainerHeight / 2)) {
          lrcScroll.scrollTop += lrcTop - (lrcContainerTop + lrcContainerHeight / 2)
        }
        if (index != 0) {
          for (let i = 0; i < index; i++) {
            if (state.nowPlayLrc[i][3] != 'color: ' + afterColor) {
              state.nowPlayLrc[i][3] = 'color: ' + afterColor
            }
          }
        }
      } 
    })
  },
  CHANGE_IMG (state, img) {
    state.nowBackgroundUrl = img
  },
  CHANGE_IS_PLAYING_TRUE (state) {
    state.isPlaying = true
  },
  CHANGE_IS_PLAYING_FALSE (state) {
    state.isPlaying = false
  },
  TO_PLAY (state, index) {
    state.nowPlay = state.SongUrl[index]
    state.nowPlayId = index
  },
  SAVE_USERINFO (state, data) {
    state.userInfo = data
  },
  LOGOUT (state) {
    state.userInfo = {}
    if (state.nowPlayList === 6) {
      state.nowPlay = {}
      state.isPlaying = false
      state.nowPlayList = 0
    }
  },
  CHANGE_NOW_PLAY_LIST (state) {
    state.nowPlayList = 6 // collection
    if (state.collection.length !== 0) {
      state.SongUrl = state.collection
      state.nowPlay = state.SongUrl[state.nowPlayId]
    }
  },
  CHANGE_NEIGHT (state) {
    state.Neight = state.Neight === '夜间' ? '白天' : '夜间'
    if (state.Neight === '白天') {
      state.isNeight = true
    } else {
      state.isNeight = false
    }
  },
  SEARCH_LIST (state) {
    state.nowPlayList = 6
  }
}
