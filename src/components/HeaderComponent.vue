<template>
  <header>
    <!-- navigation -->
    <navigation-component
      :authed="authed"/>

    <!-- message modal -->
    <notify-modal-component
      v-if="modal_message.enable"
      :message="modal_message.message"
      @close="modal_message.enable = false" />
  </header>
</template>

<script>
  import NavigationComponent from './NavigationComponent'
  import {getAuth, onAuthStateChanged} from 'firebase/auth'
  import NotifyModalComponent from './NotifyModalComponent'
  export default {
    name: 'HeaderComponent',
    components: {NotifyModalComponent, NavigationComponent},
    data() {
      return {
        authed: true,
        modal_message: {
          message: '',
          enable: false,
        }
      }
    },
    methods: {
      async getUserInfo (){
        const auth = getAuth()
        await onAuthStateChanged(auth, async (user) => {
          this.authed = (user !== null)
        })
      },
      messageModal () {
        if ('message' in this.$route.query) {
          this.modal_message.message = this.$route.query['message']
          this.modal_message.enable = true
        }
      }
    },
    mounted() {
      this.getUserInfo()
      this.messageModal()
    },
    updated() {
      this.getUserInfo()
    },
    watch: {
      '$route.query.message': function() {
        this.messageModal()
      }
    },
  }
</script>

<style scoped lang="scss">
  header {
    position: fixed;
    z-index: 200;
    display: block;
    width: 100%;
    height: 60px;
    background-color: #ffffff;
  }
</style>