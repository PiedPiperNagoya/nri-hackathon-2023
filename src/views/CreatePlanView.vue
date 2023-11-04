<template>
  <main>
    <!-- タイトル入力 -->
    <label>
      <input
        class="title-input"
        placeholder="プランにタイトルをつけよう"
        type="text"
        v-model="title" />
    </label>

    <!-- 一覧を表示 -->
    <div
      class="spot-list"
      v-for="(spot, i) in spots"
      :key="spot.id">
      <span
        class="spot-list__dot"></span>

      <div
        class="spot-list__text">
        <h3>
          {{ spot.displayName.text }}
        </h3>
        <p>
          {{ spot.shortFormattedAddress }}
        </p>
      </div>

      <div
        v-if="i < durations.length"
        class="spot-list__duration">
        <img
          src="../assets/img/walk-icon.svg">
        徒歩で{{ durations[i] }}分
      </div>
    </div>


    <!-- 追加ボタン -->
    <button
      class="add-new"
      @click="displayModal = true">
      + 新しい地点を追加
    </button>

    <!-- プランを作成 -->
    <div
      class="plan-footer">
      <div
        class="plan-footer__total">
        合計時間
        <span>
          <img
            src="../assets/img/timer-icon-w.svg" />
          {{ total.duration }}min
        </span>
      </div>
      <div
        class="plan-footer__total">
        合計予算
        <span>
          <img
            src="../assets/img/price-icon-w.svg" />
          &yen;{{ total.price.toLocaleString() }} -
        </span>
      </div>

      <button
        class="plan-footer__button"
        @click="createPlan">
        プラン作成
      </button>
    </div>

    <!-- 検索モーダル -->
    <search-candidate-modal-component
      v-if="displayModal"
      :lat="center.lat"
      :lng="center.lng"
      @close="displayModal = false"
      @add="addSpot"/>
  </main>
</template>

<script>
  import SearchCandidateModalComponent from '../components/SearchCandidateModalComponent'
  import {addDoc, collection, doc, getFirestore, setDoc} from 'firebase/firestore'
  import {getAuth, onAuthStateChanged} from 'firebase/auth'
  // import {getFunctions, httpsCallable} from 'firebase/functions'
  import GeoCalcurator from '../utils/GeoCalcurator'
  export default {
    name: 'CreatePlanView',
    components: {SearchCandidateModalComponent},
    data() {
      return {
        displayModal: false,
        title: '',
        spots: [],
        durations: [],
        userId: '',
        center: {
          lat: 0,
          lng: 0,
        },
        total: {
          duration: 0,
          price: 0,
        },
      }
    },
    methods: {
      createPlan() {
        // TODO: バリデーション
        if (this.spots.length < 1) {
          return
        }
        const db = getFirestore()

        // IDのみを抽出
        const spotIds = []
        for (const spot of this.spots) {
          // 各スポットをDBへ保管
          setDoc(doc(db, 'spots', spot.id), spot)
          spotIds.push(spot.id)
        }

        // 新規作成
        addDoc(collection(db, 'plans'), {
          id: '',
          title: this.title,
          creator: this.userId,
          price: this.total.price,
          duration: this.total.duration,
          spots: spotIds,
        })

        // マイページへ遷移
        this.$router.push('/mypage?message="プランを作成しました"')
      },
      addSpot(spot) {
        this.spots.push(spot)
        this.calcDistance()
        // const functions = getFunctions()
        // const getPhotoUrl = httpsCallable(functions, 'getPhotoUrl')
        // getPhotoUrl({ name: spot.photos[0].name })
        //   .then((res) => {
        //     const blob = new Blob([res.data.binary], {type: 'image/jpeg'})
        //     const reader = new FileReader()
        //     reader.readAsDataURL(blob)
        //     reader.onloadend = () => {
        //       spot.image = reader.result
        //       console.log(spot)
        //     }
        //   })
        this.displayModal = false
      },
      calcDistance() {
        this.total.duration = this.spots.length * 15
        this.total.price = this.spots.length * 1000
        if (this.spots.length < 2) {
          return
        }
        this.durations = []

        for (let i = 0; i < this.spots.length - 1; i++) {
          const distance = GeoCalcurator.geoCalc(this.spots[i].location, this.spots[i + 1].location)

          // 距離から歩く時間にして格納
          const duration = GeoCalcurator.disToDur(distance)
          this.durations.push(duration)
          this.total.duration += duration
        }
        console.log(this.durations)
      },
      async getUserInfo() {
        const auth = getAuth()
        await onAuthStateChanged(auth, async (user) => {
          if (user) {
            this.userId = user.uid
          } else {
            this.router.push('/signin')
          }
        })
      },
    },
    async mounted() {
      await navigator.geolocation.getCurrentPosition((position) => {
        this.center.lat = position.coords.latitude
        this.center.lng = position.coords.longitude
      })

      this.getUserInfo()
    },
  }
</script>

<style scoped lang="scss">
  .title-input {
    display: block;
    width: calc(90% - 20px);
    max-width: 400px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto 20px;
    padding: 0 10px;
    border: none;
    outline: none;
    background: none;
    border-bottom: solid 1px #888888;
    border-radius: 0;
    font-size: 20px;
  }

  // 新規追加ボタン
  .add-new {
    display: block;
    width: auto;
    margin: 20px auto 0;
    font-size: 18px;
    color: #FF5700;
    background-color: #FFFFFF;
    border: none;
    outline: none;
  }
  .spot-list {
    padding: 10px 0;
    .spot-list__dot {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin: 10px 10px;
      border-radius: 50%;
      background-color: #FF5700;
      vertical-align: top;
    }
    .spot-list__text {
      display: inline-block;
      height: 40px;
      width: calc(100% - 50px);
      vertical-align: top;
      h3 {
        margin: 0;
        padding: 0;
        font-size: 14px;
        line-height: 20px;
        height: 20px;
        overflow: hidden;
      }
      p {
        margin: 0;
        padding: 0;
        font-size: 14px;
        line-height: 20px;
        height: 20px;
        color: #888888;
        overflow: hidden;
      }
    }
    .spot-list__duration {
      display: block;
      height: 100px;
      line-height: 100px;
      margin: -20px 0 -40px 20px;
      padding: 0 0 0 5px;
      border-left: solid 2px #888888;
      color: #888888;
      font-weight: bold;

      img {
        height: 30px;
        margin: 35px 3px;
        vertical-align: top;
      }
    }
  }
  .plan-footer {
    position: fixed;
    left: 0;
    bottom: 0;
    display: block;
    width: 100%;
    background-color: #FF5700;
    padding: 10px;

    .plan-footer__total {
      display: inline-block;
      width: 120px;
      text-align: center;
      font-weight: bold;
      font-size: 14px;
      color: #FFFFFF;
      line-height: 30px;
      vertical-align: top;

      span {
        display: block;
        font-weight: normal;
        font-size: 20px;
        vertical-align: top;

        img {
          margin: 0;
          height: 30px;
          vertical-align: top;
        }
      }
    }
    .plan-footer__button {
      width: calc(100% - 240px - 30px);
      height: 60px;
      color: #FF5700;
      background-color: #FFFFFF;
      font-weight: bold;
      border: none;
      outline: none;
      border-radius: 5px;
      vertical-align: top;
    }
  }
</style>