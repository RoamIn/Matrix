<template>
  <main>
    <drawer></drawer>
    <div class="center">
      <search class="search" @search="search"></search>

      <loading v-if="isLoading"/>
      <torrent-list :list="list" v-else></torrent-list>

      <div v-if="hasError"></div>
      <div v-else-if="list.length === 0"></div>
    </div>
  </main>
</template>

<script>
import Drawer from './components/drawer.vue'
import TorrentList from './components/torrent-list.vue'
import Loading from './components/loading.vue'
import Search from './components/search.vue'

export default {
  name: 'Home',
  components: {
    Drawer,
    TorrentList,
    Loading,
    Search
  },
  data () {
    return {
      list: [],
      isLoading: false,
      hasError: false
    }
  },
  methods: {
    search (title) {
      this.isLoading = true

      this.$ajax('getTorrentByTitle', {
        title
      }).then((res) => {
        this.list = res.data.list
      }).catch(() => {
        console.log(223)
      }).finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="scss">
  #app {
    overflow: hidden;
    position: relative;

    &::before {
      content: '';
      z-index: -1;
      position: absolute;
      width: 100%;
      height: 100%;
      filter: blur(16px);
      background: url("~@/assets/img/Venom.jpg") 0 / cover;
      transform: scale(1.1);
    }
  }
</style>
<style lang="scss" scoped>
  main {
    overflow: scroll;
    height: 100vh;
  }

  .center {
    margin: 0 auto;
    width: 800px;
  }
</style>
