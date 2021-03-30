<template>
  <div class="cart">
    <div class="cart__basket">
      <span class="cart__basket__number">{{ cartTotal }}</span>
      <img class="cart__basket__img" src="../../assets/shop/basket.svg" alt="" />
    </div>
    <div class="cart__priceBox">
      <div class="cart__price">
        总计：
        <span class="cart__price__number">&yen;{{ price }}</span>
      </div>
      <div class="cart__button">去结算</div>
    </div>
  </div>
  <div class="products">
    <div class="products__all" v-if="total > 0">
      <div class="products__all__box">
        <span class="products__all__choose iconfont" v-html="cartTotal === total ? '&#xe626;':'&#xe625;'"></span>
        <span class="products__all__text">全选</span>
      </div>
      <div class="products__all__box"  @click="clearCart">
        <span class="products__all__clear">清空购物车</span>
      </div>
    </div>
    <template v-for="item in productList" :key="item._id" v-show="item.imgUrl">
      <div class="products__item" v-if="item.count > 0">
        <span
          class="products__choose iconfont"
          v-html="item.check ? '&#xe626;' : '&#xe625;'"
          @click="changeCartItemChecked(item._id)"
        ></span>
        <img class="products__item__img" :src="item.imgUrl" alt="" />
        <div class="products__item__detail">
          <h4 class="products__item__tittle">
            {{ item.name }}
          </h4>
          <p class="products__item__price">
            <span class="products__item__yen">&yen;</span>{{ item.price }}
            <span class="products__item__origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product__number">
          <span
            class="product__number__minus"
            @click="changeCartItemInfo(shopId, item._id, item, -1)"
            >-</span
          >
          {{ item.count || 0 }}
          <span
            class="product__number__plus"
            @click="changeCartItemInfo(shopId, item._id, item, 1)"
            >+</span
          >
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useCommonCartEffect } from './commonCartEffect'

// 获取购物车信息逻辑
const useCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  const { changeCartItemInfo, clearCart } = useCommonCartEffect()
  const changeCartItemChecked = (productId) => {
    store.commit('changeCartItemChecked', {
      shopId,
      productId
    })
  }
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
        count += product.check ? product.count * product.price : 0
      }
    }
    return count.toFixed(2)
  })
  const cartTotal = computed(() => {
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        count += product.check ? product.count : 0
      }
    }
    return count
  })
  const productList = computed(() => {
    const productList = cartList[shopId] || []
    return productList
  })
  return { total, price, productList, cartTotal, changeCartItemInfo, changeCartItemChecked, clearCart }
}

export default {
  name: 'Cart',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const {
      total,
      price,
      productList,
      cartTotal,
      changeCartItemInfo,
      changeCartItemChecked,
      clearCart
    } = useCartEffect(shopId)
    return {
      total,
      price,
      productList,
      cartTotal,
      changeCartItemInfo,
      shopId,
      changeCartItemChecked,
      clearCart
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";

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

.products {
  background-color: $bgColor;
  overflow-y: scroll;
  width: 100%;
  position: absolute;
  bottom: 0.5rem;
  left: 0;
  &__all {
    font-size: 0.14rem;
    display: flex;
    justify-content: space-between;
    padding: 0.12rem 0.16rem;
    &__box {
      display: flex;
      align-items: center;
    }
    &__text {
      margin-left: 0.05rem;
    }
    &__choose {
      color: $btn-bgColor;
      line-height: 0.3rem;
      font-size: 0.24rem;
    }
  }
  &__choose {
    color: $btn-bgColor;
    line-height: 0.68rem;
    font-size: 0.24rem;
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 1px solid $gray-bgColor;
    &__img {
      width: 0.68rem;
      height: 0.68rem;
      margin: 0 0.16rem;
    }
    &__detail {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__tittle {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fc;
      @include ellipsis;
    }
    &__sales {
      margin: 0.06rem 0 0.1rem;
      line-height: 0.16rem;
      font-size: 0.12rem;
      color: $content-fc;
    }
    &__price {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $highlight-fontColor;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__origin {
      font-size: 0.12rem;
      line-height: 0.2rem;
      color: $light-fc;
      text-decoration: line-through;
      margin-left: 0.06rem;
    }
    .product__number {
      position: absolute;
      right: 0;
      bottom: 0.34rem;
      font-size: 0.14rem;
      &__minus,
      &__plus {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        border-radius: 50%;
        font-size: 0.2rem;
        text-align: center;
        line-height: 0.16rem;
      }
      &__minus {
        border: 0.01rem solid $medium-fc;
        color: $medium-fc;
        margin-right: 0.05rem;
      }
      &__plus {
        color: $bgColor;
        border: 0.01rem solid $btn-bgColor;
        background-color: $btn-bgColor;
        margin-left: 0.05rem;
      }
    }
  }
}
</style>
