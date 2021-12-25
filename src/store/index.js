import { createStore } from "vuex";
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import * as createPlan from "../modules/createPlan";
import tavaliGenerator from '../modules/tavaliGenerator'


// console.log(fetchedData.users)
const store = createStore({
    state: {
        users: [
            {
                name:"nashod dige", id:2
            }
        ],
        // currentUserIndex:
        // ,
        links: {
                'links-url': 'https://api.jsonstorage.net/v1/json/95e9c6d5-5b4e-45a1-a2d0-eaadae452172'
        },
        updated: false,
        
    },
    modules: {
        createPlan,
        tavaliGenerator
    },
    getters,
    mutations,
    actions
    
})

export default store;