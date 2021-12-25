<template>
    <div>

        <div class="container mt-3">
            <h2 class="mb-4">تکلیف‌های این تکه:</h2>
            <!-- <div>{{ part.tasks }}</div> -->
            <div style="display: grid; grid-template-columns: repeat(2, 1fr)" class="part-details-tasks">
                <div class="card my-2 mx-3" v-for="task in part.tasks" :key="task.body">
                    <div class="card-body">
                        <div class="d-flex align-items-center " >
                            <input class="form-check" style="flex-grow: 1" type="checkbox" v-model="task.done">
                            <div style="flex-grow: 4">
                                {{ task.body }}
                            </div>
                            <div style="flex-grow: 1">
                                <!-- {{ ta }} -->
                            </div>
                        </div>
                    </div>
                </div>
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
        part() {
            const origLocation = this.$route.params.partOrigLocation
            const [origPieceIndex, origPartIndex]  = origLocation
            return this.user.establishedPieces[origPieceIndex].parts[origPartIndex]
        },
         
    }
}
</script>