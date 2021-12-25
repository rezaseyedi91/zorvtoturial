<template>
    <div class="p-3 tavali-list">
        <!-- <button class="btn btn-secondary mb-2 mx-2 " @click="showBigTavalies">Test</button> -->
        <button class="btn btn-secondary mb-2" @click="this.$store.dispatch('saveUsersInApi')">Save User Info</button>
        <button class="btn btn-secondary mb-2 mx-2" @click="tavaliGen">generate tavali</button>
        <div class="d-flex flex-column justify-content-between  ">
            <h2 class="col col-sm-6 mb-4 my-sm-2">توالی‌های من</h2>
            <div class="col col-sm-6">
                <span>از</span>
                <input type="tel" v-model="tavaliCountFromInput" class="form-control d-inline-block mx-2 text-center" style="width:2.8rem" maxlength="2">
                <span>تا</span>
                <input type="tel" v-model="tavaliCountToInput" class="form-control d-inline-block mx-2 text-center" style="width:2.8rem" maxlength="2">
            </div>
        </div>
        <div class="tavali card w-md-75 my-4 p-3" v-for="tavali in tavaliesList" :key="tavali.count">
            <h4 lang="fa" class="text-muted" >توالی شماره {{ tavali.count+1 }}</h4>

            <TavaliPart  v-for="(part, index) in tavali.parts" :key="index" 
            :part="part" :partIndex="index" :tavaliCount="tavali.count" :tavali="tavali" :tavaliesList="tavaliesList"
            @showBigTavalies="showBigTavalies"
            ></TavaliPart>
        </div>

    </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'
import TavaliPart from './TavaliPart.vue'

export default {
    data() {
        return {
            tavaliCountFromInput: 1,
            tavaliCountToInput: 10
        }
    },
    created() {
        if (this.user) this.tavaliGen()
    },
    updated() {

        if (this.user) this.tavaliGen()
    },
    computed: {
        user() {
            return this.$store.getters.currentUser
        },
        plan() {
            return this.user?.modifiedPlan
        },
        pieces() {
            return this.user.establishedPieces
        },
        tavaliesList() {
            return this.user?.tavaliesList
        }
    },
    methods: {
        ...mapActions(['generateTavali']),
        tavaliGen() {
            // console.log(this.plan)
            this.generateTavali([this.plan, this.pieces, this.tavaliCountFromInput-1, this.tavaliCountToInput-1])
        },
        showBigTavalies() {
            this.generateTavali([this.plan, this.pieces, this.tavaliCountFromInput-1,  Number(this.tavaliCountFromInput)+19])
            console.log(this.user.bigTavaliesList)
            return this.user.bigTavaliesList
        }

    },
    components: {
        TavaliPart
    }
}
</script>