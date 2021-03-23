<template>
  <ShopInfo v-for="item in data" :key="item._id" :item="item" v-show="item.imgUrl"/>
</template>

<script>
import { useRoute } from 'vue-router'
import { reactive } from 'vue'
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
    getItemData()
    return { data }
  }
}
</script>

<style lang="less" scoped></style>
