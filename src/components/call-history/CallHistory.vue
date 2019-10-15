<template>
  <div class="call-history-container">
    <pre-loader :show="loading"></pre-loader>
    <CallCenterHeader />
    <div class="call-history-content">
      <div class="call-history-profile">
        <div class="profile-header">
          <span>{{ $lang.words.questionnaire }}</span>
        </div>
        <div class="call-history-form">
          <form @submit.prevent="saveData">
            <div class="column-one">
              <div>
                <label>{{ $lang.words.phone }}</label>
                <input
                  v-model="phone"
                  v-validate="'required'"
                  maxlength="10"
                  type="text"
                  placeholder="0556256585"
                  name="phone"
                  :class="{'is-invalid': (submitted && errors.has('phone')) || validPhone}"
                  @keyup="checkPhone($event)"
                >
              </div>
              <div>
                <label>{{ $lang.words.name }}</label>
                <input
                        v-model="person.name"
                >
              </div>
              <div>
                <label>{{ $lang.words.surname }}</label>
                <input v-model="person.surname">
              </div>
              <div>
                <label>{{ $lang.words.lastName }}</label>
                <input v-model="person.patronymic">
              </div>
              <div>
                <label>{{ $lang.words.status }}</label>
                <select v-model="person.personType">
                  <option v-for="type in parentType" :key="type.id" :value="type.id">
                    {{ $lang.words[type.name] }}
                  </option>
                </select>
              </div>
            </div>

            <div class="column-two">
              <div>
                <label>{{ $lang.words.extraPhone }}</label>
                <input v-model="person.extraPhone">
              </div>

              <div>
                <label>{{ $lang.words.date }}</label>
                <a-date-picker
                  v-model="dateNow"
                  show-time
                  format="YYYY-MM-DD HH:mm"
                  :placeholder="$lang.words.chooseDate">

                </a-date-picker>
              </div>
              <div>
                <label>{{ $lang.words.region }}</label>
                <input v-if="school.region.title" v-model="school.region.title" disabled>
                <select
                        v-show="!school.region.title"
                        v-model="school.region.id"
                        @change="fetchRayon(school.region.id)"
                        name="region"
                >
                  <option v-for="region in regions" :key="region.id" :value="region.id">
                      {{ region.title }}
                  </option>
                </select>
              </div>
              <div>
                <label>
                  {{ $lang.words.rayon }}
                </label>
                <input v-if="school.rayon.title" v-model="school.rayon.title" disabled>
                <select v-show="!school.rayon.title"
                        v-model="school.rayon.id"
                        @change="fetchSchools(school.rayon.id)"
                >
                    <option v-for="rayon in rayons" :key="rayon.id" :value="rayon.id">
                        {{ rayon.title }}
                    </option>
                </select>
              </div>
              <div>
                <label>{{ $lang.words.school }} № </label>
                <input v-if="person.schoolTitle" v-model="person.schoolTitle" disabled>
                <select v-show="!person.schoolTitle"
                        v-model="person.schoolId"
                >
                  <option v-for="school in schools" :key="school.id" :value="school.id">
                    {{ school.name }}
                  </option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="call-history-buttons">
        <button @click="showHistory" :class="{ 'active-button' : showCallHistoryTable }">
          {{ $lang.words.historyAppeals }}
        </button>
        <button @click="showQuestion" :class="{ 'active-button' : showNewQuestion }">
          {{ $lang.words.newQuestion }}
        </button>
        <button @click="showClient" :class="{ 'active-button' : showInfoClient }">
          {{ $lang.words.customerInfo }}
        </button>
      </div>
      <div v-if="showCallHistoryTable">
        <CallHistoryTable
                v-if="renderComponent"
                :data="data"
                :page-data="pageData"
                :phone="phone"
        />
      </div>
      <div v-if="showNewQuestion">
        <CallNewQuestion
                v-if="renderComponent"
                :person="personChanged"
                :call-type="callType"
                :update-or-not="updateQuestionary"
                v-on:check="saveData"
        />
      </div>
      <div v-if="showInfoClient">
        <CallClientInfo
                v-if="renderComponent"
                :person="person"
                :school="school"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { locationService } from '@/_services/location/location.service';
