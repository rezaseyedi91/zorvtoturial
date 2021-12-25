<template>
    <div class="h-100 user-portal-container " dir="rtl">
        <panel-nav-bar :user="this.user" ></panel-nav-bar>


        <router-view></router-view>
        <div>
        </div>
    </div>
</template>
<script>
import PanelNavBar from './panel/PanelNavBar.vue'


export default {
    computed: {
        user() {
            return this.$store.getters.currentUser || this.$store.state.users[0]
        }
    },
    components: {
        PanelNavBar
    }
}
</script>