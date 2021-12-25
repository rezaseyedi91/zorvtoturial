<template>
    <div style="float: right" class="form w-md-50" dir="rtl">
        <h2 class="mb-5 fw-bold">ثبت نام</h2>
        <label  class="form-label my-2" for="username">نام و نام خانوادگی</label>
        <input ref="signupUsername" type="text" class="form-control my-2">
        <label class="form-label my-2" for="username">نام کاربری</label>
        <input ref="signupUserID" type="text" class="form-control">
        <label class="form-label my-2" for="username">ساز تخصصی</label>
        <input ref="signupUserInstrument" type="text" class="form-control my-2">
        <button type="submit" class="btn btn-primary my-2 mt-3" style="float: left"  @click="signUp">ثبت نام</button>
    </div>
</template>

<script>
// import router from '../router/router'
import * as types from '../store/mutation-types'


export default {
    methods: {
        signUp() {
            const { signupUsername , signupUserID, signupUserInstrument } = { ...this.$refs }
            const inputUserName = signupUsername.value
            const inputUserID = signupUserID.value
            const inputUserInstrument = signupUserInstrument.value
            let disp = this.$store.dispatch

            this.$store.commit(types.SIGN_UP, { disp , inputUserName , inputUserID, inputUserInstrument })
            // this.$store.dispatch('signUp', { disp , inputUserName , inputUserID, inputUserInstrument})
            console.log(this.$store.state.users)
            signupUsername.value = ''
            signupUserID.value = ''
            signupUserInstrument.value = ''


        }
    },
    created() {
    }
}
</script>