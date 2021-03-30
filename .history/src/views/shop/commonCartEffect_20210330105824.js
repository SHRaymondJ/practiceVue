import { useStore } from 'vuex'

// 购物车相关逻辑，调用store的state属性
export const useCommonCartEffect = () => {
  const store = useStore()
  const cartList = store.cartList
  // 操作store的值，用store.commit调用mutation的方法
  const changeCartItemInfo = (shopId, productId, productInfo, count) => {
    store.commit('changeCartItemInfo', {
      shopId, productId, productInfo, count
    })
  }
  const clearCart = (shopId) => {
    store.commit('clearCart', {
      shopId
    })
  }
  const chooseAll = (shopId, choose) => {
    store.commit('chooseAll', {
      shopId, choose
    })
  }
  return { cartList, changeCartItemInfo, clearCart, chooseAll }
}