import { questionaryService } from '@/_services/questionary.service';
import Header from '@/components/header/Header';
import CallHistoryTable from '@/components/call-history/CallHistoryTable';
import CallNewQuestion from '@/components/call-history/CallNewQuestion';
import CallClientInfo from '@/components/call-history/CallClientInfo';
import { personService } from '@/_services/person.service';
import { schoolService } from '@/_services/school.service';
import moment from 'moment';
import PreLoader from '@/components/preloader/PreLoader';
moment.locale('ru');

export default {
    name: 'CallHistory',
    components:{
        CallCenterHeader: Header,
        CallHistoryTable,
        CallNewQuestion,
        CallClientInfo,
        PreLoader,
    },
    data ()
    {
        return {
            loading: false,
            showCallHistoryTable: true,
            showNewQuestion: false,
            showInfoClient: false,
            phone:'',
            submitted: false,
            person:{
                repliedAt:'',
                extraPhone:'',
                personType:1,
                schoolId: null,
            },
            dateNow:moment(),
            school: {
                rayon: {
                    id: null,
                    title: '',
                },
                region: {
                    id: null,
                    title: '',
                }
            },
            validPhone:false,
            selectedPerson: null,
            callType:'',
            parentType: [
                {
                    id:1,
                    name: 'parent',
                },
                {
                    id:2,
                    name: 'student',
                },
                {
                    id:3,
                    name: 'other',
                }
            ],
            renderComponent: true,
            data: [],
            updateQuestionary: false,
            pageData: {
                page: {
                    number: 0,
                    size: 0,
                    totalPages: 0,
                }
            },
            regions: [],
            rayons: [],
            schools: [],
        };
    },
    computed: {
        personChanged: function () {
            this.person.repliedAt= moment(this.dateNow).format('DD.MM.YYYY HH:mm');
            return this.person;
        },
    },
    created () {
        this.checkCallType();
        this.fetchRegions();
    },
    methods: {
        checkPhone (e)
        {
            this.loading = true;
            if (isNaN(e.target.value)){
                this.validPhone = true;
                this.loading = false;
            } else {
                this.validPhone = false;
                if (e.target.value.length === 0)
                {
                    this.person = {
                        name: '',
                        surname: '',
                        patronymic: '',
                        schoolTitle: '',
                        extraPhone: '',
                    };
                    this.school = {
                        rayon: {
                            title: '',
                        },
                        region: {
                            title: '',
                        }
                    };
                    this.data = [];
                }
                if (e.target.value.length >= 1)
                {
                    personService.getByPhone(this.phone).then(res => {
                        if (res)
                        {
                            this.person = res;
                            this.person.personType = 1;
                            this.person.repliedAt = '';
                            this.person.extraPhone = '';
                            this.fetchSchool(res.schoolId);
                            this.loading = false;
                        }
                        else {
                            this.person = {
                                personType: 1,
                                repliedAt: '',
                                extraPhone: '',
                                name: '',
                                surname: '',
                                patronymic: '',
                                schoolTitle: '',
                                phone: this.phone,
                            };
                            this.school.region.title = '';
                            this.school.region.id = null;
                            this.school.rayon.title = '';
                            this.school.rayon.id = null;
                            this.loading = false;
                        }
                    }).then(() => {
                        if (this.showCallHistoryTable)
                        {
                            this.fetchData(this.person.phone);
                        }
                        else if (this.showNewQuestion){
                            this.formatDate();
                        }
                        this.forceRerender();
                    }).catch(err => console.log(err));
                }
                this.loading = false;
            }
        },
        fetchSchool (id){
            schoolService.getById(id).then(res => {
                if (res)
                {
                    this.school = res;
                }
                else {
                    this.school = {
                        region: {
                            title: '',
                        },
                        rayon: {
                            title: '',
                        }
                    };
                }
            }).catch(err => console.log(err));
        },
        showHistory ()
        {
            if (!this.showCallHistoryTable) {
                this.showCallHistoryTable = true;
                this.showNewQuestion = false;
                this.showInfoClient = false;
                this.fetchData(this.person.phone);
            }

        },
        showQuestion ()
        {
            if (!this.showNewQuestion) {
                this.showCallHistoryTable = false;
                this.showNewQuestion = true;
                this.showInfoClient = false;
            }
            this.person.repliedAt= moment(this.dateNow).format('DD.MM.YYYY HH:mm');
            this.checkCallType();
        },
        showClient ()
        {
            if (!this.showInfoClient) {
                this.showCallHistoryTable = false;
                this.showNewQuestion = false;
                this.showInfoClient = true;
            }
        },
        saveData ()
        {
            if(this.$validator.fields.find({ name: 'region' }) !== undefined) {
                this.submitted = true;
                this.$validator.validate().then(valid => {
                    if (valid) {
                        console.log(this.phone);
                    }
                });
            }
        },
        checkCallType ()
        {
            if (this.$route.path === '/call-history'){
                this.callType = 1;
            }
            else if (this.$route.path === '/call-history-outgoing')
            {
                this.callType = 2;
            }
        },
        formatDate () {
            this.person.repliedAt= moment(this.dateNow).format('DD.MM.YYYY HH:mm');
        },
        forceRerender () {
            this.renderComponent = false;

            this.$nextTick(() => {
            // Add the component back in
                this.renderComponent = true;
            });
        },
        fetchData (phone)
        {
            questionaryService.getByPhone(phone).then(res => {
                if (res['_embedded'])
                {
                    this.data = res['_embedded']['questionaryResourceList'];
                }
                else { this.data = []; }
                this.pageData = res;
            }).catch(err => console.log(err));
        },
        fetchRegions ()
        {
            locationService.getRegions().then(res => {
                if (res)
                {
                    this.regions = res.content;
                } else { this.regions = []; }
            }).catch(err => console.log(err));
        },
        fetchRayon (id)
        {
            locationService.getRayonByRegion(id).then(res => {
                this.rayons = res;
            }).catch(err => console.log(err));
        },
        fetchSchools (id)
        {
            schoolService.getByRayon(id).then(res => {
                this.schools = res;
            }).catch(err => console.log(err));
        }
    },


};
</script>

