'use strict'

import axios from "axios"
import * as types from './mutation-types'

//initialize for first time//

// links' url: https://api.jsonstorage.net/v1/json/95e9c6d5-5b4e-45a1-a2d0-eaadae452172


// export const firstLinksArrCreate = () => {
//         let links = []
//         axios.post('https://api.jsonstorage.net/v1/json/' , links)
//             .then(res => console.log(res.data.uri))
// }




//initialize on page load
export const updateFrontLinks = new Promise((resolve, reject) => {
        axios.get('https://api.jsonstorage.net/v1/json/95e9c6d5-5b4e-45a1-a2d0-eaadae452172')
        .then(res => {
            let fetchedLinks = res.data;
           
            resolve(fetchedLinks)
            reject(fetchedLinks)
        })
    })


export const updateFrontData = ({commit, state}, fetchedLinks) => {
    const linkKeys = Object.keys(fetchedLinks)
    linkKeys.forEach(linkKey => {
        let linkUrl = fetchedLinks[linkKey];
        getDataFromApiAndSet( commit ,{ linkKey , linkUrl })
        
    })
}



//

export const updateBackUsers = (commit, state) => {
    const url = state.links.users;
    axios.put(url, state.users)
        .then(res => console.log('backUsers Updated!'))
        .catch(err => console.log(err))
}

export const updateBackLinks = (commit, state) => {
    let readyLinks = state.links;
    axios.put(`https://api.jsonstorage.net/v1/json/95e9c6d5-5b4e-45a1-a2d0-eaadae452172`, readyLinks)
        .then(res => {
            console.log('updated back links')
        })
}




export const linkCreator = ({commit , state} , objectToBeUploaded) => {
    return new Promise((resolve, reject) => {
        axios.post('https://api.jsonstorage.net/v1/json/' , objectToBeUploaded)
            .then(res => {
                let key = Object.entries(objectToBeUploaded)[0][0]
                let url = res.data.uri;
                // console.log(res.data)
                let createdLink = {
                    [key] : url
                }
                addToStateLinks(commit, createdLink)
                updateBackLinks(commit, state)
                console.log('link created')
                resolve('this is resolve')
                // return
            })

                

    })
        
}


const addToStateLinks = (commit, createdLink) => {
    commit(types.ADD_TO_STATE_LINKS, createdLink)
}

export const getDataFromApiAndSet = (commit, {linkKey, linkUrl}) => {
    axios.get(linkUrl)
        .then(res => {
            let value = res.data
            if (linkKey.indexOf('user-Num') > -1) {
                return
                
            }
            if (value.currentUserIndex) {
                value = value.currentUserIndex
            }
            commit(types.SET_DATA_TO_STATE ,[linkKey,  value])

        })
        .catch(err => console.log(err))
}


export const updateApiData = ( commit , state , dataValue , dataMainKey) => {
    const url = state.links[dataMainKey]
    console.log(state.links, dataMainKey)
    axios.put(url , dataValue )
        .then(res => {
            console.log(res)
        })
    
}

export const updateApiUserData = (user) => {
    console.log('updatingApiUserData   user:', user)
    axios.put(user.dataLink, user)
        .then(res => console.log('user data successfully updated', res))
        .catch(err => console.log('sth went wrong'))
}

export const updateAllUsersData = ( state) => {
    
    axios.put(state.links.users, state.users)
        .then(res => console.log(res))
}


export const setCurrentUser = (state, newUserIndex) => {
    const currentUserLink = state.links.currentUserIndex
    axios.put(currentUserLink, {
        currentUserIndex: newUserIndex
    })
        // .then(res=> console.log(res))
        // .then(err=> console.log(err))
}