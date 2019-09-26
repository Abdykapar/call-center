<template>
  <div class="call-center-home">
    <call-center-header></call-center-header>
    <div class="home-content">
      <table>
        <thead>
          <tr>
            <th>{{ $lang.words.callType }}</th>
            <th>{{ $lang.words.questionDate }}</th>
            <th>{{ $lang.words.questionCategory }}</th>
            <th>{{ $lang.words.fullName }}</th>
            <th>{{ $lang.words.phone }}</th>
            <th>{{ $lang.words.shortQuestionText }}</th>
            <th>{{ $lang.words.haveAnswer }}</th>
          </tr>
        </thead>
        <tbody>
          <tr class="spacer"></tr>
          <template v-for="item in questions">
              <tr class="spacer"></tr>
              <tr :key="item.uuid">
                  <td>{{ item.callType === 1 ? $lang.words.incoming : $lang.words.outgoing }}</td>
                  <td>{{ item.repliedAt }}</td>
                  <td>{{ item.categoryTitle }}</td>
                  <td>{{ item.firstName }} {{ item.lastName }} {{ item.patronymic }}</td>
                  <td>{{ item.phone }}</td>
                  <td>{{ item.shortQuestion }}{{ item.question.length > 20 ? '...' : ' ' }}</td>
                  <td>{{ item.replied === 1 ? '+' : '-' }}</td>
              </tr>
          </template>
        </tbody>
      </table>
    </div>
      <pagination
              v-if="questions.length"
              :total-pages="totalPages"
              :current-page="currentPage"
              :page-size="pageSize"
              @changePage="changePage"
      ></pagination>
  </div>
</template>

<script>
import Header from '@/components/header/Header';
import { questionaryService } from '@/_services/questionary.service';
import Pagination from '@/components/pagination/Pagination';
export default {
    name: 'CallDatabase',
    components: {
        'call-center-header': Header,
        Pagination,
    },
    data () {
        return {
            questions: [],
            currentPage:0,
            totalPages:0,
            pageSize: 0,
        };
    },
    created ()
    {
        this.fetchQuestions();
    },
    methods: {
        fetchQuestions ()
        {
            questionaryService.getAll().then(res => {
                if (res['_embedded']['questionaryResourceList'])
                {
                    this.questions = res['_embedded']['questionaryResourceList'].map(item => {
                        item.shortQuestion = item.question.substring(0,20);
                        return item;
                    });
                    this.currentPage = res.page.number;
                    this.totalPages = res.page.totalPages;
                    this.pageSize = res.page.size;
                }
            }).catch(err => console.log(err));
        },
        fetchPages (page, size)
        {
            questionaryService.getAll(page, size).then(res => {
                if (res['_embedded']['questionaryResourceList'])
                {
                    this.questions = res['_embedded']['questionaryResourceList'].map(item => {
                        item.shortQuestion = item.question.substring(0,20);
                        return item;
                    });
                    this.currentPage = res.page.number;
                    this.totalPages = res.page.totalPages;
                    this.pageSize = res.page.size;
                }
            }).catch(err => console.log(err));
        },
        changePage (page, size)
        {
            console.log('comes');
            this.fetchPages(page, size);
        },
    }
};
</script>
<style lang="scss" scoped>
    .call-center-home{
        background-color: #f3f3f3;
        width: 100%;
        height: 100vh;
        display: table;
    }
    .home-content{
        width: 100%;
        table{
            display: table;
            width: 90%;
            margin: 50px auto;
            tr{
                th{
                    font-family: Helvetica;
                    font-size: 18px;
                    font-weight: normal;
                    text-align: center;
                    color: #ee7739;
                    padding: 0 10px;
                }
                input::-webkit-input-placeholder{
                    text-align: center;
                }
                input{
                    text-align: center;
                }
                td{
                    text-align: center;
                }
                select{
                    border: none;
                    width: 100%;
                    height: 33px;
                    text-align-last: center;
                }
            }
            tbody{
                tr{
                    width: 100%;
                    height: 33px;
                    background-color: #ffffff;
                    td{
                        color: #707070;
                        font-size: 16px;
                    }
                }
            }
            .spacer{
                height: 20px;
            }
        }
    }
</style>