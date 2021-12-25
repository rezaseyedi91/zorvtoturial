<template>
    <div  dir="rtl" class="login-page d-flex justify-content-center align-items-center mb-5">
        <div class="login-form form">
            <h2 class="mb-5 fw-bold text-center">ورود</h2>
            <label for="username" class="form-label">نام کاربری</label>
            <input dir="ltr" 
            @keyup.enter="loginCheck" type="text" 
            ref="inputUserID" 
            class="form-control">
            <button type="button" 
            @click="loginCheck" 
            class="btn btn-success mt-3 w-100"
            >ورود</button>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {

        }

    },
    methods: {
        loginCheck() {
            let inputUserID = this.$refs.inputUserID.value
            this.$store.dispatch('loginCheck', inputUserID)
            console.log(inputUserID)

        }
    }
}
</script>