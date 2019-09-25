<template>
  <div class="call-new-question">
    <form>
      <div>
        <label class="category">
          Категория вопроса
        </label>
        <select
                v-model="updatedData.categoryId"
                v-validate="'required'"
                name="category"
                :class="{ active: submitted && errors.has('category') }"
        >
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.title }}
          </option>
        </select>
      </div>
      <div>
        <label>Вопрос</label>
        <textarea
          v-model="updatedData.question"
          v-validate="'required'"
          name="question"
          :class="{active: submitted && errors.has('question')}"
        ></textarea>
      </div>
      <div>
        <label>Ответ</label>
        <textarea
                v-model="updatedData.answer"
                :class="{'active': checkAnswer}"
        ></textarea>
      </div>
      <div>
        <label>Комментарий оператора</label>
        <textarea v-model="updatedData.comment">
        </textarea>
      </div>
<!--      <div class="database-check">-->
<!--        <label>Предложить вопрос в Базу знаний</label>-->
<!--        <input-->
<!--          v-model="dataCheck"-->
<!--          type="checkbox"-->
<!--        >-->
<!--      </div>-->
      <div>
        <button @click.prevent="saveWithAnswer()">
          Ответ дан
        </button>
        <button @click.prevent="saveWithoutAnswer()">
          Ответ не дан
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { questionaryService } from '@/_services/questionary.service';
import { questionCategoryService } from '@/_services/questionCategory.service';

export default {
    name: 'CallNewQuestion',
    props: [ 'person', 'callType', 'data', 'updateOrNot' ],
    data () {
        return {
            questionary: {
                answer: '',
                callType: '',
                comment: '',
                question: '',
                categoryId: '',
                repliedAt: '',
                extraPhone: '',
                firstName: '',
                lastName: '',
                middleName: '',
                personType: '',
                phone:'',
                schoolId: '',
                replied: null,
                questionCategoryId: 0,
            },
            dataCheck: false,
            submitted: false,
            categories: '',
            checkAnswer: false,
            categoryRequired: false,
        };
    },
    computed: {
        updatedData: function () {
            if (!this.updateOrNot)
            {
                return this.questionary;
            }
            console.log(this.data);
            return this.data;
        },
    },
    created () {
        this.fetchCategories();
    },
    methods: {
        saveWithAnswer ()
        {
            if (this.updatedData.answer && this.updatedData.answer.length)
            {
                this.questionary.replied = true;
                this.saveQuestionary();
                this.checkAnswer = false;
            }
            else {
                this.checkAnswer = true;
            }

        },
        saveWithoutAnswer ()
        {
            this.checkAnswer = false;
            this.questionary.replied = false;
            this.saveQuestionary();
        },
        saveQuestionary ()
        {
            this.categoryRequired = this.questionary.questionCategoryId === 0;
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.questionary.repliedAt = this.person.repliedAt;
                    this.questionary.extraPhone = this.person.extraPhone;
                    this.questionary.personType = this.person.personType;
                    this.questionary.firstName = this.person.name;
                    this.questionary.lastName = this.person.surname;
                    this.questionary.middleName = this.person.patronymic;
                    this.questionary.phone = this.person.phone;
                    this.questionary.schoolId = this.person.schoolId;
                    this.questionary.callType = this.callType;
                    if (this.updateOrNot)
                    {
                        this.questionary.answer = this.updatedData.answer;
                        this.questionary.comment = this.updatedData.comment;
                        this.questionary.question = this.updatedData.question;
                        this.questionary.questionCategoryId = this.updatedData.categoryId;
                        this.questionary.id = this.updatedData.uuid;
                        console.log(this.questionary);
                        questionaryService.update(this.questionary).then(res => {
                            this.$toaster.success(res.message, { timeout:2000 });
                        }).catch(err => {
                            console.log(err);
                            this.$toaster.error('Something went wrong',{ timeout:2000 });
                        });
                    }
                    else {
                        this.questionary.answer = this.updatedData.answer;
                        this.questionary.comment = this.updatedData.comment;
                        this.questionary.question = this.updatedData.question;
                        this.questionary.questionCategoryId = this.updatedData.categoryId;
                        console.log(this.questionary);
                        questionaryService.create(this.questionary).then(res => {
                            this.$toaster.success(res.message, { timeout:2000 });
                        }).catch(err => console.log(err));
                    }

                }
            }).catch(err => console.log(err));
        },
        fetchCategories ()
        {
            questionCategoryService.getAll().then(res => {
                this.categories = res;
            }).catch(err => console.log(err));
        }
    }
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
                width: 200px;
                height: 30px;
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
    .active{
        border: 1px solid red !important;
    }
</style>