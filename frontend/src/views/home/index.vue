<template>
  <main>
    <drawer></drawer>
    <div class="center">
      <search class="search" @search="search"></search>

      <loading v-if="isLoading"/>
      <torrent-list :list="list" v-else></torrent-list>

      <error v-if="hasError">Error</error>
      <no-result v-else-if="list.length === 0"></no-result>
    </div>
  </main>
</template>

<script>
import Drawer from './components/drawer.vue'
import TorrentList from './components/torrent-list.vue'
import Loading from './components/loading.vue'
import Search from './components/search.vue'
import Error from './components/error.vue'
import NoResult from './components/no-result.vue'

export default {
  name: 'Home',
  components: {
    Drawer,
    TorrentList,
    Loading,
    Search,
    Error,
    NoResult
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
      this.hasError = false
      this.isLoading = true

      this.$ajax('getTorrentByTitle', {
        title
      }).then((res) => {
        this.list = res.data.list
      }).catch(() => {
        this.hasError = true
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
    max-width: 800px;
  }
</style>
