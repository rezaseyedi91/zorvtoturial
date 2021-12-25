import * as types from './mutation-types'
import * as api from './apiManager'
import router from '../router/router'
import * as createPlan from '../modules/createPlan'

const actions = {

    loginCheck(context, userID) {
        const {state, commit} = context
        let thisUser = state.users.find(user => user?.id == userID)

        if (thisUser) {
            console.log(thisUser)
            api.setCurrentUser(state, thisUser.userNum)
            commit(types.SET_CURRENT_USER, thisUser)

            // console.log(context.getters.currentUser)
            // state.currentUser = thisUser
            let thisUserLinkKey = `user-Num${thisUser.userNum}`
            let thisUserLinkUrl = state.links[thisUserLinkKey]
            api.getDataFromApiAndSet(commit, { thisUserLinkKey , thisUserLinkUrl })
            console.log(context)
            router.push({ path: "/user-portal/"+ userID })
            if (!thisUser.establishedPieces) router.push(`/user-portal/${thisUser.id}/new-plan`)
        } else {
            alert('اطلاعات شما ثبت نشده‌است؛ لطفاً ثبت نام کنید')
            window.location.href = "/sign-up"
            return
        }
    },
    completeSignUp({commit, state}, thisUser) {
        let key = `user-Num${thisUser.userNum}`
        api.linkCreator({commit, state}, {[key]: thisUser})
            .then('link promise ended')
    },
    updateApi({ commit , state },  [objectForUserUpdate, key]) {
        state.updated = false
       api.updateApiData(commit, state,  objectForUserUpdate, key )
    },

    initializeData({ commit, state }) {
        api.updateFrontLinks
            .then(fetchedLinks => {
                commit(types.UPDATE_LINKS, fetchedLinks)
                api.updateFrontData({commit, state}, fetchedLinks);
            })
            // .catch(err => console.log(err))       
    },

    createPlanStep1(context, piecesInput) {
        let piecesForCreatingPlan = [...piecesInput]
        createPlan.createPlanStep1(context, piecesForCreatingPlan)
        router.push({ name : 'plan-management' })
    },

    saveUserInfo({ getters, state, commit }) {
        let thisUser = getters.currentUser
        commit(types.SAVE_USER_INFO, { getters , thisUser} )

        // console.log(state.users)
        if (!thisUser.dataLink) {
            let linkKey = `user-Num${thisUser.userNum}`
            console.log(`creating new link for user-Num${thisUser.userNum}`)
            const linkCreationObj = {
                    [linkKey]: thisUser
            }
            // console.log(state.users)
            api.linkCreator({ state, commit}, linkCreationObj)
                .then(res => {
                    // console.log(res)
                    api.updateApiUserData(state.users.find(user => user?.userNum == thisUser.userNum))
                    api.updateAllUsersData(state)
                })
            // console.log(state.users)
        } else {
            console.log('updating')
            // console.log(state.users)
            api.updateApiUserData(thisUser)
            api.updateAllUsersData(state)
        }
    },

    updateBackLinks({ commit, state }) {
        api.updateBackLinks(commit, state)
    },

    deleteFrontBackUsers({commit, state}, index) {
        commit(types.DELETE_FRONT_USER, index)
        api.updateBackUsers(commit, state)
    },

    test() {

    },

    weight({ commit, state, getters }, [pieces, refs]) {

        createPlan.weightCalcul(pieces)
        let maxMin = createPlan.weightsMaxMin(pieces)
        pieces.forEach((piece, pieceIndex) => {
            piece.parts.forEach((part, partIndex) => {
                let partKey = `part${partIndex}piece${pieceIndex}`
                let thisPartEl = refs[partKey]
                if (thisPartEl) {
                    thisPartEl.style.backgroundColor = createPlan.weightColorizer(part.weight, maxMin)
                }
            })
        })
    },

    modifyPlanDragStart(context, { event, pieceIndex, partIndex, pieces }) {
        createPlan.dragStart(context, event, pieceIndex, partIndex, pieces)
    },

    modifyPlanDrop(context, { event, pieceIndex, partIndex, pieces , refs }) {
        createPlan.drop(context,[ event, pieceIndex, partIndex, pieces , refs])
    },

    saveUsersInApi({getters, state}) {
        api.updateApiUserData(getters.currentUser)
        api.updateAllUsersData(state)
    }
}


export default actions