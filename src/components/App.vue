<template>
            <!-- <div class="loading"></div> -->

        <!-- <span class="bg-light fw-bold px-2 rounded py-1 m-1" :class="{'text-success  fw-bold': updated, 'text-danger': !updated}">
            The state has <span v-show="!updated">NOT</span> been successfully updated!
         </span> -->
        <!-- <button @click="testShowState" class="btn btn-info ms-3 mt-3">show me the state</button> -->
        <!-- <hr> -->
    <div class="container mt-5 " :class="{'body-loading': !updated}" >
        <!-- <login-page></login-page> -->

        <router-view></router-view>
    </div>
        


</template>

<script>
// import axios from 'axios'
import { mapGetters, mapState } from 'vuex'
import * as api from '../store/apiManager'
import LoginPage from './LoginPage.vue'
import SignUpPage from './SignUp.vue'
import AdminPortal from './../components/Admin.vue'
// import vueRouter from 'vue-router'
import axios from 'axios'

export default {
    name: 'App',
    data() {
        return {
            obj: [
    {
      name: "محمدرضا سیدی",
      id: "reza_seyedi",
      userNum: 0
    },
    {
      name: "عطیه قربانی",
      id: "atieh_ghorbani",
      userNum: 1
    }
  ]
        }
    },
    created() {
    let state = this.$store.state
    let commit = this.$store.commit

        this.$store.dispatch('initializeData')
    },
    computed: {
        ...mapState(['users', 'updated']),
    },
    components: {
        LoginPage,
        AdminPortal,
        SignUpPage,
        // RouterView
    },
    methods: {
        testShowState() {
            console.log(this.$store.state)
        }
    }
    
}
</script>