<template>
  <div class="selector">
      <span
        :class="mode === 0 ? 'selected' : ''"
        @click="updateMode(0)">
        {{ selects[0] }}
      </span>
    <span
      :class="mode === 1 ? 'selected' : ''"
      @click="updateMode(1)">
        {{ selects[1] }}
      </span>
  </div>
</template>

<script>
  export default {
    name: 'SelectorComponent',
    props: {
      selects: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        mode: 0,
      }
    },
    methods: {
      updateMode(mode) {
        this.mode = mode
        // 親コンポーネントに変更を通知
        this.$emit('update', mode)
      },
    },
  }
</script>

<style scoped lang="scss">
  $service_color: #FF5700;
  .selector {
    height: 40px;
    margin: 20px 0 0;
    text-align: center;
    border-bottom: solid 2px #888888;

    span {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      margin: 0 40px;
      padding: 0 20px;
      color: #888888;
      font-weight: bold;
      cursor: pointer;

      &.selected {
        color: $service_color;
        cursor: default;
        border-bottom: solid 2px $service_color;
      }
    }
  }
</style>