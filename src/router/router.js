import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import SignUpPage from './../components/SignUp.vue';
import AdminPortal from '../components/Admin.vue'
import UserPortal from '../components/UserPortal.vue'
import NewPlan from '../components/panel/NewPlan.vue'
import PiecesManagement from '../components/panel/PiecesManagement.vue'
import PlanManagement from '../components/panel/PlanManagement.vue'
import Tavalies from '../components/panel/Tavalies.vue'
import PartDetails from '../components/panel/PartDetails.vue'

const router = createRouter({
    history: createWebHistory(),
    routes:
        [
            {
                path: '/',
                component: LoginPage
            },
            {
                path: '/sign-up',
                component: SignUpPage,
            },
            {
                path: '/admin-portal',
                component: AdminPortal
            },
            {
                path: '/user-portal/:id',
                component: UserPortal,
                children: [
                    {
                        path: 'new-plan',
                        component: NewPlan
                    },
                    {
                        path: 'pieces-management',
                        component: PiecesManagement
                    },
                    {
                        path: 'plan-management',
                        component: PlanManagement,
                        name: 'plan-management',
                    },
                    {
                        path: 'tavalies',
                        component: Tavalies,
                        name: 'tavalies',

                    },
                    {
                        path: 'part/:pid',
                        component: PartDetails,
                        name: 'part-details'

                    }

                ]
            }
        ]
})


export default router