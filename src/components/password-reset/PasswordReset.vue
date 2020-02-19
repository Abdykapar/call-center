<template>
    <div class="main">
        <form @submit.prevent="submit">
            <div class="form-group">
                <label>{{ $lang.words.newPassword }}</label>
                <input type="password" class="form-control" :class="{'is-invalid' : errors.has('password')}" ref="password" v-model="newPassword" name="password" v-validate="'required'" :placeholder="$lang.words.newPassword">
            </div>
            <div class="form-group">
                <label>{{ $lang.words.confirmPassword }}</label>
                <input v-validate="'required|confirmed:password'" :class="{'is-invalid' : errors.has('confirmPassword')}" class="form-control" v-model="confirmPassword" name="confirmPassword" type="password" :placeholder="$lang.words.confirmPassword">
                <div class="invalid-feedback">
                    {{ $lang.words.confirmPasswordError }}
                </div>
            </div>
            <button type="submit" class="btn btn-primary">{{ $lang.words.save }}</button>
        </form>
    </div>
</template>

<script>
    import { userService } from '@/_services';

    export default {
        name: "PasswordReset",
        data () {
            return {
                newPassword: '',
                confirmPassword: '',
                hasError: false,
            }
        },
        computed: {
            user() {
                return this.$store.state.account.user.user;
            }
        },
        methods: {
            submit() {
                this.checkEquality();
                this.$validator.validate().then(valid => {
                    if(valid && !this.hasError) {
                        const data = {
                            password: this.newPassword,
                            firebaseToken: this.user.firebaseToken
                        };
                        userService.editProfile(data).then(() => {
                            this.$toaster.success(this.$lang.words.successMessage, { timeout: 2000 });
                            this.$emit('close');
                        }).catch(err => console.log(err));
                    }
                })
            },
            checkEquality() {
                this.hasError = this.newPassword !== this.confirmPassword;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .submit-btn {
        float: right;
    }
    .settings {
        display: inline;
        color: white !important;
        height: auto !important;
        text-transform: capitalize;
        font-weight: normal !important;
        font-size: 16px;
        margin: 5px 0 0 0;
        padding: 0 0 5px 0;
    }
    .settings-counter {
        background-color: #F0783A;
        padding: 3px 5px !important;
        border-radius: 15px;
        margin: 5px 0 0 0 !important;
        border: none !important;
        font-size: 15px;
    }

    .logout {
        margin-left: 10px;
    }
    .main {
        display: inline;
    }
    .md-button {
        margin: 2px 0 !important;
    }
</style>
