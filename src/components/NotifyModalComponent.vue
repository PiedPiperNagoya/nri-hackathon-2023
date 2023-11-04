<template>
  <div
    class="message_area">
    <div
      class="message_modal">
      {{ message }}

      <span class="time_gauge"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NotifyModalComponent',
    props: {
      message: {
        type: String,
        required: true,
      },
      displayTime: {
        type: Number,
        default: 2000,
      },
    },
    mounted() {
      // 一定時間でモーダルを閉じる
      setTimeout(
        () => {
          this.$emit('close')
        },
        this.displayTime
      )
    }
  }
</script>

<style scoped lang="scss">
  .message_area {
    position: fixed;
    z-index: 300;
    top: 20px;
    left: 0;
    display: block;
    width: 100%;
    .message_modal {
      position: relative;
      z-index: 300;
      display: block;
      width: calc(90% - 40px);
      margin: 0 auto;
      padding: 15px 20px;
      max-width: 380px;
      border-radius: 10px;
      background-color: #78ffbc;
      color: #287f69;
      font-weight: bold;
      overflow: hidden;

      .time_gauge {
        position: absolute;
        bottom: 0;
        left: 0;
        display: block;
        width: 0;
        height: 4px;
        background: #287f69;
        animation: gauge_anime 2.1s linear forwards;;
      }
    }
  }

  @-webkit-keyframes gauge_anime  {
    0%{
      width: calc(100% + 40px);
    }
    100%{
      width: 0;
    }
  }
  @keyframes gauge_anime  {
    0%{
      width: calc(100% + 40px);
    }
    100%{
      width: 0;
    }
  }
</style>