<template>
  <div class="box">
    <div class="primary primary-red"></div>
    <div class="primary primary-green"></div>
    <div class="primary primary-blue"></div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  $size: 36px;

  .box {
    position: relative;
    margin: $size auto;
    @include square($size);
  }
  .primary {
    position: absolute;
    top: 0;
    left: 0;
    @include circle($size);
    opacity: .6;
    will-change: transform;
    animation-duration: 1.6s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
    filter: drop-shadow(0 0 2px rgba(#fff, .8));

    &-red {
      background-color: #f00;
      animation-name: goTop;
    }
    &-green {
      background-color: #0f0;
      animation-name: goRight;

    }
    &-blue {
      background-color: #00f;
      animation-name: goLeft;
    }

    $translateOffset: 50%;
    @keyframes goTop {
      0% {
        transform: translate(0, 0);
      }

      25% {
        transform: translate(0, -$translateOffset);
      }

      50% {
        transform: translate(0, 0);
      }

      75% {
        transform: translate(0, $translateOffset);
      }

      100% {
        transform: translate(0, 0);
      }
    }

    @keyframes goLeft {
      0% {
        transform: translate(0, 0);
      }

      25% {
        transform: translate(-$translateOffset, $translateOffset);
      }

      50% {
        transform: translate(0, 0);
      }

      75% {
        transform: translate($translateOffset, -$translateOffset);
      }

      100% {
        transform: translate(0, 0);
      }
    }

    @keyframes goRight {
      0% {
        transform: translate(0, 0);
      }

      25% {
        transform: translate($translateOffset, $translateOffset);
      }

      50% {
        transform: translate(0, 0);
      }

      75% {
        transform: translate(-$translateOffset, -$translateOffset);
      }

      100% {
        transform: translate(0, 0);
      }
    }
  }
</style>
