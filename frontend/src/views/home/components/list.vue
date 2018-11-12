<template>
  <ul class="list">
    <li class="list-item" v-for="(item, index) in list"
        :key="index">
      <h4 class="title">{{ item.title }}</h4>
      <ul class="torrent-list" v-for="(torrent, torrentIndex) in item.torrent_list"
          :key="torrentIndex">
        <li class="torrent-list-item">{{ torrent.title }}</li>
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
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 20px rgba(0, 0, 0, .1);
      background: rgba(255, 255, 255, .4);
    }

    .header {

    }

    .body {

    }
  }
</style>
