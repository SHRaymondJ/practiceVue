import { useStore } from 'vuex'
import { toRefs } from 'vue'

// 购物车相关逻辑，调用store的state属性
export const useCommonCartEffect = () => {
  const store = useStore()
  // 操作store的值，用store.commit调用mutation的方法
  const { cartList } = toRefs(store.state)
  const changeCartItemInfo = (shopId, productId, productInfo, count) => {
    store.commit('changeCartItemInfo', {
      shopId, productId, productInfo, count
    })
  }
  return { cartList, changeCartItemInfo }
}
