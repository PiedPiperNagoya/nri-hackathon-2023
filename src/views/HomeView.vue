<template>
  <main>
    <div
      class="top">
      <span>
        <img
          src="../assets/img/pin-icon.svg"
          alt="" />
        大田区羽田空港2丁目
      </span>
      <span>
        <img
          src="../assets/img/sort-icon.svg"
          alt="" />
        並べ替え
      </span>
    </div>

    <selector-component
      :selects="selects"
      @update="changeMode"/>

    <!-- 検索結果一覧 -->
    <div>
      <!-- ピックアッププラン -->
      <div
        class="plans-pickup">
        <h2>
          PickUp
          <span>人気のプランをピックアップ！</span>
        </h2>

        <plan-card-component
          :plan="pickup" />
      </div>

      <!-- 検索結果 -->
      <plan-card-component
        v-for="(plan, i) in plans"
        :plan="plan"
        :key="i" />
    </div>

    <bottom-button-component
      content="こだわって検索" />
  </main>
</template>

<script>
import BottomButtonComponent from '../components/BottomButtonComponent'
import SelectorComponent from '../components/SelectorComponent'
import PlanCardComponent from '../components/PlanCardComponent'
export default {
  name: 'Home',
  components: {PlanCardComponent, SelectorComponent, BottomButtonComponent},
  data() {
    return {
      selects: ['ショート旅', 'ロング旅'],
      pickup: {
        title: 'カフェ巡り',
        images: [
          'https://lh5.googleusercontent.com/p/AF1QipOnvgXfhaXwYD76xkNFZxi8wnISpV74g4i_GIV_=w260-h175-n-k-no',
          'https://lh3.googleusercontent.com/p/AF1QipOeV7Bg39BDBEXftojerST6YGDwyjfg9Po91OTN=s680-w680-h510',
          'https://lh3.googleusercontent.com/p/AF1QipNv0HAt8ulc4KmOPkFvf_ioUVqxFyIv3y3eaUru=s680-w680-h510',
        ],
        price: 3000,
        duration: 60,
      },
      plans: [
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
      ],
    }
  },
  methods: {
    getLocation() {
      // TODO: 現在の座標を取得

      // TODO: 座標から住所文字列を取得
    },
    changeMode(mode) {
      // TODO: モード切替
      console.log(mode)

      // オススメのプランを取得
      this.getPickupPlan()

      // プラン一覧を取得
      this.getPlans()
    },
    getPickupPlan() {
      // TODO: オススメのプランを取得
    },
    getPlans() {
      // TODO: プランの一覧取得
    },
  },
  mounted() {
    // 現在地を取得
    this.getLocation()

    // オススメのプランを取得
    this.getPickupPlan()

    // プラン一覧を取得
    this.getPlans()
  },
}
</script>

<style scoped lang="scss">
  main {
    padding-bottom: 80px;
  }
  .top {
    position: relative;
    display: block;
    width: 90%;
    max-width: 400px;
    margin: 0 auto;

    span {
      display: inline-block;
      height: 24px;
      line-height: 24px;
      vertical-align: top;
      font-size: 14px;

      &:first-child {
        color: #FF5700;
      }
      &:nth-child(2) {
        position: absolute;
        right: 0;
      }
      img {
        height: 24px;
        width: auto;
        vertical-align: top;
      }
    }
  }

  .plans-pickup {
    background-color: #FFF4EE;
    padding: 20px 0;

    h2 {
      display: block;
      width: 90%;
      max-width: 400px;
      margin: 0 auto;
      font-weight: bold;
      font-size: 20px;

      span {
        display: inline-block;
        margin: 0 0 0 10px;
        font-weight: normal;
        font-size: 14px;
      }
    }
  }
</style>
