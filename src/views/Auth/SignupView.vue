<template>
  <main>
    <basic-title-component
      title="新規登録" />

    <div class="input-box">
      <label>メールアドレス</label>
      <input type="email" v-model="user.mail" />
    </div>

    <div class="input-box">
      <label>パスワード</label>
      <input type="password" v-model="user.pass" />
    </div>

    <div class="link">
      <router-link to="/signin">既に会員の方はこちら</router-link>
    </div>

    <bottom-button-component
      content="使ってみる"
      @onclick="signup"/>
  </main>
</template>

<script>
  import BottomButtonComponent from '../../components/BottomButtonComponent'
  import BasicTitleComponent from '../../components/BasicTitleComponent'
  import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
  import { getFirestore, doc, setDoc } from 'firebase/firestore'
  export default {
    name: 'SignupView',
    components: {BasicTitleComponent, BottomButtonComponent},
    data () {
      return {
        user: {
          mail: '',
          pass: '',
        },
      }
    },
    methods: {
      async signup() {
        const auth = getAuth()
        const db = getFirestore()
        if (this.user.mail === '' || this.user.pass === '') {
          return
        }

        const res = await createUserWithEmailAndPassword(
          auth,
          this.user.mail,
          this.user.pass
        )

        // 新規ユーザのDB登録
        const user = res.user
        await setDoc(doc(db, 'users', user.uid), {
          id: user.uid,
          name: '',
          icon: '',
          follow: [],
          bookmark: [],
        })
        // 試験問題へ遷移
        const message = '新規登録が完了しました'
        this.$router.push(`/?message=${message}`)
      }
    },
  }
</script>

<style scoped lang="scss">
  // 入力欄
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

  // リンク
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