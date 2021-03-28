<template>
  <div class="cart">
    <div class="cart__basket">
      <span class="cart__basket__number">{{ total }}</span>
      <img
        class="cart__basket__img"
        src="../../assets/shop/basket.svg"
        alt=""
      />
    </div>
    <div class="cart__priceBox">
      <div class="cart__price">
        总计：
        <span class="cart__price__number">&yen;{{ price }}</span>
      </div>
      <div class="cart__button">去结算</div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

// 获取购物车信息逻辑
const useCartEffect = () => {
  const store = useStore()
  const route = useRoute()
  const shopId = route.params.id
  const cartList = store.state.cartList
  // 计算属性监控值
  const total = computed(() => {
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        count += product.count
      }
    }
    return count
  })
  const price = computed(() => {
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        count += product.count * product.price
      }
    }
    return count.toFixed(2)
  })
  return { total, price }
}

export default {
  name: 'Cart',
  setup () {
    const { total, price } = useCartEffect()
    return { total, price }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
.cart {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 1px solid $gray-bgColor;
  background: $bgColor;
  &__basket {
    position: relative;
    display: flex;
    width: 20%;
    align-items: center;
    &__img {
      width: 0.28rem;
      height: 0.26rem;
      display: block;
      margin: 0 auto;
    }
    &__number {
      position: absolute;
      min-width: 0.24rem;
      height: 0.24rem;
      left: 0.5rem;
      top: 0.01rem;
      color: $bgColor;
      background-color: $highlight-fontColor;
      font-size: 0.14rem;
      text-align: center;
      line-height: 0.24rem;
      border-radius: 0.1rem;
      transform: scale(0.5);
      transform-origin: left center;
    }
  }
  &__priceBox {
    display: flex;
    justify-content: space-between;
    flex: 1;
  }
  &__price {
    font-size: 0.12rem;
    color: $content-fc;
    line-height: 0.5rem;
    padding-left: 0.08rem;
    &__number {
      font-size: 0.18rem;
      color: $highlight-fontColor;
    }
  }
  &__button {
    width: 0.98rem;
    height: 100%;
    background-color: $submit-bgColor;
    color: white;
    font-size: 0.14rem;
    line-height: 0.49rem;
    text-align: center;
  }
}
</style>
