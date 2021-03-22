<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="wrapper__img" />
    <div class="wrapper__input">
      <input
        type="text"
        class="wrapper__input__content"
        placeholder="请输入用户名"
        v-model="data.username"
      />
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        placeholder="请输入密码"
        v-model="data.password"
      />
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登陆</div>
    <div class="wrapper__login-link">
      <span @click="handleRegisterClick">立即注册</span><span>忘记密码</span>
    </div>
  </div>
  <Toast v-if="toastData.showToast" :message="toastData.toastMessage"/>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

export default {
  name: 'Login',
  components: { Toast },
  setup () {
    const router = useRouter() // useRouter提供了路由实例

    const data = reactive({
      username: '',
      password: ''
    })
    const { toastData, showToast } = useToastEffect()
    const handleLogin = async () => {
      try {
        const result = await post('/api/user/login', {
          username: data.username,
          password: data.password
        })
        if (result?.errno === 0) {
          localStorage.isLogin = true
          router.push({ name: 'Home' }) // 通过router.push()跳转页面
        } else {
          showToast('登陆失败')
        }
      } catch (e) {
        showToast('请求错误')
      }
    }
    const handleRegisterClick = () => {
      router.push({ name: 'Register' })
    }
    return { handleLogin, handleRegisterClick, data, toastData }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto 0.4rem auto;
    width: 0.66rem;
    height: 0.66rem;
  }
  &__input {
    font-size: 0.16rem;
    box-sizing: border-box;
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    padding: 0 0.16rem;
    background: #f9f9f9;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    &__content {
      line-height: 0.48rem;
      border: none;
      outline: none;
      width: 100%;
      background: none;
      color: $content-notice-fc;
      &::placeholder {
        color: $content-notice-fc;
      }
    }
  }
  &__login-button {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    line-height: 0.48rem;
    background: #0091ff;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    color: #fff;
    font-size: 0.16rem;
    text-align: center;
  }
  &__login-link {
    font-size: 0.14rem;
    text-align: center;
    color: $content-notice-fc;
    span {
      padding: 0 0.1rem;
      border-right: 1px solid $content-notice-fc;
      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
