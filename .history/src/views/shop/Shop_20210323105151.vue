<template>
    <ShopInfo />
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
      const result = get(`/api/shop/${route.params.id}`)
      if (result?.errno === 0 && result?.data) {
        data.item = result.data
      }
    }
    getItemData()
    return { data }
  }
}
</script>

<style lang="less" scoped>

</style>
