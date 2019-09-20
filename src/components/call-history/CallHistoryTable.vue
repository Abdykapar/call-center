<template>
  <div class="call-history">
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Дата вопроса</th>
          <th>Ответ дан</th>
          <th>Дата ответа</th>
          <th>Категория</th>
          <th>Вопрос</th>
          <th>Ответ</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item,index) in allData" >
          <tr class="spacer"></tr>
          <tr :key="item.uuid">
            <td>{{ index+1 }}</td>
            <td>{{ item.repliedAt }}</td>
            <td>{{ item.replied === 1 ? '+' : '-' }}</td>
            <td>{{ item.repliedAt }}</td>
            <td>{{ item.categoryTitle }}</td>
            <td>{{ item.question }}</td>
            <td>{{ item.answer }}</td>
            <td>
              <button v-if="item.replied === 2 && callType === 2" @click="$emit('answerQuestion',item)">
                <i class="fa fa-phone"></i>
              </button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <pagination
            v-if="allData.length"
            :page-size="pageSize"
            :total-pages="totalPages"
            :current-page="currentPage"
            @changePage="changePage"
    ></pagination>
  </div>
</template>

<script>
import { questionaryService } from '@/_services/questionary.service';
import Pagination from '@/components/pagination/Pagination';
export default {
    name: 'CallHistoryTable',
    components: {
        Pagination
    },
    props: [ 'data', 'pageData', 'phone', 'callType' ],
    data () {
        return {
            currentPage: 0,
            totalPages: 0,
            pageSize: 0,
            questionHistory: [],
        };
    },
    computed: {
        allData: function () {
            this.questionHistory = this.data;
            return this.questionHistory;
        }
    },
    created () {
        this.fetchAll();
    },
    methods: {
        fetchAll ()
        {
            this.currentPage = this.pageData.page.number;
            this.totalPages = this.pageData.page.totalPages;
            this.pageSize = this.pageData.page.size;
        },
        fetchPages (page, size)
        {
            questionaryService.getByPhone(this.phone, page, size).then(res => {
                if (res['_embedded'])
                {
                    this.questionHistory = res['_embedded']['questionaryResourceList'];
                }
                else { this.questionHistory = []; }
                this.currentPage = res.page.number;
                this.totalPages = res.page.totalPages;
                this.pageSize = res.page.size;
            }).catch(err => console.log(err));
        },
        changePage (page, size) {
            this.fetchPages(page, size);
        }
    }
};
</script>

<style lang="scss" scoped>
    .fa-phone{
        color: #ee7739;
    }
    .call-history{
        table{
            width: 93%;
            display: table;
            tr{
                th{
                    font-size: 18px;
                    font-weight: normal;
                    font-style: normal;
                    font-stretch: normal;
                    letter-spacing: 0.07px;
                    color: #ee7739;
                }
                th:first-child{
                    padding-left: 10px;
                }
            }
            .spacer{
                height: 20px;
            }
            tbody{
                tr{
                    height: 47px;
                    background-color: #ffffff;
                    td:nth-child(3){
                        padding-left: 38px;
                    }
                    td:first-child{
                        padding-left: 15px;
                    }
                }
            }
        }
    }
</style>