<style lang="scss" scoped>
    @font-face {
        font-family: Helvetica;
    }
    .call-history-container{
        width: 100%;
        height: 100vh;
        display: table;
        background-color: #f3f3f3;
    }
    .call-history-content{
        width: 100%;
        margin: 50px 30px 50px 60px;

    }
    .profile-header{
        margin-bottom: 30px;
        margin-left: 20px;
        span{
            color: #ee7739;
            font-size: 18px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            letter-spacing: 0.07px;
        }
    }
    .call-history-form{
        form{
            display: flex;
            label{
                min-width: 120px;
                text-align: right;
                padding-right: 10px;
                font-size: 16px;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                letter-spacing: 0.06px;
                color: #707070;
            }
            .ant-calendar-picker-input{
              border: none;
              height: 29px!important;
            }
            input{
                width: 70%;
                height: 29px;
                background-color: #ffffff;
                padding-left: 10px;
            }
            input::-webkit-input-placeholder{
                opacity: 0.4;
            }
            select{
                width: 106.9px;
                height: 29px;
                background-color: #ffffff;
                border: none;
                text-align-last: center;
            }
        }
        .column-one{
            width: 40%;
            margin: 0 5% 0 0;
            div{
                width: 95%;
            }
        }
        .column-two{
          width: 60%;
          select {
              width: 40%;
          }
            label{
                width: 200px;
                padding-right: 5px;
                padding-left: 10px;
            }
            .region{
                width: 50px !important;
                text-align: center;
            }
            input{
                width: 40%;
            }
            .save{
                margin: 20px 0;
                float: right;
                width: 129.7px;
                height: 37px;
                background-color: #ee7739;
                button{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .is-invalid{
            border: 1px solid red;
        }

    }
    .divider{
        height: 38px;
    }
    .call-history-buttons{
        margin: 30px 6%;
        button{
            width: 250px;
            height: 48px;
            background-color: #ffffff;
            font-size: 18px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            letter-spacing: 0.07px;
            color: #707070;
            margin: 0 20px;
        }
    }
    .active-button
    {
      background-color: #ee7739 !important;
      color: white!important;
    }
  .white-label{
    height: 29px;
    background-color: #ffffff;
    width: 262.9px;
    text-align: center;

  }
</style>
