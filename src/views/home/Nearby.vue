<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <div class="nearby__item" v-for="(item,index) in iconList" :key="index">
      <img
        src="http://www.dell-lee.com/imgs/vue3/nearby.png"
        alt=""
        class="nearby__item__img"
      />
      <div class="nearby__content">
        <div class="nearby__content__title">沃尔玛</div>
        <div class="nearby__content__tags">
          <span class="nearby__content__tag">月售1万+</span>
          <span class="nearby__content__tag">月售1万+</span>
          <span class="nearby__content__tag">月售1万+</span>
        </div>
        <p class="nearby__content__highlight">VIP尊享满89元减4元运费</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Nearby',
  setup () {
    const iconList = [
      { icon: '超市', desc: '超市便利' },
      { icon: '菜市场', desc: '菜市场' },
      { icon: '水果店', desc: '水果店' },
      { icon: '鲜花', desc: '鲜花绿植' },
      { icon: '医药健康', desc: '医药健康' },
      { icon: '家居', desc: '家居时尚' },
      { icon: '蛋糕', desc: '烘培蛋糕' },
      { icon: '签到', desc: '签到' },
      { icon: '大牌免运', desc: '大牌免运' },
      { icon: '红包', desc: '红包套餐' }
    ]
    return { iconList }
  }
}
</script>
<style lang="scss" scoped>
@import "../../style/variables.scss";

.nearby {
  &__title {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.18rem;
    color: $content-fc;
  }
  &__item {
    display: flex;
    padding-top: 0.12rem;
    &__img {
      margin-right: 0.16rem;
      width: 0.56rem;
      height: 0.56rem;
    }
  }
  &__content {
    flex: 1;
    border-bottom: 1px solid $gray-bgColor;
    padding-bottom: .12rem;
    &__title {
      line-height: 0.22rem;
      font-size: 0.16rem;
      color: $content-fc;
    }
    &__tags {
      margin-top: 0.08rem;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: $content-fc;
    }
    &__tag {
      margin-right: 0.16rem;
    }
    &__highlight {
      margin: 0.08rem 0 0 0;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: #e93b3b;
    }
  }
}
</style>
