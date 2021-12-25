<template>
    <!-- <div class="panel-nav-bar d-flex flex-column flex-md-row justify-content-between ">
        <h2 class="p-2">{{ user.name }} عزیز! خوش آمدید!</h2>

        <ul>
            
                <router-link class="d-block d-md-inline-block"  :to="`/user-portal/${user.id}/new-plan`">
                    تدوین پلان جدید
                    
                </router-link>
                <router-link class="d-block d-md-inline-block" :to="`/user-portal/${user.id}/plan-management`">
                    مدیریت پلان
                </router-link>
                <router-link class="d-block d-md-inline-block" :to="`/user-portal/${user.id}/tavalies`">
                    توالی من     
                </router-link>
                <router-link class="d-block d-md-inline-block" :to="`/user-portal/${user.id}/pieces-management`">
                    مدیریت قطعه‌ها
                </router-link>

        </ul>

    </div> -->
    <nav class="navbar navbar-expand-md navbar-light bg-blue-100 panel-nav-bar">
        <div class="container d-flex flex-column align-items-start" >
            <h4 style="" class="p-2">{{ user.name }} عزیز! خوش آمدید!</h4>

            <button class="navbar-toggler" style="float: left" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                        <router-link class="nav-item d-block d-md-inline-block nav-link ps-2"  :to="`/user-portal/${user.id}/new-plan`">
                    تدوین پلان جدید
                        </router-link>
                        <router-link class="nav-item d-block d-md-inline-block nav-link ps-2" :to="`/user-portal/${user.id}/plan-management`">
                            مدیریت پلان
                        </router-link>
                        <router-link 
                        class="nav-item d-block d-md-inline-block nav-link ps-2" :to="`/user-portal/${user.id}/tavalies`">
                    توالی من     
                        </router-link>
                        <router-link                       
                        class="nav-item d-block d-md-inline-block nav-link ps-2" :to="`/user-portal/${user.id}/pieces-management`">

                            مدیریت قطعه‌ها
                        </router-link>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    props: {
        'user': Object
    },
    methods: {
        enableLinks(user, key) {
            if (!user) return false
            console.log('so... true!')
            if (!user[key]) return false
            return true
        },
        disableLinkButton(event, mustDisable) {
            if (mustDisable) event.preventDefault();
            
        }
    }
}
</script>