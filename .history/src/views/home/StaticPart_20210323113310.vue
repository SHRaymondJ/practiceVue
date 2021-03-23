<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe64f;</span>
    北京理工大学国防科技园2号楼10层
    <span class="iconfont position__notice">&#xe616;</span>
  </div>
  <div class="search">
    <span class="iconfont search__icon">&#xe60c;</span>
    <input
      type="text"
      class="search__input"
      name=""
      id=""
      placeholder="山姆会员商店优惠商品"
    />
  </div>
  <div class="banner">
    <img src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt="" class="banner__img" />
  </div>
  <div class="icons">
    <div v-for="item in iconList" :key="item.icon" class="icons__item">
      <img :src="require(`../../assets/homepage/${item.icon}.png`)" alt="" class="icons__item__img" />
      <p class="icons__item__desc">{{ item.desc }}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>
<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconList = [
      { icon: '超市', desc: '超市便利' },
      { icon: '菜市场', desc: '菜市场' },
      { icon: '水果店', desc: '水果店' },
      { icon: '鲜花', desc: '鲜花绿植' },
      { icon: '医药健康', desc: '医药健康' },
      { icon: '家居', desc: '家居时尚' },
      { icon: '蛋糕', desc: '烘培蛋糕' },
      { icon: '签到', desc: '签到' },
      { icon: '大牌免运', desc: '大牌免运' },
      { icon: '红包', desc: '红包套餐' }
    ]
    return { iconList }
  }
}
</script>
<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";
.position {
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  @include ellipsis;
  .position__icon {
    font-size: 0.2rem;
    position: relative;
    top: 0.01rem;
  }
  .position__notice {
    font-size: 0.2rem;
    position: absolute;
    top: 0.17rem;
    right: 0;
  }
}
.search {
  position: relative;
  line-height: 0.32rem;
  margin-bottom: 0.12rem;
  color: $search-color;
  &__input {
    height: 0.32rem;
    line-height: 0.32rem;
    background: $content-bgColor;
    border-radius: 16px;
    padding-left: 0.44rem;
    outline: none;
    border: none;
    width: 100%;
    font-size: $input-fs;
    box-sizing: border-box;
  }
  .search__icon {
    position: absolute;
    font-size: 0.2rem;
    left: 0.14rem;
  }
}
.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  margin-bottom: .16rem;
  &__img {
    width: 100%;
    display: block;
    // height: .86rem;
    // border-radius: .1rem;
  }
}
.icons{
  width: 100%;
  display: flex;
  padding-bottom: .16rem;
  flex-wrap: wrap;
  &__item{
    width: 20%;
    &__img{
      width: .4rem;
      height: .4rem;
      display: block;
      margin: 0 auto .06rem;
    }
    &__desc{
      color: $content-fc;
      font-size: .13rem;
      text-align: center;
    }
  }
}
.gap{
  height: .1rem;
  background-color: $gray-bgColor;
  margin: 0 (-$box-side);
}
</style>
