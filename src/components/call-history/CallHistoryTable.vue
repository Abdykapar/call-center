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
        </tr>
      </thead>
      <tbody>
        <template v-for="(item,index) in data" >
          <tr class="spacer"></tr>
          <tr :key="item.uuid">
            <td>{{ index+1 }}</td>
            <td>{{ item.repliedAt }}</td>
            <td>{{ item.replied === 1 ? '+' : '-' }}</td>
            <td>{{ item.repliedAt }}</td>
            <td>{{ item.categoryTitle }}</td>
            <td>{{ item.question }}</td>
            <td>{{ item.answer }}</td>
          </tr>
        </template>
      </tbody>
    </table>
    <pagination v-if="data.length"></pagination>
  </div>
</template>

<script>
import Pagination from '@/components/pagination/Pagination';
export default {
    name: 'CallHistoryTable',
    components: {
        Pagination
    },
    props: [ 'data' ],
};
</script>

<style lang="scss" scoped>
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