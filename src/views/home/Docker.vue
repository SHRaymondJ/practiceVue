<template>
  <div class="docker">
    <div
      v-for="(item, index) in dockerList"
      :key="item.icon"
      :class="{ docker__item: true, 'docker__item--active': index == 0 }"
    >
      <div class="iconfont" v-html="item.icon" />
      <div class="docker__title">{{item.title}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Docker',
  setup () {
    const dockerList = [
      {
        icon: '&#xe603;',
        title: '首页'
      },
      {
        icon: '&#xe604;',
        title: '购物车'
      },
      {
        icon: '&#xe613;',
        title: '订单'
      },
      {
        icon: '&#xe658;',
        title: '我的'
      }
    ]
    return { dockerList }
  }
}
</script>
<style lang="scss" scoped>
@import "../../style/variables.scss";

.docker {
  position: fixed;
  bottom: 0;
  height: 0.48rem;
  box-shadow: 0 -1px 1px 0 $gray-bgColor;
  box-sizing: border-box;
  width: 100%;
  padding: 0 0.18rem;
  display: flex;
  justify-content: space-around;
  color: $content-fc;
  background:#ffffff;
  &__item {
    flex: 1;
    text-align: center;
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.18rem;
    }
    &--active {
      color: #1fa4fc;
    }
  }
  &__title {
    font-size: 0.12rem;
  }
}
</style>
