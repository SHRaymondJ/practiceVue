<template>
  <div class="wrapper">
    <StaticPart />
    <Nearby />
  </div>
  <Docker />
</template>

<script>
import Docker from './Docker'
import StaticPart from './StaticPart'
import Nearby from './Nearby'

export default {
  name: 'Name',
  components: { Docker, StaticPart, Nearby }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
.wrapper {
  position: absolute;
  overflow-y: auto;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  padding: 0 $box-side;
}
</style>
