<template>
  <ul class="list">
    <li class="list-item" v-for="(item, index) in list"
        :key="index">
      <h4 class="movie-title">{{ item.title }}</h4>
      <ul class="torrent-list" v-for="(torrent, torrentIndex) in item.torrent_list"
          :key="torrentIndex">
        <li class="torrent-list-item">
          <div class="torrent-title">{{ torrent.title }}</div>
          <a class="download-btn" :href="torrent.href">下载</a>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'List',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
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
    }

    .movie-title {
      padding: 20px;
      border-radius: 8px 8px 0 0;
      background:
        radial-gradient(circle at bottom left,
          transparent 5px, rgba(#fff, .4) 0) bottom left,
        radial-gradient(circle at bottom right,
          transparent 5px, rgba(#fff, .4) 0) bottom right;
      background-size: 50% 100%;
      background-repeat: no-repeat;
    }

    .torrent-list {
      position: relative;
      padding: 20px;
      border-radius: 0 0 8px 8px;
      background:
        radial-gradient(circle at top left,
          transparent 5px, rgba(#fff, .4) 0) top left,
        radial-gradient(circle at top right,
          transparent 5px, rgba(#fff, .4) 0) top right;
      background-size: 50% 100%;
      background-repeat: no-repeat;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 10px;
        right: 10px;
        height: 1px;
        background:
          linear-gradient(to right, rgba(#fff, .2),
            rgba(#fff, .2) 2px, transparent 2px,
            transparent);
        background-size: 4px 100%;
      }

      &-item {
        display: flex;
        padding-left: 1em;

        &:hover {
          .torrent-title {
            color: #eee;
            text-shadow: 0 0 15px;
          }

          .download-btn {
            background: rgba(#fff, .8);
          }
        }

        .torrent-title {
          flex: 1;
        }

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
          background: rgba(#fff, .4);
        }
      }
    }
  }
</style>
