<template>
    <div class="call-new-question">
        <form>
            <div>
                <label class="category">
                    {{ $lang.words.questionCategory }}
                </label>
                <select
                        v-model="updatedData.categoryId"
                        v-validate="'required'"
                        name="category"
                        :class="{ active: submitted && errors.has('category') }"
                        @change="checkCategory(updatedData.categoryId)"
                >
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.title }}
                    </option>
                    <option value="0">{{ $lang.words.otherCategory }}</option>
                </select>
            </div>
            <div v-show="showNewCategory">
                <label class="category">
                    {{ $lang.words.addCategory }}
                </label>
                <input v-model="newCategory.title" :placeholder="$lang.words.addCategory"></input>
            </div>
            <div>
                <label>{{ $lang.words.question }}</label>
                <textarea
                        v-model="updatedData.question"
                        v-validate="'required'"
                        name="question"
                        :class="{active: submitted && errors.has('question')}"
                ></textarea>
            </div>
            <div>
                <label>{{ $lang.words.answer }}</label>
                <textarea
                        v-model="updatedData.answer"
                        :class="{'active': checkAnswer}"
                ></textarea>
            </div>
            <div>
                <label>{{ $lang.words.operatorComment }}</label>
                <textarea v-model="updatedData.comment">
        </textarea>
            </div>
            <div>
                <button @click.prevent="saveWithAnswer()">
                    {{ $lang.words.answered }}
                </button>
                <button @click.prevent="saveWithoutAnswer()">
                    {{ $lang.words.notAnswered }}
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
        props: ['person', 'callType', 'data', 'updateOrNot'],
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
                    phone: '',
                    schoolId: '',
                    replied: null,
                    questionCategoryId: 0,
                },
                dataCheck: false,
                submitted: false,
                categories: '',
                checkAnswer: false,
                newCategory: {},
                showNewCategory: false,
            };
        },
        computed: {
            updatedData: function () {
                if (!this.updateOrNot) {
                    return this.questionary;
                }
                return this.data;
            },
        },
        created () {
            this.fetchCategories();
        },
        methods: {
            saveWithAnswer () {
                if (this.updatedData.answer && this.updatedData.answer.length) {
                    this.questionary.replied = true;
                    this.saveQuestionary();
                    this.checkAnswer = false;
                } else {
                    this.checkAnswer = true;
                }

            },
            saveWithoutAnswer () {
                this.checkAnswer = false;
                this.questionary.replied = false;
                this.saveQuestionary();
            },
            saveQuestionary () {
                this.$emit('check');
                this.submitted = true;
                this.$validator.validate().then(valid => {
                    console.log(valid);
                    if (valid) {
                        this.questionary.repliedAt = this.person.repliedAt;
                        this.questionary.extraPhone = this.person.extraPhone;
                        this.questionary.personType = this.person.personType;
                        this.questionary.firstName = this.person.name;
                        this.questionary.lastName = this.person.surname;
                        this.questionary.middleName = this.person.patronymic;
                        this.questionary.phone = this.person.phone;
                        this.questionary.schoolId = this.person.schoolId || null;
                        this.questionary.callType = this.callType;
                        this.questionary.answer = this.updatedData.answer;
                        this.questionary.comment = this.updatedData.comment;
                        this.questionary.question = this.updatedData.question;
                        if(this.newCategory.title){
                            questionCategoryService.create(this.newCategory).then(res => {
                                this.postData(res.id);
                                this.newCategory = {};
                            }).catch(err => console.log(err));
                        } else {
                            this.postData(this.updatedData.categoryId);
                        }
                    }
                }).catch(err => console.log(err));
            },
            postData(categoryId){
                this.questionary.questionCategoryId = categoryId;
                if (this.updateOrNot) {
                    this.questionary.id = this.updatedData.uuid;
                    questionaryService.update(this.questionary).then(res => {
                        this.$toaster.success(this.$lang.words.successMessage, { timeout: 3000 });
                        this.$router.push('/');
                    }).catch(err => {
                        console.log(err);
                        this.$toaster.error(this.$lang.words.error, { timeout: 3000 });
                    });
                } else {
                    questionaryService.create(this.questionary).then(res => {
                        this.$router.push('/');
                        this.$toaster.success(this.$lang.words.successMessage, { timeout: 3000 });
                    }).catch(err => console.log(err));
                }
            },
            fetchCategories () {
                questionCategoryService.getAll().then(res => {
                    this.categories = res;
                }).catch(err => console.log(err));
            },
            checkCategory(categoryId){
                this.newCategory = {};
                this.showNewCategory = categoryId === '0';
            }
        }
    };
</script>

<style lang="scss" scoped>
    .call-new-question {
        margin: 0 7%;

        form {
            label {
                font-size: 18px;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                letter-spacing: 0.07px;
                color: #ee7739;
                width: 100%;
            }

            select {
                padding-left: 10px;
                margin-left: 20px;
                width: 200px;
                height: 30px;
                background-color: #ffffff;
                border: none;
            }
            input {
                padding-left: 10px;
                margin: 10px 0 10px 35px;
                width: 50%;
                height: 30px;
                background-color: #ffffff;
                border: none;
            }

            .category {
                width: initial;
                font-size: 18px;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                letter-spacing: 0.07px;
                color: #ee7739;
            }

            textarea {
                height: 64px;
                background-color: #ffffff;
                width: 66%;
                margin: 0 0 10px 0;
                padding-left: 10px;
            }

            .database-check {
                label {
                    width: 26%;
                }
            }

            button {
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

    .active {
        border: 1px solid red !important;
    }
</style>