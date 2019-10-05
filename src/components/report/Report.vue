<template>
  <div class="report-container">
    <pre-loader :show="loading"></pre-loader>
    <div class="report-header">
      <button @click="exportToExcel('tblexportData')">
        <img src="/static/images/report/icons8-curved-arrow-240@3x.png">
        Export File
      </button>
      <div class="report-header-item">
        <label>Start Date: </label>
        <a-date-picker
          v-model="startDate"
          format="LL"
          @change="fetchQuestionary"></a-date-picker>
      </div>
      <div class="report-header-item">
        <label>End Date: </label>
        <a-date-picker
          v-model="endDate"
          format="LL"
          @change="fetchQuestionary"></a-date-picker>
      </div>
    </div>
    <div class="report-table">
      <a-table
        id="tblexportData"
        :columns="columns"
        :data-source="questionaries"
        :pagination="false"
        bordered
        @change="onChange"
        :rowKey="record => record.id"
        :scroll="{ x: '80%' }"
      >
        <template
          slot="lastName"
          slot-scope="text, record"
        >
          {{ record.firstName }} {{ record.lastName }}
        </template>
        <template
          slot="replied"
          slot-scope="text"
        >
          <span v-if="text === 1">
            +
          </span>
          <span v-else>
            -
          </span>
        </template>
        <template
          slot="personType"
          slot-scope="text"
        >
          <span v-if="text === 1">
            Родитель
          </span>
          <span v-else-if="text === 2">
            Ученик
          </span>
          <span v-else>
            Другой
          </span>
        </template>
      </a-table>
    </div>
  </div>
</template>


<script>
import { questionaryService } from '@/_services/questionary.service';
import PreLoader from '@/components/preloader/PreLoader';

import moment from 'moment';
const columns = [
    {
        title: 'Дата и Время',
        dataIndex: 'repliedAt',
        key: 'repliedAt',
        sorter: (a, b) => a.repliedAt < b.repliedAt ? -1 : a.repliedAt > b.repliedAt ? 1 : 0,
    }, {
        title: 'Категория вопроса',
        dataIndex: 'categoryTitle',
        key: 'categoryTitle',
        filters: [{
          text: 'технический вопрос',
          value: 'технический вопрос',
        }, {
          text: 'пароль и логин',
          value: 'пароль и логин',
        }, {
          text: 'оценка',
          value: 'оценка'
        }, {
          text: 'кард-ридер',
          value: 'кард-ридер',
        }],
        filterMultiple: true,
        onFilter: (value, record) => record.categoryTitle.indexOf(value) === 0,
        sorter: (a, b) => a.categoryTitle < b.categoryTitle ? -1 : a.categoryTitle > b.categoryTitle ? 1 : 0,
    }, {
        title: 'ФИО',
        dataIndex: 'firstName',
        key: 'firstName',
        sorter: (a, b) => a.firstName < b.firstName ? -1 : a.firstName > b.firstName ? 1 : 0,
        scopedSlots: { customRender: 'lastName' },
    },{
        title: 'Телефон',
        dataIndex: 'phone',
        key: 'phone',
        sorter: (a, b) => a.phone - b.phone,
    }, {
        title: 'Доп. номер',
        dataIndex: 'extraPhone',
    }, {
        title: 'Вопрос',
        dataIndex: 'question',
        key: 'question',
        sorter: (a, b) => a.question < b.question ? -1 : a.question > b.question ? 1 : 0,
        width: 250
    },{
        title: 'Ответ',
        dataIndex: 'answer',
        key: 'answer',
        sorter: (a, b) => a.answer < b.answer ? -1 : a.answer > b.answer ? 1 : 0,
    },{
        title: 'Комментарий',
        dataIndex: 'comment',
        key: 'comment',
        sorter: (a, b) => a.comment < b.comment ? -1 : a.comment > b.comment ? 1 : 0,
    },{
        title: 'Ответ дан',
        dataIndex: 'replied',
        key: 'replied',
        sorter: (a, b) => a.replied < b.replied ? -1 : a.replied > b.replied ? 1 : 0,
        filters: [ {
            text: '+',
            value: '1',
        }, {
            text: '-',
            value: '2',
        } ],
        filterMultiple: true,
        onFilter: (value, record) => record.replied == value,
        scopedSlots: { customRender: 'replied' },
    },{
        title: 'Статус',
        dataIndex: 'personType',
        key: 'personType',
        sorter: (a, b) => a.personType < b.personType ? -1 : a.personType > b.personType ? 1 : 0,
        scopedSlots: { customRender: 'personType' },
    }, {
        title:'Школа',
        dataIndex: 'schoolName',
        key: 'schoolName',
        sorter: (a, b) => a.schoolName < b.schoolName ? -1 : a.schoolName > b.schoolName ? 1 : 0,
    } ];
