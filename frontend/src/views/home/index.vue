<template>
  <main @scroll="onScroll">
    <drawer></drawer>
    <div class="center">
      <search class="search" @search="onSearch"></search>

      <torrent-list :list="list"></torrent-list>
      <loading v-if="isLoading"/>

      <error v-if="hasError">Error</error>
      <no-result v-else-if="!isLoading && noMore">
        <template v-if="list.length === 0">:( There's no thing here ...</template>
        <template v-else>&lt;\end&gt;</template>
      </no-result>
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

const WINDOW_INNER_HEIGHT = window.innerHeight

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
      hasError: false,
      noMore: false,
      searchParams: {
        title: ''
      }
    }
  },
  methods: {
    onSearch (title) {
      this.list = []
      this.noMore = false
      this.setSearchParams({title, page: 1})
      this.getTorrentByTitle()
    },
    setSearchParams (parmas = {}) {
      Object.assign(this.searchParams, parmas)
    },
    getTorrentByTitle () {
      const data = JSON.parse(JSON.stringify(this.searchParams))

      this.hasError = false
      this.isLoading = true

      setTimeout(() => {
        this.$ajax('getTorrentByTitle', data).then((res) => {
          const list = res.data.list

          this.noMore = list.length === 0
          this.list = this.list.concat(res.data.list)
        }).catch(() => {
          this.hasError = true
        }).finally(() => {
          this.isLoading = false
        })
      }, 1000)
    },
    searchNextPage () {
      const page = this.searchParams.page + 1

      this.setSearchParams({page})
      this.getTorrentByTitle()
    },
    onScroll (e) {
      if (this.isLoading || this.noMore) {
        return
      }

      const {scrollHeight, scrollTop} = e.target
      const distanceToBottom = scrollHeight - WINDOW_INNER_HEIGHT - scrollTop

      if (distanceToBottom < 20) {
        this.searchNextPage()
      }
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
    overflow: auto;
    height: 100vh;
  }

  .center {
    margin: 0 auto;
    max-width: 800px;
  }
</style>
