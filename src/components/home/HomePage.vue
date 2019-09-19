<template>
  <div class="call-center-home">
    <call-center-header />
    <div class="home-content">
        <table>
          <thead>
            <tr>
              <th>Тип звонка</th>
              <th>Дата вопроса</th>
              <th>Категория вопроса</th>
              <th>ФИО</th>
              <th>Телефон</th>
              <th>Сокращенный текст вопроса</th>
              <th>Есть ответ</th>
              <th>Дать ответ</th>
            </tr>
          </thead>
          <tbody>
          <tr class="spacer"></tr>
            <tr>
              <td>
                <select>
                  <option>select</option>
                  <option>select</option>
                </select>
              </td>
              <td>Филтр</td>
              <td>Филтр</td>
              <td>
                <input type="text" placeholder="Поиск">
              </td>
              <td>
                <input type="text" placeholder="Поиск">
              </td>
              <td>
                <input type="text" placeholder="Поиск">
              </td>
              <td>Филтр</td>
              <td></td>
            </tr>
          <template v-for="item in data">
            <tr class="spacer"></tr>
            <tr :key="item.uuid">
              <td>{{ item.callType === 1 ? 'Входящий' : 'Исходящий' }}</td>
              <td>{{ item.repliedAt }}</td>
              <td>{{ item.categoryTitle }}</td>
              <td>{{ item.firstName }} {{ item.lastName }} {{ item.patronymic }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.shortQuestion }}{{ item.question.length > 20 ? '...' : ' ' }}</td>
              <td>{{ item.replied === 1 ? '+' : '-' }}</td>
              <td>
                <router-link :to="{ name: 'CallHistoryOutgoing', params: { questionaryToAnswer: item } }">
                  <i class="fa fa-phone"></i>
                </router-link>
              </td>
            </tr>
          </template>

          </tbody>
        </table>
      <pagination
          v-if="data.length"
          :total-pages="totalPages"
          :current-page="currentPage"
          :page-size="pageSize"
          @changePage="changePage"
      ></pagination>
    </div>
    <md-dialog :md-active.sync="showQuestionary">

    </md-dialog>
  </div>
</template>

<script>
import { questionaryService } from '@/_services/questionary.service';
import Header from '@/components/header/Header';
import Pagination from '@/components/pagination/Pagination';

export default {
    name: 'Home',  
    components: {
        'call-center-header': Header,
        Pagination
    },
    data () {
        return {
            data: [],
            showQuestionary: false,
            totalPages: 0,
            currentPage: 0,
            pageSize: 0,
        };
    },
    created () {
        this.fetchData();
    },
    methods: {
        fetchData ()
        {
            questionaryService.getByNotReplied().then(res => {
                if (res['_embedded'])
                {
                    this.data = res['_embedded']['questionaryResourceList'].map(item => {
                        item.shortQuestion = item.question.substring(0,20);
                        return item;
                    });
                    this.currentPage = res.page.number;
                    this.totalPages = res.page.totalPages;
                    this.pageSize = res.page.size;
                }
                else {
                    this.data = [];
                }
            }).catch(err => console.log(err));
        },
        fetchPages (page, size)
        {
            questionaryService.getByNotReplied(page, size).then(res => {
                if (res['_embedded']['questionaryResourceList'])
                {
                    this.data = res['_embedded']['questionaryResourceList'].map(item => {
                        item.shortQuestion = item.question.substring(0,20);
                        return item;
                    });
                    this.currentPage = res.page.number;
                    this.totalPages = res.page.totalPages;
                    this.pageSize = res.page.size;
                }
                else { this.data = []; }
            }).catch(err => console.log(err));
        },
        changePage (page, size)
        {
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
      margin: 50px auto 0 auto;
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
            i{
              cursor: pointer;
              color: #ee7739;
            }
          }
        }
      }
      .spacer{
        height: 20px;
      }
    }
  }
</style>