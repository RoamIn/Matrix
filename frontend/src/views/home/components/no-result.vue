<template>
  <div class="no-result">:( There's nothing here ...</div>
</template>

<script>
export default {
  name: 'no-result',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .no-result {
    padding: 30px 0;
    text-align: center;
    color: #fff;
    font-size: 24px;
    font-weight: 500;
    letter-spacing: 3px;

    text-shadow:
      0 0 10px #fff,
      0 0 20px #fff,
      0 0 30px #fff,
      0 0 40px #228dff,
      0 0 70px #228dff,
      0 0 80px #228dff,
      0 0 100px #228dff,
      0 0 150px #228dff;
  }
</style>
