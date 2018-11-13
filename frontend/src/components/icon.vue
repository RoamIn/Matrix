<template>
  <svg class="v-icon" aria-hidden="true" :style="styles">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
const COMPONENT_NAME = 'VIcon'

export default {
  name: COMPONENT_NAME,
  props: {
    name: {
      type: String,
      required: true
    },
    size: [Number, String],
    color: String
  },
  computed: {
    styles () {
      const style = {}

      if (this.size) {
        style['font-size'] = `${this.size}px`
      }

      if (this.color) {
        style.fill = this.color
      }

      return style
    },
    iconName () {
      return `#icon-${this.name}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-icon {
    overflow: hidden;
    width: 1em;
    height: 1em;
    vertical-align: -.15em;
    fill: currentColor;
  }
</style>
