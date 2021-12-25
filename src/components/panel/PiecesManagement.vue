<template>
    <div>
        <div class="px-4 py-2">
            <h2 >EstablishedPieces Object</h2>
            <div v-for="(esPiece, esPieceIndex) in esPieces" :key="esPieceIndex"
            class="my-2 satr row"
            >
                <router-link 
                :to="{ name : 'part-details', params: {id: this.user.id , pid: esPart.origPieceName+'-'+esPart.name , partOrigLocation: [esPieceIndex, esPartIndex] }}" 
                v-for="(esPart, esPartIndex) in esPiece.parts" :key="esPartIndex" 
                class="part col"
                >
                <!-- @click="test(esPart)" -->
                    {{ esPart.origPieceName }}
                    <hr>
                    {{ esPart.name }}
                </router-link> 
            </div>
        </div>
    </div>
</template>


<script>
export default {
    computed: {
        user() {
            return this.$store.getters.currentUser
        },
        esPieces() {
            // console.log('trying')
            return this.user?.establishedPieces 
        }
    },
    methods: {
        test(p) {
            console.log(p)
        }
    }
}
</script>

<style scoped>
    a {
        text-decoration: inherit;
        color: inherit
    }
</style>