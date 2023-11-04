<template>
  <div
    class="back">
    <div
      class="modal">
      <div
        class="close-button">
        <span
          @click="$emit('close')">
          <img
            src="../assets/img/close-icon.svg" />
        </span>
      </div>

      <input
        type="text"
        placeholder="追加したい場所を検索"
        v-model="text">

      <ul>
        <li
          v-for="(candidate, i) in candidates"
          @click="$emit('add', candidate)"
          :key="i">
          {{ candidate.displayName.text }}
          <span>
            {{ candidate.shortFormattedAddress }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { getFunctions, httpsCallable } from 'firebase/functions'

  export default {
    name: 'SearchCandidateModalComponent',
    data() {
      return {
        text: '',
        candidates: [],
      }
    },
    props: {
      lat: {
        required: true,
      },
      lng: {
        required: true,
      },
    },
    methods: {
      getCandidates() {
        console.log(this.text)
        const functions = getFunctions()
        const getCandidates = httpsCallable(functions, 'getCandidates')
        getCandidates({
          text: this.text,
          lat: this.lat,
          lng: this.lng,
        })
          .then((res) => {
            const data = res.data.data
            console.log(data)
            this.candidates = data.places
          })
      },
    },
    watch: {
      text: function(newVal) {
        console.log(this.lat)
        console.log(this.lng)
        if (newVal.length > 1) {
          this.getCandidates()
        }
      }
    },
  }
</script>

<style scoped lang="scss">
.back {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 300;
  display: block;
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,.3);

  .close-button {
    display: block;
    height: 1px;
    width: 100%;
    text-align: center;

    span {
      transform: translateY(-100px);
      display: inline-block;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #FFFFFF;

      img {
        height: 30px;
        width: 30px;
        margin: 15px;
        padding: 0;
      }
    }
  }

  .modal {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 301;
    display: block;
    width: 100%;
    min-height: 200px;
    padding: 20px 0;
    background-color: #FFFFFF;
    border-radius: 10px 10px 0 0;

    input[type=text] {
      display: block;
      width: calc(90% - 20px);
      max-width: 400px;
      height: 40px;
      line-height: 40px;
      margin: 0 auto;
      padding: 0 10px;
      border: none;
      outline: none;
      background: none;
      border-bottom: solid 1px #888888;
      border-radius: 0;
      font-size: 20px;
    }
  }

  ul {
    padding: 0;
    margin: 0;
    max-height: 200px;
    overflow-y: scroll;
    li {
      display: block;
      padding: 10px 20px;
      font-size: 16px;
      list-style: none;
      border-bottom: solid 1px #888888;
      span {
        display: block;
        font-size: 14px;
        color: #888888;
      }
    }
  }
}
</style>