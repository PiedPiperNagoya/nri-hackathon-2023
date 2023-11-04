<template>
  <div>
    <!-- ナビゲーション制御ボタン -->
    <div
      @click="opened = ! opened"
      :class="'nav-button' + (opened ? ' opened' : '')">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <!-- ナビゲーション -->
    <div
      v-if="opened"
      class="nav-back">
      <nav>
        <ul>
          <li @click="pageOpen('/')">
            <img src="../assets/img/home.svg">
            ホーム</li>
          <li v-if="authed" @click="pageOpen('/mypage')">
            <img src="../assets/img/mypage.svg">
            マイページ</li>
          <li v-else @click="pageOpen('/signin')">
            <img src="../assets/img/mypage.svg">
            ログイン</li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavigationComponent',
    props: {
      authed: {
        required: true,
        type: Boolean,
      },
    },
    data () {
      return {
        opened: false,
      }
    },
    methods: {
      pageOpen (path) {
        if (path !== this.$route.path) {
          this.opened = false
          this.$router.push(path)
        }
      },
    },
  }
</script>

<style scoped lang="scss">

  // ナビゲーション開閉ボタン
  $smnav-button-size: 28px;
  $smnav-button-line: 3px;
  .nav-button {
    position: fixed;
    z-index: 300;
    display: inline-block;
    top: 19px;
    right: 10px;
    width: $smnav-button-size;
    height: 22px;
    cursor: pointer;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all  0.3s ease;
    &:hover {
      opacity: .8;
    }

    span{
      display: inline-block;
      transition: all .4s;
      box-sizing: border-box;
      position: absolute;
      left: 0;
      width: 100%;
      height: $smnav-button-line;
      background-color: #222222;

      &:nth-of-type(1) {
        top: 0;
      }
      &:nth-of-type(2) {
        top: 10px;
      }
      &:nth-of-type(3) {
        top: 20px;
      }
    }

    // ナビゲーションオープン時スタイル
    &.opened {
      span{
        &:nth-of-type(1) {
          -webkit-transform: translateY($smnav-button-size/2 - ($smnav-button-line + 1)) rotate(-45deg);
          transform: translateY($smnav-button-size/2 - ($smnav-button-line + 1)) rotate(-45deg);
        }
        &:nth-of-type(2) {
          right: -50%;
          opacity: 0;
          -webkit-animation: active-menu-bar02 .8s forwards;
          animation: active-menu-bar02 .8s forwards;
        }
        &:nth-of-type(3) {
          -webkit-transform: translateY(-$smnav-button-size/2 + ($smnav-button-line + 1)) rotate(45deg);
          transform: translateY(-$smnav-button-size/2 + ($smnav-button-line + 1)) rotate(45deg);
        }
      }
    }
  }

  // ナビゲーション表示時背景
  .nav-back {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 299;
    display: block;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, .6);
  }

  // ナビゲーションのスタイル
  nav {
    position: fixed;
    right: 0;
    top: 0;
    width: 200px;
    z-index: 200;
    padding: 40px 30px 0;
    height: calc(100vh - 40px);
    background-color: #FFFFFF;
    overflow-y: auto;
    animation: slidein-anim .3s linear forwards;

    ul {
      padding: 0;
      li {
        font-weight: bold;
        font-size: 16px;
        line-height: 30px;
        height: 30px;
        margin-top: 20px;
        vertical-align: top;
        cursor: pointer;
        -webkit-transition: all 0.3s ease;
        -moz-transition: all 0.3s ease;
        -o-transition: all 0.3s ease;
        transition: all  0.3s ease;
        list-style: none;
        &:hover {
          opacity: .8;
        }
        img {
          height: 24px;
          margin-top: 3px;
          vertical-align: top;
        }
      }
    }
  }

  @keyframes slidein-anim {
    0% {
      right: -200px;
    }
    100% {
      right: 0;
    }
  }
</style>