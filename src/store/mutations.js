import axios from 'axios'
import router from '../router/router';
import * as types from './mutation-types'


const mutations = {
    [types.GET_DATA](state, { key, value }) {
        state[key] = value
    },
    [types.SIGN_UP](state,  { disp, inputUserName , inputUserID, inputUserInstrument }) {
        const newUserNum = (new Date()).getTime();
        console.log(newUserNum)

        let thisUser = {
            name: inputUserName,
            id: inputUserID,
            instrument: inputUserInstrument,
            userNum: newUserNum,
            dataLink: ''
        }
        state.users.push(thisUser)

        const objectForUserUpdate = state.users
        const key = 'users'
        disp('updateApi', [objectForUserUpdate, key])
        disp('completeSignUp', thisUser)
        state.updated = true;
        router.push('/')
        
    },
    [types.UPDATE_LINKS](state, newFetchedLinks) {
        state.links = newFetchedLinks

    },
    [types.ADD_TO_STATE_LINKS](state, createdLink) {
        const linkKey = Object.entries(createdLink)[0][0]
        const linkVal = Object.entries(createdLink)[0][1]
        if (linkKey.indexOf(`user-Num`)> -1) {
            let thisUserNum = Number(linkKey.slice(8))
            state.users.find(user => user?.userNum == thisUserNum).dataLink = linkVal

            console.log('hey',state.users[linkKey.slice(8)] )
            return
        }
        state.links[linkKey] = linkVal

    },
     [types.SET_DATA_TO_STATE](state, data) {
        let [ dataKey, dataValue ] = data;
        // if (dataKey == 'links-url') dataKey = 'links'
        state[dataKey] = dataValue;
        
        console.log('%cThe State has been successfully updated!', 'color: green; font-weight: bold')
        state.updated = true
     },
    [types.SET_CURRENT_USER](state, thisUser) {
        console.log(thisUser.userNum)
        state.currentUserIndex = thisUser.userNum
        console.log(state.currentUserIndex)
    },
    [types.SAVE_USER_INFO](state, { getters , thisUser}) {
        const findUserIndex = state.users.indexOf(state.users.find(user => user?.userNum == thisUser.userNum))
        state.users[findUserIndex] = thisUser
    },
    [types.DELETE_FRONT_USER](state, index) {
        console.log(index)
        state.users.splice(index, 1)
        console.log(state.users)
    },
    [types.SAVE_ESTABLISHED_PIECES] (state, pieces) {
        const thisUser = state.users.find(user => user.userNum == state.currentUserIndex)
        if (thisUser.establishedPieces) {
            delete thisUser.establishedPieces
            
        }
        thisUser.establishedPieces = JSON.parse(JSON.stringify([...pieces]))
        // thisUser.establishedPieces = pieces;
        
    },
    [types.SAVE_MODIFIED_PLAN] (state, pieces) {
        const thisUser = state.users.find(user => user.userNum == state.currentUserIndex)
        thisUser.modifiedPlan = [];
        pieces.forEach(piece => {
            thisUser.modifiedPlan.push(piece)
        })
        // thisUser.modifiedPlan = pieces;
    },
    [types.SET_DRAG_DATA]( state, dataText) {
        state.dragData = dataText
        console.log('set')
    }
 }


export default mutations