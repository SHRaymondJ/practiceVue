<template>
  <img :src="item.imgUrl" class="nearby__item__img" />
  <div class="nearby__content">
    <div class="nearby__content__title">{{ item.name }}</div>
    <div class="nearby__content__tags">
      <span class="nearby__content__tag">月售：{{ item.sales }}</span>
      <span class="nearby__content__tag">起送：{{ item.expressLimit }}</span>
      <span class="nearby__content__tag">基础运费：{{ item.expressPrice }}</span>
    </div>
    <p class="nearby__content__highlight">{{ item.slogan }}</p>
  </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: ['item']
}
</script>

<style lang="scss" scoped></style>
