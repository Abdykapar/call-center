<template>
    <div class="page-content--bge5">
            <div class="container">
                <div class="login-wrap">
                    <div class="login-content">
                        <div class="login-logo">
                            <a href="#">
                                <img src="/static/images/icon/logo.png" alt="CoolAdmin">
                            </a>
                        </div>
                        <div class="login-form">
                            <form @submit.prevent="handleSubmit">
                                <div class="form-group">
                                    <label for="username">Username</label>
                                    <input type="text" v-model="username" name="username" class="au-input au-input--full" :class="{ 'is-invalid': submitted && !username }" />
                                    <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" v-model="password" name="password" class="au-input au-input--full" :class="{ 'is-invalid': submitted && !password }" />
                                    <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
                                    
                                </div>
                                <button class="au-btn au-btn--block au-btn--green m-b-20" type="submit">sign in</button>
                                <div class="login-checkbox">
                                    <label>
                                        <input type="checkbox" name="remember">Remember Me
                                    </label>
                                    <label>
                                        <a href="#">Forgotten Password?</a>
                                    </label>
                                </div>
                               
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            username: '',
            password: '',
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    created () {
        // reset login status
        this.logout();
    },
    methods: {
        ...mapActions('account', ['login', 'logout']),
        handleSubmit (e) {
            this.submitted = true;
            const { username, password } = this;
            if (username && password) {
                this.login({ username, password })
            }
        }
    }
};
</script>