<template>
  <div class="wrapper">
      <div class="search">
          <div class="search__back" @click="locationBack"></div>
          <div class="search__content">
              <div class="search__content__icon"></div>
              <input type="text" class="search__content__input">
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

export default {
  name: 'Shop',
  components: { ShopInfo },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const data = reactive({
      item: {}
    })
    const getItemData = async () => {
      const result = await get(`/api/shop/${route.params.id}`)
      console.log(result)
      if (result?.errno === 0 && result?.data) {
        data.item = result.data
      }
    }
    const { item } = toRefs(data)
    const locationBack = () => {
      router.back()
    }
    getItemData()
    return { item, locationBack }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
.wrapper {
  padding: 0 $box-side;
}
.search{
    display: flex;
    margin: .2rem 0 .16rem 0;
    &__back{
        height: .32rem;
        widows: .3rem;
        background: #000;
    }
    &__content{
        display: flex;
        flex: 1;
        background: #f5f5f5;
        border-radius: .16rem;
        &__icon{
            width: .44rem;
            height: .32rem;
            background: blue;
        }
        &__input{
            display: block;
            width: 100%;
            padding-right: .2rem;
            border: none;
            outline: none;
        }
    }
}
</style>
