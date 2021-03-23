<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe611;</div>
      <div class="search__content">
        <div class="search__content__icon iconfont">&#xe60c;</div>
        <input type="text" class="search__content__input" />
      </div>
    </div>
    <ShopInfo :item="item" v-show="item.imgUrl" :hideBorder="true" />
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'

// 返回上层
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}

// 获得店铺信息
const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({
    item: {}
  })
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}

export default {
  name: 'Shop',
  components: { ShopInfo },
  setup () {
    const { item, getItemData } = useShopInfoEffect()
    const { handleBackClick } = useBackRouterEffect()
    getItemData()
    return { item, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
.wrapper {
  padding: 0 $box-side;
}
.search {
  display: flex;
  margin: 0.2rem 0 0.16rem 0;
  &__back {
    height: 0.32rem;
    width: 0.3rem;
    line-height: 0.32rem;
    font-size: 0.2rem;
    text-align: center;
  }
  &__content {
    display: flex;
    flex: 1;
    background: $content-bgColor;
    border-radius: 0.16rem;
    line-height: 0.32rem;
    font-size: 0.2rem;
    text-align: center;
    &__icon {
      width: 0.44rem;
      height: 0.32rem;
      columns: $search-color;
    }
    &__input {
      display: block;
      width: 100%;
      font-size: $input-fs;
      padding-right: 0.2rem;
      border: none;
      outline: none;
      background: transparent;
    }
  }
}
</style>
