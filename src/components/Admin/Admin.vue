<template>
  <div>
    Admin
  </div>
</template>
<script>
import {getAdmin} from './model'
export default {
  name: 'Admin',
  data () {
    return {

    }
  },
  methods: {
    getAdminUser () {
      getAdmin().then(res => {
        console.log(res,88888)
      })
    }
  },
  created() {
    this.getAdminUser()
  }
}
</script>
<style lang="stylus" scoped>
  
</style>