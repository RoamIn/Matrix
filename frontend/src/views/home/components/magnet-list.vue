<template>
  <ul class="list">
    <li class="list-item" v-for="(item, index) in list" :key="index">
      <div class="list-item-header">
        <h4 class="movie-title">{{ item.title }}</h4>
        <div class="movie-info">
          <time>
            <v-icon class="icon-time" name="calendar"/>
            {{ item.created | formatDate }}
          </time>
        </div>
      </div>
      <div class="list-item-body">
        <div class="torrent">
          <div class="torrent-filename">
            <v-icon class="icon-attachment" name="attachment"/>
            {{ item.filename }}
          </div>
          <a class="copy-btn" href="javascript:" @click="copy(item.magnet)">复制</a>
          <a class="download-btn" href="javascript:" @click="download(item)">下载</a>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import parseTorrent from 'parse-torrent'
import { formatDate } from '@/utils/time'

export default {
  name: 'List',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    formatDate
  },
  data () {
    return {}
  },
  methods: {
    copy (magnet) {
      this.$copyText(magnet)
    },
    download ({magnet, filename}) {
      const content = parseTorrent(magnet)
      const buf = parseTorrent.toTorrentFile({info: content})
      const blob = new Blob([buf])

      this.saveFile(blob, filename)
    },
    saveFile (blob, filename) {
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename)
      } else {
        const link = document.createElement('a')
        const body = document.querySelector('body')

        link.href = window.URL.createObjectURL(blob)
        link.download = filename

        // fix Firefox
        link.style.display = 'none'
        body.appendChild(link)

        link.click()
        body.removeChild(link)

        window.URL.revokeObjectURL(link.href)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  overflow: hidden;
  position: relative;
  margin: 0 auto;

  &-item {
    margin: 20px;

    &-header {
      padding: 20px;
      border-radius: 8px 8px 0 0;
      background: radial-gradient(
            circle at bottom left,
            transparent 5px,
            rgba(#fff, 0.4) 0
          )
          bottom left,
        radial-gradient(
            circle at bottom right,
            transparent 5px,
            rgba(#fff, 0.4) 0
          )
          bottom right;
      background-size: 50% 100%;
      background-repeat: no-repeat;

      .movie-info {
        padding: 20px 10px 0;

        time {
          color: #444;
        }

        .icon-time {
          margin-right: 5px;
        }
      }
    }

    &-body {
      display: flex;
      align-items: center;
      position: relative;
      padding: 20px;
      border-radius: 0 0 8px 8px;
      background: radial-gradient(
            circle at top left,
            transparent 5px,
            rgba(#fff, 0.4) 0
          )
          top left,
        radial-gradient(circle at top right, transparent 5px, rgba(#fff, 0.4) 0)
          top right;
      background-size: 50% 100%;
      background-repeat: no-repeat;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 10px;
        right: 10px;
        height: 1px;
        background: linear-gradient(
          to right,
          rgba(#fff, 0.2),
          rgba(#fff, 0.2) 2px,
          transparent 2px,
          transparent
        );
        background-size: 4px 100%;
      }
  }
  }

  .torrent {
    display: flex;
    padding-left: 1em;
    width: 100%;

    &:hover {
      .torrent-filename {
        color: #eee;
        text-shadow: 0 0 15px;
      }

      .copy-btn,
      .download-btn {
        background: rgba(#fff, .8);
      }
    }

    .torrent-filename {
      flex: 1;
    }

    .icon-attachment {
      margin-right: 5px;
    }

    .copy-btn,
    .download-btn {
      $h: 28px;

      padding: 0 20px;
      height: $h;
      line-height: $h;
      border-radius: $h / 2;
      font-size: 14px;
      font-weight: 600;
      text-align: center;
      color: #3785f7;
      background: rgba(#fff, 0.4);

      &:hover {
        cursor: pointer;
        user-select: none;
        background: rgba(#fff, 0.8);
      }

      .icon-magnet {
        font-size: 18px;
        font-weight: 500;
        margin-right: 5px;
      }
    }

    .download-btn {
      margin-left: 5px;
    }
  }
}
</style>
