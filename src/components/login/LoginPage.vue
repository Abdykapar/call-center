<template>
  <div class="call-center-container">
    <div class="login-form">
      <div class="call-center-logo">
        <img src="/static/images/login/Mobile@3x.png">
      </div>
      <div class="call-center-form">
        <form @submit.prevent="handleSubmit">
          <input
            v-model="username"
            type="text"
            name="username"
            v-validate="'required'"
            :class="{ 'is-invalid' : submitted && errors.has('username') }"
            autocomplate="username"
            placeholder="Имя пользователя"
          >
          <input
            v-model="password"
            type="password"
            name="password"
            v-validate="'required'"
            :class="{ 'is-invalid' : submitted && errors.has('password') }"
            autocomplate="password"
            placeholder="Пароль"
          >
          <button type="submit">
            Войти
          </button>
          <div class="save-account">
            <input
              class="call-center-check"
              type="checkbox"
              v-model="remember"
              name="remember"
            >Запомнит
          </div>
        </form>
      </div>
    </div>
    <div class="call-center-image">
      <img src="/static/images/login/undraw_calling_kpbp@2x.png">
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    name: 'CallCenterLogin',
    data (){
        return {
            username: '',
            password: '',
            remember: false,
            submitted: false,
        };
    },
    computed:{
        ...mapState('account', [ 'status' ])
    },
    created (){
        this.username = localStorage.getItem('username');
        this.password = localStorage.getItem('password');
        this.logout();
    },
    methods: {
        ...mapActions('account', [ 'login','logout' ]),
        handleSubmit (e) {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if(valid){
                    const { username, password, remember } = this;
                    if (username && password) {
                        this.login({ username, password, remember });
                    }
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
    .call-center-container{
        width: 100%;
        height: 100vh;
        display: flex;
        background-color: #f3f3f3;
    }
    .call-center-image{
        height: 60vh;
        width: 50%;
        margin: auto;
        img{
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    .login-form{
        padding: 30px 0 60px 0;
        height: 60vh;
        width: 40%;
        margin: auto;
        display: flex;
        flex-flow: column;
        .call-center-logo{
            margin: 0 auto 74px auto;
            img{
                width: 83px;
                height: 93px;
            }
        }
        .call-center-form{
            display: flex;
            flex-flow: column;
            margin: 0 auto;
            width: 80%;
            form{
                input{
                    width: 100%;
                    height: 47px;
                    border-radius: 25px;
                    background-color: #ffffff;
                    padding-left: 30px;
                    margin-bottom: 20px;
                    font-size: 18px;
                }
                input::-webkit-input-placeholder{
                    color: #707070;
                    opacity: 0.4;
                }
                button{
                    width: 100%;
                    height: 47px;
                    border-radius: 25px;
                    background-color: #ee7739;
                    font-size: 18px;
                    font-weight: bold;
                    font-style: normal;
                    font-stretch: normal;
                    letter-spacing: normal;
                    color: #ffffff;
                }
                input[type=checkbox]{
                    height: initial;
                    width: initial;
                    margin-right: 5px;
                    border-radius: 15px;
                    background-color: #ffffff;
                }
            }
        }
        .save-account{
            /*display: flex;*/
            width: 25%;
            float: right;
            margin-top: 20px;
            font-family: Helvetica;
            font-size: 12px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            letter-spacing: normal;
            text-align: left;
            color: rgba(#707070,0.4);
        }
    }
    .is-invalid{
        border: 1px solid red;
    }
</style>