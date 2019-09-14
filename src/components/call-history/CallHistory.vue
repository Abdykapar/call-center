<template>
  <div class="call-history-container">
      <call-center-header></call-center-header>
      <div class="call-history-content">
          <div class="call-history-profile">
              <div class="profile-header">
                  <span>Анкетная часть</span>
              </div>
              <div class="call-history-form">
                  <form>
                      <div class="column-one">
                          <div>
                              <label>Телефон</label>
                              <input>
                          </div>
                          <div>
                              <label>ФИО</label>
                              <input>
                          </div>
                          <div>
                              <label>Школа № </label>
                              <input>
                          </div>
                          <div>
                              <label>Город</label>
                              <input>
                          </div>
                      </div>

                      <div class="column-two">
                          <div>
                              <label>Дополнительный номер</label>
                              <input>
                          </div>
                          <div>
                              <label>Статус</label>
                              <select>
                                  <option>select</option>
                              </select>
                          </div>
                          <div class="divider"></div>
                          <div class="village-region">
                              <label>Село</label>
                              <input>
                              <label class="region">Район</label>
                              <input>
                          </div>
                          <div class="save">
                              <button>Save</button>
                          </div>
                      </div>

                  </form>
              </div>
          </div>
          <div class="call-history-buttons">
              <button @click="showHistory">История Обращений</button>
              <button @click="showQuestion">Новый вопрос</button>
              <button @click="showClient">Информация о Клиенте</button>
          </div>
          <div v-show="showCallHistoryTable">
              <call-history-table></call-history-table>
          </div>
          <div v-show="showNewQuestion">
              <call-new-question></call-new-question>
          </div>
          <div v-show="showInfoClient">
              <call-client-info></call-client-info>
          </div>
      </div>
  </div>
</template>

<script>
import Header from '@/components/header/Header';
import CallHistoryTable from '@/components/call-history/CallHistoryTable';
import CallNewQuestion from '@/components/call-history/CallNewQuestion';
import CallClientInfo from '@/components/call-history/CallClientInfo';

export default {
    name: 'CallHistory',
    components:{
        CallCenterHeader: Header,
        CallHistoryTable,
        CallNewQuestion,
        CallClientInfo
    },
    data ()
    {
        return {
            showCallHistoryTable: true,
            showNewQuestion: false,
            showInfoClient: false,
        };
    },
    methods: {
        showHistory ()
        {
            if (!this.showCallHistoryTable) {
                this.showCallHistoryTable = true;
                this.showNewQuestion = false;
                this.showInfoClient = false;
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
        }
    }

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
            input{
                width: 70%;
                height: 29px;
                background-color: #ffffff;
                padding-left: 10px;
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
            label{
                width: 200px;
                padding-right: 5px;
                padding-left: 10px;
            }
            .region{
                width: 50px !important;
                text-align: center;
            }
            .village-region{
                input{
                    width: 25%;
                }
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
</style>
