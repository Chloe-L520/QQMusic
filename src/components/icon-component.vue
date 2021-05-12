<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
  export default {
    name: 'icon-svg',
    props: {
      iconClass: {
        type: String,
        required: true
      }
    },
    computed: {
      iconName () {
        return `#icon-${this.iconClass}`
      }
    }
  }
</script>

<style lang="less" scoped>
@import '~@/style/index.less';
  .svg-icon {
    width: 60/@rem;
    height: 60/@rem;
    vertical-align: -20/@rem;
    fill: currentColor;
    overflow: hidden;
  }
</style>