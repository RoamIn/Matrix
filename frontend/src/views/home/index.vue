<template>
  <main>
    <drawer></drawer>
    <div class="center">
      <search class="search" @change="setList"></search>
      <list :list="listData"></list>
    </div>
  </main>
</template>

<script>
import Drawer from './components/drawer.vue'
import List from './components/list.vue'
import Search from './components/search.vue'

export default {
  name: 'Home',
  components: {
    Drawer,
    List,
    Search
  },
  data () {
    return {
      listData: []
    }
  },
  methods: {
    setList (list) {
      this.listData = list
    }
  }
}
</script>

<style lang="scss">
  #app  {
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
