import { createStore } from 'vuex'

export default createStore({
  state: {
    cartList: {
      // 第一层级是商铺的id
      // shopId: {
      //   // 第二层级是商品的id
      //   // 内容是商品内容及购物数量
      //   productId: {
      //     _id: '1',
      //     name: '番茄250g/份',
      //     imgUrl: 'xxx',
      //     sales: 10,
      //     price: 33.6,
      //     oldPrice: 39.6,
      //     count: 2
      //   }
      // }
    }
  },
  mutations: {
    changeCartItemInfo (state, payload) {
      const { shopId, productId, productInfo, count } = payload
      const cartList = state.cartList
      let shop = cartList[shopId]
      if (!shop) { shop = {} }
      let product = shop[productId]
      if (!product) {
        product = productInfo
        product.count = 0
      }
      product.count += count
      product.check = false
      if (product.count < 0) { product.count = 0 }
      shop[productId] = product
      cartList[shopId] = shop
    },
    changeCartItemChecked (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId][productId]
      product.check = !product.check
      state.cartList[shopId][productId] = product
    }
  },
  actions: {
  },
  modules: {
  }
})
