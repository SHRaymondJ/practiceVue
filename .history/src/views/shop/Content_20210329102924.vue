<template>
  <div class="content">
    <ul class="content__category">
      <li
        v-for="category in categories"
        :key="category.tab"
        :class="{
          content__item: true,
          'content__item--active': category.tab === currentTab,
        }"
        @click="handleCategoryClick(category.tab)"
      >
        {{ category.name }}
      </li>
    </ul>
    <div class="products">
      <div
        v-for="item in contentList"
        :key="item._id"
        class="products__item"
        v-show="item.imgUrl"
      >
        <img class="products__item__img" :src="item.imgUrl" alt="" />
        <div class="products__item__detail">
          <h4 class="products__item__tittle">
            {{ item.name }}
          </h4>
          <p class="products__item__sales">月售{{ item.sales }}件</p>
          <p class="products__item__price">
            <span class="products__item__yen">&yen;</span>{{ item.price }}
            <span class="products__item__origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product__number">
          <span
            class="product__number__minus"
            @click="changeCartItemInfo(shopId, item._id, item, -1)"
          >-</span>
          {{ cartList?.[shopId]?.[item._id]?.count || 0 }}
          <span
            class="product__number__plus"
            @click="changeCartItemInfo(shopId, item._id, item, 1)"
            >+</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { get } from '../../utils/request'
import { useCommonCartEffect } from './commonCartEffect'

const categories = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }
]
// 分类切换相关的逻辑
const useTabEffect = (getContentData) => {
  const currentTab = ref(categories[0].tab)
  const handleCategoryClick = (tab) => {
    currentTab.value = tab
  }

  return { categories, handleCategoryClick, currentTab }
}

// 列表内容相关的逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({ contentList: [] })
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value // 这个是依赖项
    })
    if (result?.errno === 0 && result?.data?.length) {
      content.contentList = result.data
    }
  }

  // 监听函数内依赖项的变化，对页面进行渲染
  watchEffect(() => {
    getContentData()
  })
  const { contentList } = toRefs(content)

  return { getContentData, contentList }
}

export default {
  name: 'Content',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { handleCategoryClick, currentTab } = useTabEffect()
    const { contentList } = useCurrentListEffect(currentTab, shopId)
    const { cartList, changeCartItemInfo } = useCommonCartEffect()

    return {
      contentList,
      handleCategoryClick,
      currentTab,
      categories,
      shopId,
      cartList,
      changeCartItemInfo
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";
.content {
  display: flex;
  position: absolute;
  top: 1.7rem;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  &__category {
    width: 20%;
    height: 100%;
    overflow-y: scroll;
    font-size: 0.14rem;
    text-align: center;
    background-color: $content-bgColor;
  }
  &__item {
    line-height: 0.4rem;
    @include ellipsis;
    &--active {
      background-color: $bgColor;
    }
  }
}

.products {
  flex: 1;
  background-color: $bgColor;
  overflow-y: scroll;
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 1px solid $gray-bgColor;
    &__img {
      width: 0.68rem;
      height: 0.68rem;
      margin-right: 0.16rem;
    }
    &__detail {
      overflow: hidden;
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
      bottom: 0.12rem;
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
