<template>

    <div dir="rtl" id="level1container"  class="container p-relative pb-4 mb-5">
        <!-- onclick="level1Submit()" -->
        <button id="level1submit" style="float: left;" class="btn btn-success mt-2 p-absolute"  @click="createPlanStep1([...this.piecesInputFiltered])">مرحله بعد
            <i class="fas fa-angle-left" style="vertical-align: middle;"></i>
        </button>

                <!-- <button data-bs-toggle="collapse" data-bs-target="#mycol">coll</button> -->
        <div class="form ">
            <form id="form-tag" class="mb-3">
                <div v-for="(piece, index) in piecesInputFiltered" :key="index"  class=" collapse rowInp row d-flex justify-content-space-around">
                    <div class="col-md-4">
                        <input class="inputs form-control py-2" 
                        :name="piece.id" 
                        :placeholder="piece.placeholder"
                        v-model="piece.name"
                        :id="piece.id" type="text"
                        @focus="pieceInputFocus(piece, index)"
                        >
                        <!-- @blur="partsCostumizerBlur($event, piece.placeholder)" -->
                    </div>
                    <div class="col-md-3 col-12 input-group flex-column flex-sm-row select-div collapse show" 
                    :id="`${piece.id}-select-div`" >
                        <select 
                        :ref="piece.id" 
                        :class="{'max-width-1' :  piece.partsCount > 0 , 'select-zero': this.$refs[piece.id]?.value == (undefined)}"
                        v-model="piece.partsCount" 
                        class="form-select form-control"
                        data-value="0" 
                        :id="`${piece.id}parts-select`"
                        >
                            <option  value="0">تعداد تکه‌ها   </option>
                            <option v-for="(partName , index) in piece.parts" :key="index" :value="index+1">{{ index+1 }}</option>
                        </select>


                        <input 
                        v-for="(part, index) in piece.parts.slice(0, piece.partsCount)" 
                        :key="index" 
                        type="text"
                        class="form-control costum-part-name-input"
                        :placeholder="part.name"
                        v-model="piece.parts[index].name"
                        @focus="$event.target.value = ''"
                        @blur="partsCostumizerBlur($event, part)"
                        >
                    </div>

                    
                </div>
            </form>
            <button id="add-btn"  class="btn btn-primary ms-5" @click="addPieceInput" :disabled="this.pieceCount+1>this.pieceInputData.length">افزودن ماده درسی</button>
            <!-- <button class="btn btn-secondary" @click="test">test</button> -->
        </div>
    </div>
</template>

<style scoped>
input {
display: inline-block !important;
height: 3rem !important;
}

select , input {
margin-top: .5rem;
margin-bottom: .5rem;
height: 2rem;
font-family:  "Vazir";
margin-left: 1rem;
margin-right: 0.5rem;
border-radius: 10px;
padding-top: 0.5rem;
padding-bottom: 0.5rem;
}

.max-width-1 {
    max-width: 4rem;
}

.row-for-inputs {
display: inline-block !important;
}

.inputs {
display: inline-block !important;
font-size: 1.1rem;
width: 100%;
flex-basis: 80%;

}

select {
font-size: 1.1rem ;
height: fit-content;
display: inline-block !important;
padding: 0;
max-width: 25%;
}

input:focus, select:focus {
outline: none;
}

input:disabled, select:disabled {
background-color: rgba(129, 126, 129, 0.1);;
}

.rowInp, .row {
    display: flex;
    align-items:stretch;
    width: 100%;
    }

select {
padding: .3rem .7rem;
height: 3rem;

}

.rowInp {
width: 100%;
}

