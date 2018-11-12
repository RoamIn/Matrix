<template>
  <div :class="{ 'opening': open }">
    <button class="handle" @click="show">
      <i class="icon">
        <svg viewBox="0 0 20 20" preserveAspectRatio="xMidYMid meet"
             style="pointer-events: none; display: block; width: 100%; height: 100%;">
          <g>
            <rect x="2" y="4" width="16" height="2"></rect>
            <rect x="2" y="9" width="16" height="2"></rect>
            <rect x="2" y="14" width="16" height="2"></rect>
          </g>
        </svg>
      </i>
    </button>
    <div class="backdrop" @click="hide"></div>
    <div class="drawer">
      <div class="header">Settings</div>
      <div class="content">
        <div class="settings-menu">
          <a href="javascript:;">
            <i class="icon"></i>
            Weather
          </a>
          <a href="javascript:;">
            <i class="icon"></i>
            Search
          </a>
          <a href="javascript:;">
            <i class="icon"></i>
            Bookmarks
          </a>
          <a href="javascript:;">
            <i class="icon"></i>
            Music
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Drawer',
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
  $transition-timing: 200ms ease;
  $settings-nav-grey: rgb(90, 90, 90);
  $separator-line: 1px solid rgba(0, 0, 0, .06);

  .opening {
    .backdrop {
      display: block;
      opacity: 1;
    }

    .drawer {
      left: 0;
    }
  }

  .handle {
    position: absolute;
    top: 6px;
    left: 6px;
    box-sizing: border-box;
    padding: 8px;
    width: 40px;
    height: 40px;
    border: none;
    outline: none;
    background: none;
    fill: #fff;
    cursor: pointer;
    user-select: none;
  }

  .backdrop {
    display: none;
    z-index: 1;
    position: absolute;
    top: 0;
    left: -$drawer-width;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity $transition-timing;
  }

  .drawer {
    z-index: 2;
    position: absolute;
    top: 0;
    left: -1 * $drawer-width;
    bottom: 0;
    width: $drawer-width;
    background-color: #fff;
    transition: left $transition-timing;
  }

  .header {
    padding-left: 24px;
    align-items: center;
    border-bottom: $separator-line;
    display: flex;
    font-size: 123.08%;
    min-height: 56px;
    outline: none;
  }

  .settings-menu {
    padding-top: 8px;
  }

  a[href] {
    align-items: center;
    display: flex;
    padding-top: 10px;
    padding-left: 24px;
    padding-bottom: 10px;
    font-weight: 500;
    min-height: 20px;
    word-break: break-word;
    text-decoration: none;
    color: $settings-nav-grey;
  }
</style>
