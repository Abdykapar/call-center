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
        <tr class="spacer" />
        <tr>
          <td>1</td>
          <td>08.08.2019</td>
          <td>+</td>
          <td>08.08.2019</td>
          <td>Технический вопрос</td>
          <td>Не могу открыть страницу</td>
          <td>Предоставили данные</td>
        </tr>
        <tr class="spacer" />
        <tr>
          <td>1</td>
          <td>08.08.2019</td>
          <td>+</td>
          <td>08.08.2019</td>
          <td>Технический вопрос</td>
          <td>Не могу открыть страницу</td>
          <td>Предоставили данные</td>
        </tr>
        <tr class="spacer" />
        <tr>
          <td>1</td>
          <td>08.08.2019</td>
          <td>+</td>
          <td>08.08.2019</td>
          <td>Технический вопрос</td>
          <td>Не могу открыть страницу</td>
          <td />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
    name: 'CallHistoryTable'
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