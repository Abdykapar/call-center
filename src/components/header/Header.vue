<template>
  <div class="call-center-header">
    <div class="top-menu">
      <div class="top-menu-items">
        <div class="top-menu-language">
          <select
            class="select_lang"
            v-model="currentLang.code"
            @change="changeLang"
          >
            <option
              v-for="(lang, index) in locales"
              :key="index"
              :value="lang.code"
            >
              {{ lang.title }}
            </option>
          </select>
        </div>
        <div
          class="top-menu-main"
          @click="goHome"
        >
          <span>
            <img src="/static/images/header/home-interface-button-symbol-2@3x.png">
          </span>
          <span class="main">
            {{ $lang.words.main }}
          </span>
        </div>
        <div class="logout">
          <span class="exit">
            <router-link to="/login">
              {{ $lang.words.exit }}
            </router-link>
          </span>
        </div>
      </div>
    </div>
    <div class="divider" />
    <div class="header-nav-bar">
      <span :class="{'active': url.includes('/call-data')}">
        <router-link :to="{ name: 'CallDatabase' }">
          <img
            v-if="$route.path !== '/call-data'"
            src="/static/images/header/books-stack-of-three%20(1)@3x.png"
          >
          <img
            v-else
            src="/static/images/header/book-red.png"
          >
          {{ $lang.words.knowledgeBase }}
        </router-link>
      </span>
      <span :class="{'active': $route.path === '/call-history-outgoing'}">
        <router-link :to="{ name: 'CallHistoryOutgoing' }">
          <img
            v-if="$route.path === '/call-history-outgoing'"
            src="/static/images/header/phone-red.png"
          >
          <img
            v-else
            src="/static/images/header/incoming-call@3x.png"
          >
          {{ $lang.words.outgoingCall }}
        </router-link>
      </span>
      <span :class="{'active': $route.path === '/call-history'}">
        <router-link :to="{name: 'CallHistory'}">
          <img
            v-if="$route.path === '/call-history'"
            src="/static/images/header/phone-red.png"
          >
          <img
            v-else
            src="/static/images/header/incoming-call@3x.png"
          >
          {{ $lang.words.incomingCall }}
        </router-link>
      </span>
      <span :class="{'active': $route.path === '/parent-substitute'}">
        <router-link :to="{name: 'ParentSubstitute'}">
          <i
                  v-if="$route.path === '/parent-substitute'"
                  class="fa fa-exchange-alt"
                  style="color: #ee7739"
          />
          <i
                  v-else
                  class="fa fa-exchange-alt"
                  style="color: #eeeeee"
          />
          {{ $lang.words.parent_substitute }}
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { customEventEmitter } from '@/_helpers/customEventEmitter';

export default {
    name: 'Header',
    data () {
        return {
            url: '',
            currentLang: {
                code:'',
            },
            locales: [
                {
                    title: 'Русский',
                    code: 'ru'
                },
                {
                    title: 'Кыргызча',
                    code: 'kg'
                },
                {
                    title: 'English',
                    code: 'en'
                }
            ],
        };
    },
    created () {
        this.activePath();
        this.currentLang.code = this.$lang.getLang();
    },
    methods: {
        ...mapActions('account',[ 'logout' ]),
        activePath ()
        {
            this.url = this.$route.path;
        },
        goHome ()
        {
            this.$router.push('/');
        },
        changeLang (e) {
            this.$lang.setLang(e.currentTarget.value);
            customEventEmitter.$emit('langChange');
            this.currentLang.code = this.$lang.getLang();
        },
    }
};
</script>

<style lang="scss" scoped>
    .call-center-header{
        background-color: #474747;
        height: 138px;
        width: 100%;
        padding: 0 70px 0 40px;
    }
    .top-menu{
        width: 100%;
        .top-menu-items{
            display: flex;
            float: right;
        }
        .top-menu-main{
            width: 100%;
            display: flex;
            height: 37px;
            border-radius: 0 0 20px 20px;
            border: solid 4px #ee7739;
            border-top: 0;
            span{
                font-family: Helvetica;
                font-size: 18px;
                font-weight: bold;
                font-style: normal;
                color: #ffffff;
                padding-left: 12px;
                cursor: pointer;
            }
        }
        .main{
            padding: 5px 15px 5px 5px;
          a{
            color: white;
          }
        }
        .exit{
            float: right;
            margin: 0 30px;
            font-family: Helvetica;
            font-size: 16px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            color: #ffffff;
            cursor: pointer;
            a{
              color: white;
            }
        }
        .logout{
            margin-top: 8px;
        }
    }
    .divider{
        height: 90px;
        width: 100%;
    }
    .header-nav-bar{
        height: 60px;
        font-family: Helvetica;
        font-size: 20px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        letter-spacing: 0.08px;
        color: #ffffff;
        img{
            margin: 0 5px;
            height: 20px;
        }
        i {
            color: red;
        }
        span{
            cursor: pointer;
            padding: 10px 20px;
        }
        a{
            color: white;
        }
    }
    .active{
        color: #ee7739;
        border-bottom: 1px solid #ee7739;
      a{
          color: #ee7739;
          text-decoration: none;
      }

    }
    .md-theme-default a:not(.md-button){
        text-decoration: none;
    }
    .top-menu-language{
        margin-right: 40px;
        margin-top: 8px;
        select{
          width: 106.9px;
          height: 20px;
          background-color: white;
          border: none;
          text-align-last: center;
        }
    }
</style>
