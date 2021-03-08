<template>
  <div class="wrapper">
    <StaticPart />
    <Nearby />
  </div>
  <Docker />
</template>
<script>
import Docker from './views/home/Docker'
import StaticPart from './views/home/StaticPart'
import Nearby from './views/home/Nearby'

export default {
  name: 'App',
  components: { Docker, StaticPart, Nearby }
}
</script>
<style lang="scss">
@import './style/variables.scss';
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
