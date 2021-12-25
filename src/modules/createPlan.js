import * as api from '../store/apiManager'
import router from '../router/router'
import { SAVE_ESTABLISHED_PIECES } from '../store/mutation-types'
import * as types from '../store/mutation-types'

export const testModule = () => {
    console.log('im module')
}

export const createPlanStep1 = ({ commit, state, getters, dispatch }, piecesInput) => {
    // const currentUser = getters.currentUser
    let currentUser = state.users.find(user => user.userNum == state.currentUserIndex)
    //removing extra parts
    piecesInput.forEach((piece, pieceIndex) => {
        piece.parts = piece.parts.slice(0 , piece.partsCount)
        delete piece.placeholder
        piece.parts.forEach((part, partIndex) => {
            part.origPieceName = piece.name,
            part.origLocation = { 'piece': pieceIndex , 'part' : partIndex}
        })
    })


    // });
    currentUser.newPlanPieces = [...piecesInput]
    commit(SAVE_ESTABLISHED_PIECES, [...piecesInput])
    // currentUser.newPlanPieces.unshift({item: 'test'})
    // console.log('piecesInput: '+piecesInput)
    // console.log('currentUser.newPlanPieces: '+currentUser.newPlanPieces)
    if (currentUser.modifiedPlan) {
        delete currentUser.modifiedPlan
    } 
    console.log(currentUser)
    dispatch('saveUserInfo')
}

// weight KMM - LMC and    BMM - GCB

export const weightCalcul = (pieces) => {
    //special condition: we have just one piece
    
    
    //
    
    let rowLengths = []
    pieces.forEach((piece, index) => {
        if (piece.parts.length == 0) pieces.splice(index, 1)
        if (rowLengths.indexOf(piece.parts.length) == -1) {
            rowLengths.push(piece.parts.length)
        }
    })
    
    
    // LCM 
    
    // const lcm  = rowLengths.length == 1 ?  [rowLengths[0], rowLengths[0]] : LCM(rowLengths)
    // console.log(lcm)
    const lcm  = LCM(rowLengths)

    
    const piecesCount = pieces.length;
    pieces.forEach((piece) => {
        piece.parts.forEach(part => {
            let total  = lcm * piecesCount;
            part.weight = pieces.length > 1 
                ? (((total/piece.parts.length)/total) / piecesCount * 100).toFixed(1)
                : 100 / pieces[0].parts.length
            })
    })
    return `${lcm} ${piecesCount}`
}



const GCD = (array) => {
    array = array.map(item => (
        {
            'number': item,
            divisors: []
        }))

    array.forEach(num => {
        for(let i = 1 ; i <= num.number ; i++) {
            if (num.number % i == 0) num.divisors.push(i)
        }
    })

    let gcd = [];
    array[0].divisors.forEach(div => {
        if (array[1].divisors.find(similardiv => similardiv == div)) {
            gcd.push(div)
        } 
    })
    return Number(gcd[gcd.length-1])
}

const LCM = (array) => {
    if (array.length == 1) {
        return array[0]
    }
    let a = array.shift()
    let b = array.shift()
    if (!b) return false
    let result = (a * b) / GCD([ a , b ]) 
    array.unshift(result)
    return LCM(array) || result
}

export const weightColorizer = (weight, [max, min]) => {
    // console.log('colorize running')
    // console.log(max, min, weight)
    let dif = max - min;
    let level = dif ? (weight - min) / dif : 1;
    // console.log('level: ', level)
    //least weight  rgb(241, 163, 0)
    let [rl, gl, bl] = [241, 163, 0];
    // highest weight rgb(23, 71, 147)
    let [rh, gh, bh] =  [23, 71, 147];
    // result color - res
    let difr = rl - Math.floor((rl - rh)*level) ;
    let difg = gl - Math.floor((gl - gh)*level) ;
    let difb = bl + Math.floor((bh - bl)*level) ;
    // console.log(`rgba(${difr}, ${difg}, ${difb}, .8)`)
    return `rgba(${difr}, ${difg}, ${difb}, .8)`
}


export const weightsMaxMin = (pieces) => {
    let min = 100;
    let max = 0
    pieces.forEach(piece => {
        // console.log(piece.parts)
        piece.parts.forEach(part => {
            min = Math.min(min, part.weight)
            max = Math.max(max, part.weight)
        })
    })
    return  [max, min]
}

export const dragStart = (context, event, pieceIndex, partIndex, pieces) => {
    const { commit } = context
    const thisPiecePart = pieces[pieceIndex].parts[partIndex]

    if (!event.dataTransfer) {
        console.log('sent')
        console.log(types)
        commit(types.SET_DRAG_DATA, JSON.stringify(thisPiecePart))
    } else {
        event.dataTransfer.setData('text/draggedPart', JSON.stringify(thisPiecePart));
        const partInPiece = [pieceIndex , partIndex]
        event.dataTransfer.setData('text/draggedPartInPiece', JSON.stringify(partInPiece))

    }
    // console.log(JSON.parse(event.dataTransfer.getData('text/draggedPart')))
    
    // pieces[pieceIndex].parts.splice(partIndex, 1)
}

export const dragEnter = (event) => {
    // event.stopPropagation();
    let el = event.target;
    console.log(el)
    
    if (el.classList.contains('new-row') ) {
        console.log('new-row')
        el.style.opacity = .9
        return
    }
    if (!el.classList.contains('part')) return
    el.classList.add('part-dragover')
}

export const dragOver = (event) => {
    
    event.preventDefault();
}
export const dragLeave = (event) => {
    const el = event.target
    el.classList.remove('part-dragover')
    if (el.classList.contains('new-row')) {
        el.style.opacity = 0.2
        
    }
}

export const drop = ( context, [ event, NewPieceIndex, NewPartIndex, pieces, refs]) => {
    event.target.classList.remove('part-dragover')
    const state = context.state
    const movedPart = JSON.parse(event.dataTransfer.getData('text/draggedPart'))
    const [oldPieceIndex, oldPartIndex] = JSON.parse(event.dataTransfer.getData('text/draggedPartInPiece'))
    // inserting Item in new row
    if (event.target.classList.contains('new-row')) {
        console.log(pieces[pieces.length-1])
        pieces.push({
            id: `pieceInput${pieces.length+1}`,
            name: 'input',
            parts: [movedPart],
            partsCount: 1

        })
    } else {
        pieces[NewPieceIndex].parts.splice(NewPartIndex, 0, movedPart);

    }
    // removing old prat from old parts array 
    pieces.forEach((piece, index) => {
        if (piece.parts.length == 0) pieces.splice(index, 1)
    })
    pieces[oldPieceIndex]?.parts.splice(oldPartIndex, 1);


}



