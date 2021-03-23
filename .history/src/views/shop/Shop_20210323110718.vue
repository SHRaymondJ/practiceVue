<template>
  <div class="wrapper">
    <ShopInfo :item="item" v-show="item.imgUrl" :hideBorder="true" />
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'

export default {
  name: 'Shop',
  components: { ShopInfo },
  setup () {
    // const router = useRouter()
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
    getItemData()
    return { item }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
.shop {
  padding: 0 $box-side;
}
</style>
