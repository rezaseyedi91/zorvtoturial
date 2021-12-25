<template>
        <div style="background-color: #f6f6f6" dir="" class="row">
            <div class="col col-md-10">
                <div class="my-5" v-for="(Skey, index) in linkKeys" :key="index">
                    {{ Skey }} : {{ links[Skey] }}
                    <button class="btn btn-danger" @click="deleteKey(this.links, Skey)">delete</button>
                </div>
            </div> 
            <hr>
            <div class="col col-md-10">
                <h2 class="p-2 m-2">State Users:</h2>
                <div class="my-5" v-for="(user, index) in users" :key="index">
                    {{ user?.userNum }} : {{ user }}
                    <button class="btn btn-danger" @click="deleteUser(this.users, index)">delete</button>
                </div>
            </div>
        </div>
</template>
<style scoped>

</style>


<script>
import { mapState } from "vuex"

export default {
    computed: {
        ...mapState(['users']),
        links() {
            return this.$store.state.links
        },
        linkKeys() {
            return Object.keys(this.links)
        },
        
    },
    methods: {
        // deleteKey(object, key) {
        //     console.log(key)
        //     delete object[key]
        //     this.$store.dispatch('updateBackLinks')
        // },
        deleteUser(array, index) {
            this.$store.dispatch('deleteFrontBackUsers', index)
        },
        created() {
            
        },
    }
}
</script>