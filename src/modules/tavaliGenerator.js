


const actions = {

    generateTavali( context, [plan, pieces, tavaliCountFrom, tavaliCountTo])  {
        console.log(tavaliCountFrom, tavaliCountTo)
        const tavaliesList = []
        for (let tCount = 0 ; tCount <= tavaliCountTo ; tCount++) {
            const thisTavali = {
                count : tCount,
                parts : [],

            }
            for (let sCount = 0 ; sCount < plan?.length ; sCount++) {
                if (tCount == 0 || plan[sCount].currentIndexInTavali >= plan[sCount].parts.length) {
                    plan[sCount].currentIndexInTavali = 0
                }
                let currIndex = plan[sCount].currentIndexInTavali;
                let thisPartOrigLocation = plan[sCount].parts[currIndex].origLocation
                
                let thisPart = origPart(pieces, thisPartOrigLocation)
                // return:
                thisTavali.parts.push(thisPart)

                plan[sCount].currentIndexInTavali++
            }

            tavaliesList.push(thisTavali)
        }

        const thisUser = context.getters.currentUser;
        
        thisUser.tavaliesList = tavaliesList.slice(tavaliCountFrom)
        if (tavaliCountTo - tavaliCountFrom > 10) {
            thisUser.bigTavaliesList = tavaliesList.slice(tavaliCountFrom)
            console.log('it is big!')
        }        
    },



}


const origPart = (pieces, {piece, part}) => {
    // console.log(piece, part)
    return pieces[piece].parts[part]
}

export default {
    actions
}