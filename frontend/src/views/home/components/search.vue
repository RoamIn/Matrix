<template>
  <form action="javascript:" @submit="search">
    <input type="text" maxlength="20" placeholder="Search" autocomplete="off" autofocus="autofocus" spellcheck="false"
           v-model.trim="keyword">
  </form>
</template>
<script>
export default {
  name: 'Search',
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    search () {
      const title = this.keyword

      this.$ajax('getTorrentByTitle', {
        title
      }).then((res) => {
        this.$emit('change', res.data.list)
      })
    }
  },
  mounted () {
    this.search()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  form {
    padding: 30px 0;

    input {
      display: block;
      margin: 0 auto;
      padding: 10px 12px;
      width: 600px;
      font-size: 18px;
      color: #fff;
      border-radius: 8px;
      background: rgba(255, 255, 255, .1);
    }
  }
</style>
