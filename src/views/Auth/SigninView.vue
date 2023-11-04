<template>
  <main>
    <basic-title-component
      title="サインイン" />

    <div class="input-box">
      <label>メールアドレス</label>
      <input type="email" v-model="user.mail" />
    </div>

    <div class="input-box">
      <label>パスワード</label>
      <input type="password" v-model="user.pass" />
    </div>

    <div class="link">
      <router-link to="/signup">会員登録されていない方はこちら</router-link>
    </div>

    <bottom-button-component
      content="サインインする"
      @onclick="signin"/>
  </main>
</template>

<script>
  import BasicTitleComponent from '../../components/BasicTitleComponent'
  import BottomButtonComponent from '../../components/BottomButtonComponent'
  import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
  export default {
    name: 'SigninView',
    components: {BottomButtonComponent, BasicTitleComponent},
    data () {
      return {
        user: {
          mail: '',
          pass: '',
        },
      }
    },
    methods: {
      async signin() {
        const auth = getAuth()
        if (this.user.mail === '' || this.user.pass === '') {
          return
        }

        await signInWithEmailAndPassword(auth, this.user.mail, this.user.pass)

        // リダイレクト先またはホーム画面へ遷移
        const message = 'ログインしました'
        if ('redirect' in this.$route.query) {
          this.$router.push(
            `${this.$route.query['redirect']}?message=${message}`
          )
        } else {
          this.$router.push(`/?message=${message}`)
        }
      }
    },
  }
</script>

<style scoped lang="scss">

  .input-box {
    margin:  40px auto 0;
    label {
      display: block;
      width: 300px;
      max-width: 90%;
      margin: 0 auto 10px;
      text-align: left;
      font-weight: bold;
    }

    input[type=email], input[type=password] {
      display: block;
      width: 280px;
      max-width: calc(90% - 20px);
      height: 40px;
      margin: 0 auto;
      padding: 0 10px;
      border: 1px solid #707070;
      border-radius: 5px;
    }
  }

  .link {
    display: block;
    margin: 20px auto 40px;
    text-align: center;

    :link, :visited {
      font-weight: bold;
      font-size: 16px;
      color: #888888;
    }
  }
</style>