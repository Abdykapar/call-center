<template>
  <div class="call-history-container">
    <CallCenterHeader />
    <div class="call-history-content">
      <div class="call-history-profile">
        <div class="profile-header">
          <span>Анкетная часть</span>
        </div>
        <div class="call-history-form">
          <form @submit.prevent="saveData">
            <div class="column-one">
              <div>
                <label>Телефон</label>
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
                <label>Имя</label>
                <input v-model="person.name">
              </div>
              <div>
                <label>Фамилия</label>
                <input v-model="person.surname">
              </div>
              <div>
                <label>Отчество</label>
                <input v-model="person.patronymic">
              </div>
              <div>
                <label>Школа № </label>
                <input v-model="person.schoolTitle">
              </div>
            </div>

            <div class="column-two">
              <div>
                <label>Дополнительный номер</label>
                <input v-model="person.extraPhone">
              </div>
              <div>
                <label>Статус</label>
                <select v-model="person.personType">
                  <option
                    v-for="type in parentType"
                    :key="type.id"
                    :value="type.id"
                  >
                    {{ type.name }}
                  </option>
                </select>
              </div>
              <div>
                <label>Дата</label>
                <a-date-picker
                  v-model="dateNow"
                  show-time
                  format="YYYY-MM-DD HH:mm"
                  placeholder="Выберите дату"></a-date-picker>
              </div>
              <div>
                <label>
                  Район
                </label>
                <input v-model="school.rayon.title">
              </div>
              <div>
                <label>Регион</label>
                <input v-model="school.region.title">
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="call-history-buttons">
        <button @click="showHistory" :class="{ 'active-button' : showCallHistoryTable }">
          История Обращений
        </button>
        <button @click="showQuestion" :class="{ 'active-button' : showNewQuestion }">
          Ответить на вопрос
        </button>
        <button @click="showClient" :class="{ 'active-button' : showInfoClient }">
          Информация о Клиенте
        </button>
      </div>
      <div v-if="showCallHistoryTable">
        <CallHistoryTable
          v-if="renderComponent"
          :data="data"
          :page-data="pageData"
          :call-type="callType"
          :phone="phone"
          @answerQuestion="answerQuestion"
        />
      </div>
      <div v-if="showNewQuestion">
        <CallNewQuestion
          v-if="renderComponent"
          :person="personChanged"
          :call-type="callType"
          :data="updatedFirstData"
          :update-or-not="updateQuestionary"
        />
      </div>
      <div v-if="showInfoClient">
        <CallClientInfo
          v-if="renderComponent"
          :person="personChanged"
          :school="school"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { questionaryService } from '@/_services/questionary.service';
import Header from '@/components/header/Header';
import CallHistoryTable from '@/components/call-history/CallHistoryTable';
import CallNewQuestion from '@/components/call-history/CallNewQuestion';
import CallClientInfo from '@/components/call-history/CallClientInfo';
import { personService } from '@/_services/person.service';
import { schoolService } from '@/_services/school.service';
import moment from 'moment';

moment.locale('ru');

export default {
    name: 'CallHistoryOutgoing',
    components:{
        CallCenterHeader: Header,
        CallHistoryTable,
        CallNewQuestion,
        CallClientInfo,
    },
    // eslint-disable-next-line vue/require-prop-types
    props: [ 'questionaryToAnswer' ],
    data ()
    {
        return {
            showCallHistoryTable: true,
            showNewQuestion: false,
            showInfoClient: false,
            phone:'',
            submitted: false,
            person:{
                name:'',
                surname:'',
                patronymic: '',
                repliedAt:'',
                extraPhone:'',
                personType:1,
                schoolTitle:'',
            },
            dateNow:moment(),
            school: {
                rayon: {
                    title: '',
                },
                region: {
                    title: '',
                }
            },
            validPhone:false,
            selectedPerson: null,
            callType:'',
            parentType: [
                {
                    id:1,
                    name: 'Родитель',
                },
                {
                    id:2,
                    name: 'Ученик',
                },
                {
                    id:3,
                    name: 'Другой',
                }
            ],
            renderComponent: true,
            data: [],
            updateQuestionary: true,
            pageData: {
                page: {
                    number: 0,
                    size: 0,
                    totalPages: 0,
                }
            },
            firstData: [],
        };
    },
    computed: {
        personChanged: function () {
            this.person.repliedAt= moment(this.dateNow).format('DD.MM.YYYY HH:mm');
            return this.person;
        },
        updatedFirstData: function () {
            return this.firstData;
        }
    },
    created () {
        this.checkCallType();
        this.checkAnswerCall();
    },
    methods: {
        checkPhone (e)
        {
            if (isNaN(e.target.value)){
                this.validPhone = true;
            } else {
                this.validPhone = false;
                if (e.target.value.length >= 1)
                {
                    this.fetchPersonWithPhone(this.phone);
                }
            }
        },
        fetchPersonWithPhone (phone)
        {
            personService.getByPhone(phone).then(res => {
                if (res)
                {
                    this.person = res;
                    this.person.personType = 1;
                    this.person.repliedAt = '';
                    this.person.extraPhone = '';
                    this.fetchSchool(res.schoolId);
                    this.fetchData(phone);
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
                    };
                    this.school.region.title = '';
                    this.school.rayon.title = '';
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
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid){
                    console.log(this.phone);
                }
            });
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
                    this.firstData = res['_embedded']['questionaryResourceList'].filter(item => item.replied === 2)[0];
                }
                else {this.data = [];}
            }).catch(err => console.log(err));
        },
        checkAnswerCall ()
        {
            if (this.questionaryToAnswer)
            {
                this.showQuestion();
                this.phone = this.questionaryToAnswer.phone;
                this.person.schoolTitle = this.questionaryToAnswer.schoolName;
                this.person.personType = this.questionaryToAnswer.personType;
                this.person.extraPhone = this.questionaryToAnswer.extraPhone;
                this.person.name = this.questionaryToAnswer.firstName;
                this.person.surname = this.questionaryToAnswer.lastName;
                this.person.patronymic = this.questionaryToAnswer.patronymic;
                this.person.phone = this.questionaryToAnswer.phone;
                this.fetchSchool(this.questionaryToAnswer.schoolId);
                this.firstData = this.questionaryToAnswer;
            } else { console.log(false); }
        },
        answerQuestion (question)
        {
            this.firstData = question;
            this.showQuestion();
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
                min-width: 100px;
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
            width: 30%;
            margin: 0 5% 0 0;
        }
        .column-two{
            width: 60%;
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
            width: 220.9px;
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
</style>
