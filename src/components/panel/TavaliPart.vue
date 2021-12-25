<template>
    <div class="part p-0 border my-2 rounded ">
        <!-- <button class="btn btn-secondary " @click="this.$emit('showBigTavalies')">Test</button> -->
        <!-- <button class="btn btn-secondary " @click="test">Test</button> -->
        <div class="p-0 rounded d-md-inline-flex">
            <div @click="goToPartDetails(part)" class="part-info m-0 rounded h-100 p-2 w-xs-100 w-md-25">
                {{ part?.origPieceName }} - {{ part?.name }} : 
            </div>
            <div v-if="part?.tasks" class="part-task mx-1 p-2 d-flex w-100 ">
                <input v-if="part?.tasks.find(task => task.tCount == this.tavaliCount)" 
                type="checkbox" class="form-check" style="flex-grow: 1"
                v-model="part.tasks.find(task => task.tCount == this.tavaliCount).done"
                >
                <span class="mx-2" style="flex-grow: 4">
                    <!-- {{ part?.tasks.find(task => task.tCount == 2)}} - {{ this.tavaliCount }} -->
                    {{ part?.tasks.find(task => task.tCount == this.tavaliCount)?.body }}
                </span>
            </div>
        </div>
        <button style="float:left; box-sizing: border-box;" class="btn btn-success m-1 m-sm-0" 
        @click="addTask(part, partIndex)"
        :disabled="disableAddButton(part, partIndex, this.tavaliCount)"
        >تکلیف جدید
        </button>

        <div  v-if="this.editMode?.[`${this.tavaliCount},${partIndex}`] == true">
            <input
            v-model="this.taskInput"
            class="form-control my-2 ms-3 w-75 align-self-center d-inline-block"
            placeholder="تکلیف جدید را وارد کنید"
            >
            <button class="btn btn-info" 
            @click="submitTask(part, partIndex, this.tavaliCount)" type="button" 
            :disabled="!this.taskInput"  >ثبت</button>
        </div>
    </div>
</template>

<script>
import router from '../../router/router'



export default {
    data() {
        return {
            editMode: {
                
            },
            taskInput: ''
        }
    },
    computed: {
        user() {
            return this.$store.getters.currentUser
        },
    },
    emits: ['showBigTavalies'],
    props: [
        'part',
        'partIndex',
        'tavaliCount',
        'tavaliesList',
        'tavali'
    ],
    methods: {
        addTask(part, index) {
            this.editMode[`${this.tavaliCount},${index}`] = true
        },
        submitTask(part, index, tavaliCount) {
            // if (!this.taskInput) return
            const esPart = this.user.establishedPieces[part.origLocation.piece].parts[part.origLocation.part]
            console.log('tavalicount ' + tavaliCount)
            if (!part.tasks) part.tasks = [];
            if (!esPart.tasks) esPart.tasks = [];
            const newTask = {
            body: this.taskInput,
            done: false,
            tCount: this.findNextTime({ part , tavaliCount })
            }
            part.tasks.push(newTask)
            // esPart.tasks.push(newTask)
            this.taskInput = ''
            this.editMode[`${this.tavaliCount},${index}`] = false

        },
        findNextTime({ part , tavaliCount}) {
        // if (!this.user.bigTavaliesList) this.$emit('showBigTavalies')
        this.$emit('showBigTavalies')
        const TList = this.user.bigTavaliesList;
        const tavaliesFromHere = TList.slice(tavaliCount+1);
        const targetTavali = tavaliesFromHere.find(tavali => tavali.parts.find(p => p.name == part.name && p.origPieceName == part.origPieceName))
        console.log(targetTavali.count)
        return targetTavali.count
        },

        goToPartDetails(p) {
            console.log(p)
            // find this part location among establishedPieces.
            let { part: partIndex , piece : pieceIndex } = p.origLocation
            console.log(pieceIndex, partIndex)
            // console.log(this.user.establishedPieces[p.])
            router.push({ name : 'part-details', params: {id: this.user.id , pid: p.origPieceName+'-'+p.name , partOrigLocation: [pieceIndex, partIndex] }})
        },
        test() {
            console.log(this.tavaliCount)
        },
        disableAddButton(part, partIndex, tCount) {
            if (!part) return false
            if (!part.tasks ) return false
            // const isThereATask = part.tasks.find(task => task.tCount == tCount)
            const isThereATask = part?.tasks?.find(task => task.tCount == tCount)
            console.log(isThereATask)
            return false
        }
    }
}
</script>