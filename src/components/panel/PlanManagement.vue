<template>
    <div>
        <h1 class="m-4">
             ویرایش پلان توالی 
        </h1>
        <div class="container px-3 px-sm-5 py-2">
            <!-- {{ this.pieces }} -->
            <!-- <button class="btn m-2 btn-secondary" @click="this.$store.dispatch('test')">Test</button> -->
            <button class="btn m-2 btn-secondary" @click="weight">Weight</button>
            <button class="btn m-2 btn-secondary" @click="saveEstablishedPieces">save pieces</button>
            <button class="btn m-2 btn-secondary" @click="saveModifiedPlan">save Plan</button>

            <button style="float: left;" class="btn btn-success mt-2 p-absolute"  @click="showTavalies">مرحله بعد
                <i class="fas fa-angle-left" style="vertical-align: middle;"></i>
            </button>


            <div v-for="(piece , pieceIndex) in this.pieces" :key="pieceIndex" class="row satr">
                
                <div v-for="(part, partIndex) in piece.parts" :key="partIndex" 
                class="part col"
                :ref="'part'+partIndex+'piece'+pieceIndex" 
                draggable="true"
                @dragstart="dragStart($event, [pieceIndex, partIndex])"
                @touchstart="dragStart($event, [pieceIndex, partIndex])"
                @dragenter="dragEnter($event)"
                @dragover="dragOver($event)"
                @touchover="dragOver($event)"
                @touchend="touchend($event)"
                @dragend="this.draggedStatus = false"
                @dragleave="dragLeave($event)"
                @drop="drop($event, [pieceIndex, partIndex])"
                  >{{part.origPieceName}}
                    <hr>
                    {{ part.name }} 
                 <!-- :style="{ backgroundColor:this.weightColor(part.weight)}" -->
                    <span class="weight badge rounded-pill">{{ part.weight }}</span>
                </div>
            </div>
            <div v-if="this.draggedStatus" class="row satr new-row">
                <div 
                @dragover="dragOver($event)"
                @dragleave="dragLeave($event)"
                @dragenter="dragEnter($event)"
                @drop="drop($event, [pieceIndex, partIndex])"
                    style="" class="part new-row"
                >افزودن سطر جدید
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import * as createPlan from '../../modules/createPlan'
import * as api from '../../store/apiManager'
import router from '../../router/router'
import { updateApiUserData } from '../../store/apiManager'


export default {
    data() {
        return {
            draggedStatus: false
        }
    },
    computed: {
        user() {
            return this.$store.getters.currentUser
        },
        pieces() {
            
            return this.user?.newPlanPieces
            return this.user?.modifiedPlan || this.user?.newPlanPieces
        },
        updated() {
            if (this.$store.state.updated == true) {
                console.log('true')
            }
            return this.$store.state.updated
        }
    },

    // updated() {
    //     this.weight(this.pieces)
    // },
    methods: {
        weight() {
            const refs = this.$refs
            const pieces = this.pieces
            this.$store.dispatch('weight',[ pieces, refs])
        },
        dragStart(event, [pieceIndex, partIndex]) {
            this.draggedStatus = true
            const pieces = this.pieces
            this.$store.dispatch('modifyPlanDragStart', { event, pieceIndex, partIndex, pieces})
        },
        saveEstablishedPieces() {

            this.$store.commit('SAVE_ESTABLISHED_PIECES', this.user.newPlanPieces)

            api.updateApiUserData(this.user)
            api.updateAllUsersData(this.$store.state)
        },
        dragOver(event) {
            createPlan.dragOver(event)
        },
        dragEnter(event) {
            createPlan.dragEnter(event)
        },
        dragLeave(event) {
            createPlan.dragLeave(event)
        },
        drop(event,  [pieceIndex, partIndex]) {
            
            const pieces = this.pieces
            const refs = this.$refs
            this.$store.dispatch('modifyPlanDrop', { event, pieceIndex, partIndex, pieces , refs })
            setTimeout(() => {
                this.weight()
            }, 10)
            // createPlan.drop(event,  [pieceIndex, partIndex])
            // this.draggedStatus = false
        },
        saveModifiedPlan() {
            this.$store.commit('SAVE_MODIFIED_PLAN', this.pieces)
            api.updateApiUserData(this.user)
            api.updateAllUsersData(this.$store.state)
        },
        showTavalies() {
            this.saveModifiedPlan();
            console.log(this.user.modifiedPlan)
            router.push({ name: 'tavalies'})
        },
        touchend(event,) {
            console.log(event)
        }

    },
    updated() {
        function touchHandler(event) {
    var touch = event.changedTouches[0];

    var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent({
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup"
    }[event.type], true, true, window, 1,
        touch.screenX, touch.screenY,
        touch.clientX, touch.clientY, false,
        false, false, false, 0, null);

    touch.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}
    }
}
</script>