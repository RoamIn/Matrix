<template>
  <div class="drawer" ref="drawer"
       :class="{ 'opening': open }"
       v-clickOutside="hide">

    <button class="handle-btn"
            @click.stop="show"
            v-if="!open">
      <v-icon class="handle-btn-icon" size="32" name="movie" color="rgba(255, 255, 255, .8)"></v-icon>
    </button>

    <div class="drawer-main" @click.stop>
      <div class="header">设置</div>
      <div class="content">
        <div class="settings-menu">
          <a href="javascript:;">
            梦幻天堂龙网
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clickOutside from '@/directives/click-outside'

export default {
  name: 'Drawer',
  directives: {
    clickOutside
  },
  data () {
    return {
      open: false
    }
  },
  methods: {
    show () {
      this.open = true
    },
    hide () {
      this.open = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $drawer-width: 256px;

  .drawer {
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: $drawer-width;
    transition: transform 200ms ease;
    transform: translate3d(-100%, 0, 0);

    &.opening {
      transform: translate3d(0, 0, 0);
    }

    &::before {
      content: "";
      z-index: -1;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(#fff, .2);
      filter: blur(50px);
    }
  }

  .handle-btn {
    position: absolute;
    top: 8px;
    left: 8px + $drawer-width;
    box-sizing: border-box;
    padding: 8px;
    width: 40px;
    height: 40px;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
    user-select: none;

    &-icon {
      filter: drop-shadow(0 0 10px #fff);
      animation: rotate 4s linear infinite;
    }
  }

  .header {
    padding-left: 34px;
    border-bottom: 1px solid rgba(#fff, .2);
    font-size: 22px;
    line-height: 58px;
    outline: none;
    color: #fff;
  }

  .settings-menu {
    padding-top: 8px;
  }

  a[href] {
    display: block;
    margin: 0 10px;
    padding: 12px 0 12px 24px;
    font-weight: 400;
    font-size: 16px;
    word-break: break-word;
    border-radius: 8px;
    color: #fff;
    text-shadow: 0 0 15px;

    &:hover {
      background: rgba(#fff, .2);
    }
  }
</style>