.col {
position: relative;
border: 1px #630012 solid;
border-radius: 10px;
padding: 1rem;
margin-left: 1rem;
text-align: center;
color: #821d30;
background-image:linear-gradient(#fb6090,#ffc2d5, #fb6090) ;
box-shadow: 5px 5px 5px  #fb609138;
cursor: pointer;
}


.select-div {
flex-basis: 55%;
flex-grow: 5
}

.costum-part-name-input {
margin-left: 0.05rem;
margin-right: 0.05rem;
font-size: 1.1rem;
transition:all 0.5s ease;
}

.costum-part-name-input:focus {
width: 30%;

}
</style>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            engLetters: ["A", "B", "C", "D", "E", "F"],
            pieceCount: 1,
            pieceInputData: [
                    {
                    name: '',
                    id: 'pieceinput1',
                    placeholder: 'قطعه اول',
                    partsCount: 0,
                    parts: [
                        {
                            name: "A",
                            weight: 100
                        },
                        {
                            name: "B",
                            weight: 100
                        },
                        {
                            name: "C",
                            weight: 100
                        },
                        {
                            name: "D",
                            weight: 100
                        },
                        {
                            name: "E",
                            weight: 100
                        },
                        {
                            name: "F",
                            weight: 100
                        },
                    ]
                },
                                {
                    name: '',
                    id: 'pieceinput2',
                    placeholder: 'قطعه دوم',
                    partsCount: 0,
                    parts: [
                        {
                            name: "A",
                            weight: 100
                        },
                        {
                            name: "B",
                            weight: 100
                        },
                        {
                            name: "C",
                            weight: 100
                        },
                        {
                            name: "D",
                            weight: 100
                        },
                        {
                            name: "E",
                            weight: 100
                        },
                        {
                            name: "F",
                            weight: 100
                        },
                    ]
                },
                                {
                    name: '',
                    id: 'pieceinput3',
                    placeholder: 'قطعه سوم',
                    partsCount: 0,
                    parts: [
                        {
                            name: "A",
                            weight: 100
                        },
                        {
                            name: "B",
                            weight: 100
                        },
                        {
                            name: "C",
                            weight: 100
                        },
                        {
                            name: "D",
                            weight: 100
                        },
                        {
                            name: "E",
                            weight: 100
                        },
                        {
                            name: "F",
                            weight: 100
                        },
                    ]
                },
                                {
                    name: '',
                    id: 'pieceinput4',
                    placeholder: 'قطعه چهارم',
                    partsCount: 0,
                    parts: [
                        {
                            name: "A",
                            weight: 100
                        },
                        {
                            name: "B",
                            weight: 100
                        },
                        {
                            name: "C",
                            weight: 100
                        },
                        {
                            name: "D",
                            weight: 100
                        },
                        {
                            name: "E",
                            weight: 100
                        },
                        {
                            name: "F",
                            weight: 100
                        },
                    ]
                },
                                {
                    name: '',
                    id: 'pieceinput5',
                    placeholder: 'قطعه پنجم',
                    partsCount: 0,
                    parts: [
                        {
                            name: "A",
                            weight: 100
                        },
                        {
                            name: "B",
                            weight: 100
                        },
                        {
                            name: "C",
                            weight: 100
                        },
                        {
                            name: "D",
                            weight: 100
                        },
                        {
                            name: "E",
                            weight: 100
                        },
                        {
                            name: "F",
                            weight: 100
                        },
                    ]
                },
                                {
                    name: '',
                    id: 'pieceinput6',
                    placeholder: 'قطعه ششم',
                    partsCount: 0,
                    parts: [
                        {
                            name: "A",
                            weight: 100
                        },
                        {
                            name: "B",
                            weight: 100
                        },
                        {
                            name: "C",
                            weight: 100
                        },
                        {
                            name: "D",
                            weight: 100
                        },
                        {
                            name: "E",
                            weight: 100
                        },
                        {
                            name: "F",
                            weight: 100
                        },
                    ]
                },
                                {
                    name: '',
                    id: 'pieceinput7',
                    placeholder: 'قطعه هفتم',
                    partsCount: 0,
                    parts: [
                        {
                            name: "A",
                            weight: 100
                        },
                        {
                            name: "B",
                            weight: 100
                        },
                        {
                            name: "C",
                            weight: 100
                        },
                        {
                            name: "D",
                            weight: 100
                        },
                        {
                            name: "E",
                            weight: 100
                        },
                        {
                            name: "F",
                            weight: 100
                        },
                    ]
                },
                                {
                    name: '',
                    id: 'pieceinput8',
                    placeholder: 'قطعه هشتم',
                    partsCount: 0,
                    parts: [
                        {
                            name: "A",
                            weight: 100
                        },
                        {
                            name: "B",
                            weight: 100
                        },
                        {
                            name: "C",
                            weight: 100
                        },
                        {
                            name: "D",
                            weight: 100
                        },
                        {
                            name: "E",
                            weight: 100
                        },
                        {
                            name: "F",
                            weight: 100
                        },
                    ]
                },
            ]
        }
    },
    computed: {
        piecesInputFiltered() {
            return this.pieceInputData.slice(0, this.pieceCount)
        },
    },
    methods: {
        ...mapActions(['createPlanStep1', 'testModule']),
        addPieceInput() {
            this.pieceCount++;
            this.pieceInputFocus(null)

        },
        test() {
            let thisPieceSelect = this.$refs.pieceinput1.value
            console.log(thisPieceSelect)
        },
        partsCostumizerBlur(event, part) {
            if(event.target.value == '') {
                event.target.value = part.name || part
            }
            
        },
        pieceInputFocus(piece) {
            if (window.innerWidth >= 768) return
            const selectDivs = document.querySelectorAll('.select-div')
            const thisPieceSelectDiv = document.querySelector(`#${piece?.id}-select-div`)
            console.log(thisPieceSelectDiv)
            selectDivs.forEach(div => {
                div.classList.remove('show')
            })
            if (!piece) return
            thisPieceSelectDiv.classList.add('show')

        }


    }
}
</script>