let filteredData=[];
function onChange ( pagination, filters, sorter, sourceData) {
    filteredData = sourceData;
    console.log('params', pagination, filters, sorter, sourceData);
}


export default {
    name: 'Report',
    components: {
        PreLoader
    },
    data () {
        return {
            loading: false,
            columns,
            filteredData,
            questionaries: [],
            startDate: null,
            endDate: null,
            json_fields: {
                'Дата и Время': 'repliedAt',
                'Категория вопроса': 'categoryTitle',
                'Имя': 'firstName',
                'Фамилия': 'lastName',
                'Телефон': 'phone',
                'Доп. номер': 'extraPhone',
                'Вопрос': 'question',
                'Ответ': 'answer',
                'Комментарий': 'comment',
                'Ответ дан': {
                    field: 'replied',
                    callback: (value) => {
                        return value === 1 ? '+' : '-';
                    }
                },
                'Статус': {
                    field: 'personType',
                    callback: (value) => {
                        return value === 1 ? 'Родитель' : value === 2 ? 'Ученик' : 'Другой';
                    }
                },
                'Школа': 'schoolName',
            },
            json_meta: [
                [
                    {
                        key: 'charset',
                        value: 'utf-8',
                    },
                ],
            ]
        };
    },
    created ()
    {
        this.fetchQuestionary();
    },
    methods: {
        onChange,
        fetchQuestionary ()
        {
            this.loading = true;
            questionaryService.getList().then(res => {
                if (this.startDate !== null && this.endDate !== null)
                {
                    this.questionaries = res.filter(question => moment(question.repliedAt,'DD.MM.YYYY HH:mm') >= this.startDate && moment(question.repliedAt,'DD.MM.YYYY HH:mm') <= this.endDate);
                }
                else if (this.startDate !== null)
                {
                    this.questionaries = res.filter(question => moment(question.repliedAt,'DD.MM.YYYY HH:mm') >= this.startDate);
                }
                else if (this.endDate !== null)
                {
                    this.questionaries = res.filter(question => moment(question.repliedAt,'DD.MM.YYYY HH:mm') <= this.endDate);
                }
                else
                {this.questionaries = res;}
                this.filteredData = this.questionaries;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
                console.log(err)
            });
        },
        exportToExcel (tableID, filename = ''){
            let downloadurl;
            const dataFileType = 'application/vnd.ms-excel';
            const tableSelect = document.getElementById(tableID);
            const tableHTMLData = tableSelect.outerHTML.replace(/ /g, '%20');

            // Specify file name
            filename = filename?filename+'.xls':'export_excel_data.xls';

            // Create download link element
            downloadurl = document.createElement('a');

            document.body.appendChild(downloadurl);

            if (navigator.msSaveOrOpenBlob){
                const blob = new Blob([ '\ufeff', tableHTMLData ], {
                    type: dataFileType
                });
                navigator.msSaveOrOpenBlob( blob, filename);
            } else {
                // Create a link to the file
                downloadurl.href = 'data:' + dataFileType + ', ' + tableHTMLData;

                // Setting the file name
                downloadurl.download = filename;

                //triggering the function
                downloadurl.click();
            }
        }
    }
};
</script>
<style lang="scss" scoped>
    .report-container{
        display: table;
        width: 100%;
        background-color: #f3f3f3;
    }
    .report-header{
        display: flex;
        justify-content: space-around;
        /*height: 100px;*/
        padding: 50px 50px;
        button{
            width: 135.5px;
            height: 32px;
            background-color: #ee7739;
            img {
                height: 20px;
            }
            color: white;
        }
        label{
            padding-right: 20px;
        }
    }
    .report-table{
        width: 95%;
        margin: 20px auto 20px auto;
        background-color: white;
    }
</style>
