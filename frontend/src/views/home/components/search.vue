<template>
  <form action="javascript:" @submit="search">
    <v-icon class="icon icon-search" name="search"/>
    <input type="text" maxlength="20" placeholder="Search" autocomplete="off" autofocus="autofocus" spellcheck="false"
           v-model.trim="keyword">
    <v-icon class="icon icon-close" name="close"
            @click.native="clear"
            v-show="keyword !== ''"/>
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
    clear () {
      this.keyword = ''
    },
    search () {
      this.$emit('search', this.keyword)
    }
  },
  mounted () {
    this.search()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  form {
    position: relative;
    margin: 0 auto;
    padding: 30px 0;
    width: 600px;

    .icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: #eee;

      &-search {
        left: 16px;
      }

      &-close {
        right: 16px;
        cursor: pointer;
      }
    }

    input {
      display: block;
      padding: 10px 40px;
      width: 100%;
      font-size: 18px;
      color: #fff;
      border-radius: 8px;
      background: rgba(255, 255, 255, .1);

      &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #eee;
        opacity: 1; /* Firefox */
      }

      &:-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #eee;
      }
    }
  }
</style>
