<template>
  <div class="call-new-question">
    <form>
      <div>
        <label class="category">
          Категория вопроса
        </label>
        <select>
          <option>ssadd</option>
        </select>
      </div>
      <div>
        <label>Вопрос</label>
        <textarea />
      </div>
      <div>
        <label>Ответ</label>
        <textarea />
      </div>
      <div>
        <label>Комментарий оператора</label>
        <textarea />
      </div>
      <div class="database-check">
        <label>Предложить вопрос в Базу знаний</label>
        <input
          type="checkbox"
          checked
        >
      </div>
      <div>
        <button>Ответ дан</button>
        <button>Ответ не дан</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
    name: 'CallNewQuestion'
};
</script>

<style lang="scss" scoped>
    .call-new-question{
        margin: 0 7%;
        form{
            label{
                font-size: 18px;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                letter-spacing: 0.07px;
                color: #ee7739;
                width: 100%;
            }
            select{
                padding-left: 10px;
                margin-left: 20px;
                width: 135.9px;
                height: 24px;
                background-color: #ffffff;
                border: none;
            }
            .category{
                width: initial;
                font-size: 18px;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                letter-spacing: 0.07px;
                color: #ee7739;
            }
            textarea{
                height: 64px;
                background-color: #ffffff;
                width: 66%;
                margin: 0 0 10px 0;
                padding-left: 10px;
            }
            .database-check{
                label{
                    width: 26%;
                }
            }
            button{
                width: 129.7px;
                height: 37px;
                background-color: #ee7739;
                margin: 30px 50px 30px 0;
                font-size: 18px;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                letter-spacing: 0.07px;
                color: #ffffff;
            }
        }
    }
</style>