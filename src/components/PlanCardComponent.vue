<template>
  <div
    class="plan"
    @click="$emit()">
    <h3>{{ plan.title }}</h3>
    <div
      class="plan-images">
      <img
        v-for="(image, i) in plan.images"
        :src="image"
        :key="i"/>
    </div>
    <div
      class="plan-params">
      <span>
        <img
          src="../assets/img/timer-icon.svg">
        {{ plan.duration }}min
      </span>
      <span>
        <img
          src="../assets/img/price-icon.svg">
        &yen;{{ plan.price.toLocaleString() }}-
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PlanCardComponent',
    props: {
      plan: {
        type: Object,
        required: true,
      },
    },
  }
</script>

<style scoped lang="scss">
  .plan {
    display: block;
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px 0;

    h3 {
      font-weight: bold;
      font-size: 18px;
    }
  }

  // 画像
  .plan-images {
    margin: 10px 0 5px;

    img {
      display: inline-block;
      margin: 0;
      width: calc(100% / 3 - 10px);
      height: calc(90vw / 3 - 10px);

      &:nth-child(2) {
        margin: 0 5px;
      }
    }
  }

  // 下部パラメータ
  .plan-params {
    display: inline-block;
    height: 24px;
    line-height: 24px;
    vertical-align: top;
    font-size: 18px;

    span {
      display: inline-block;
      margin: 0 10px 0 0;
      color: #888888;
      height: 24px;
      line-height: 24px;

      img {
        height: 24px;
        vertical-align: top;
      }
    }

  }
</style>