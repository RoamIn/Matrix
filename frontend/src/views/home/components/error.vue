<template>
  <div class="error">Error</div>
</template>

<script>
export default {
  name: 'error',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .error {
    padding: 30px 0;
    text-align: center;
    color: #fff;
    font-size: 24px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 5px;

    text-shadow:
      0 0 10px #fff,
      0 0 20px #fff,
      0 0 30px #fff,
      0 0 40px #f00,
      0 0 70px #f00,
      0 0 80px #f00,
      0 0 100px #f00,
      0 0 150px #f00;
  }
</style>
