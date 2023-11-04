<template>
  <main>
    <!-- プロフィール情報 -->
    <img
      class="user-icon"
      v-if="userInfo.icon"
      :src="userInfo.icon"
      :alt="userInfo.name" />
    <img
      class="user-icon"
      v-else
      src="../assets/img/default-icon.jpg"
      :alt="userInfo.name" />

    <h2>
      {{ userInfo.name ? userInfo.name : userInfo.id }}
    </h2>
    <div
      class="user-params">
      <div
        class="user-params__content">
        <span>
          フォロワー
        </span>
        {{ userInfo.follow.length.toLocaleString() }}
      </div>
      <div
        class="user-params__content">
        <span>
          作成プラン
        </span>
        {{ userInfo.follow.length.toLocaleString() }}
      </div>
    </div>

    <button
      class="create-plan"
      @click="$router.push('/mypage/new')">
      + プランを作成する
    </button>

    <!-- 投稿一覧 -->
    <selector-component
      :selects="selects"
      @update="changeMode"/>

    <!-- 検索結果 -->
    <plan-card-component
      v-for="(plan, i) in plans"
      :plan="plan"
      :key="i" />

    <!-- 編集ボタン -->
    <bottom-button-component
      content="プロフィール編集" />
  </main>
</template>

<script>
  import BottomButtonComponent from '../components/BottomButtonComponent'
  import SelectorComponent from '../components/SelectorComponent'
  import {getFirestore, doc, getDoc} from 'firebase/firestore'
  import {getAuth, onAuthStateChanged} from 'firebase/auth'
  import PlanCardComponent from '../components/PlanCardComponent'

  export default {
    name: 'MypageView',
    components: {PlanCardComponent, SelectorComponent, BottomButtonComponent},
    data() {
      return {
        userId: '',
        selects: ['作成プラン', 'ブックマーク'],
        userInfo: {
          id: '',
          name: '',
          icon: '',
          bookmark: [],
          follow: [],
        },
        plans: [],
      }
    },
    methods: {
      async getUserInfo() {
        const auth = getAuth()
        await onAuthStateChanged(auth, async (user) => {
          if (user) {
            this.userId = user.uid

            const db = getFirestore()

            const docRef = doc(db, 'users', this.userId)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
              console.log('Document data:', docSnap.data())
              this.userInfo = docSnap.data()
            } else {
              // docSnap.data() will be undefined in this case
              console.log('No such document!')
            }
          }
        })
      },
      getUserPlan() {
        // TODO: DBから特定のユーザが作成したプランを取得
      },
      getBookmark() {
        // TODO: ブックマークのID一覧から各プランの詳細を取得
      },
      changeMode(mode) {
        // TODO: モード切替
        console.log(mode)
      },
    },
    mounted() {
      // ログイン中のユーザ情報を取得
      this.getUserInfo()

      // TODO: 作成したプランを取得

      // TODO: 作成したプランを初期値として代入
      this.plans = [
        {
          title: 'カフェ巡り',
          images: [
            'https://lh5.googleusercontent.com/p/AF1QipOnvgXfhaXwYD76xkNFZxi8wnISpV74g4i_GIV_=w260-h175-n-k-no',
            'https://lh3.googleusercontent.com/p/AF1QipOeV7Bg39BDBEXftojerST6YGDwyjfg9Po91OTN=s680-w680-h510',
            'https://lh3.googleusercontent.com/p/AF1QipNv0HAt8ulc4KmOPkFvf_ioUVqxFyIv3y3eaUru=s680-w680-h510',
          ],
          price: 3000,
          duration: 60,
        },
        {
          title: 'カフェ巡り',
          images: [
            'https://lh5.googleusercontent.com/p/AF1QipOnvgXfhaXwYD76xkNFZxi8wnISpV74g4i_GIV_=w260-h175-n-k-no',
            'https://lh3.googleusercontent.com/p/AF1QipOeV7Bg39BDBEXftojerST6YGDwyjfg9Po91OTN=s680-w680-h510',
            'https://lh3.googleusercontent.com/p/AF1QipNv0HAt8ulc4KmOPkFvf_ioUVqxFyIv3y3eaUru=s680-w680-h510',
          ],
          price: 3000,
          duration: 60,
        },
      ]

      // TODO: ブックマークしたプランを取得
    },
  }
</script>

<style scoped lang="scss">
  .user-icon {
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #eeeeee;
    margin: 20px auto 10px;
  }
  h2 {
    text-align: center;
    font-weight: bold;
    font-size: 20px;
  }
  .user-params {
    display: block;
    text-align: center;
    margin: 10px auto 20px;

    .user-params__content {
      display: inline-block;
      font-weight: bold;
      margin: 0 10px;
      font-size: 28px;

      span {
        display: block;
        font-size: 14px;
        color: #FF5700;
      }
    }
  }

  // プラン作成ボタン
  .create-plan {
    display: block;
    width: 200px;
    height: 40px;
    line-height: 25px;
    margin: 0 auto;
    border-radius: 5px;
    background-color: #FFFFFF;
    color: #FF5700;
    font-weight: bold;
    font-size: 18px;
    border: 2px solid #FF5700;
    outline: none;
  }
</style>