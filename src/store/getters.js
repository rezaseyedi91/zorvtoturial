import axios from "axios";
import * as fetchedData from './fetchedData'


// const getUsers = new Promise((resolve, reject) => {
//     axios.get(`https://getpantry.cloud/apiv1/pantry/0dd73b8b-e9c4-41bf-8762-157036edc686/basket/users`)
//     .then(res => {
//         console.log(res.data.users)
//         let users = res.data
//         resolve(users)
//         reject()
//     })
//     .catch(err => console.log(err))


// })



const getters = {
    currentUser: (state) => {
        // console.log(state.currentUserIndex)
        return state.users.find(user => user?.userNum == state.currentUserIndex)
    }
}

export default getters