<template>
    <div class="call-center-home">
        <pre-loader :show="loading"></pre-loader>
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
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr class="spacer"></tr>
                <template v-for="(item,index) in questions">
                    <tr class="spacer"></tr>
                    <tr :key="item.uuid">
                        <td>{{ item.callType === 1 ? $lang.words.incoming : $lang.words.outgoing }}</td>
                        <td>{{ item.repliedAt }}</td>
                        <td>{{ item.categoryTitle }}</td>
                        <td>{{ item.firstName }} {{ item.lastName }} {{ item.patronymic }}</td>
                        <td>{{ item.phone }}</td>
                        <td>{{ item.shortQuestion }}{{ item.question.length > 20 ? '...' : ' ' }}</td>
                        <td>{{ item.replied === 1 ? '+' : '-' }}</td>
                        <td><i class="fa fa-edit" data-toggle="modal" data-target="#exampleModal"
                               @click="showEditQuestionary(item,index)"></i></td>
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
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{ $lang.words.edit_questionary }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="changeCall">{{ $lang.words.callType }}</label>
                                <select v-model="question.callType" class="form-control" id="changeCall">
                                    <option value="1">{{ $lang.words.incoming }}</option>
                                    <option value="2">{{ $lang.words.outgoing }}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="date">{{ $lang.words.date }}</label>
                                <a-date-picker
                                        v-model="date"
                                        class="form-control"
                                        format="DD/MM/YYYY HH:mm"
                                        :placeholder="$lang.words.chooseDate"
                                ></a-date-picker>
                            </div>
                            <div class="form-group">
                                <label for="category">{{ $lang.words.category }}</label>
                                <select class="form-control" v-model="question.categoryId" id="category">
                                    <option v-for="category in categories" :key="category.id" :value="category.id">
                                        {{ category.title }}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="name">{{ $lang.words.name }}</label>
                                <input type="text" v-model="question.firstName" class="form-control" id="name" :placeholder="$lang.words.name">
                            </div>
                            <div class="form-group">
                                <label for="surname">{{ $lang.words.surname }}</label>
                                <input type="text" v-model="question.lastName" class="form-control" id="surname" :placeholder="$lang.words.surname">
                            </div>
                            <div class="form-group">
                                <label for="Patronymic">{{ $lang.words.lastName }}</label>
                                <input type="text" class="form-control" v-model="question.patronymic" id="Patronymic"
                                       :placeholder="$lang.words.lastName">
                            </div>
                            <div class="form-group">
                                <label for="phone">{{ $lang.words.phone }}</label>
                                <input type="text" v-model="question.phone" class="form-control" id="phone" :placeholder="$lang.words.phone">
                            </div>
                            <div class="form-group">
                                <label for="extra-phone">{{ $lang.words.extraPhone }}</label>
                                <input type="text" v-model="question.extraPhone" class="form-control" id="extra-phone"
                                       :placeholder="$lang.words.extraPhone">
                            </div>
                            <div class="form-group">
                                <label for="Question">{{ $lang.words.question }}</label>
                                <textarea class="form-control" id="Question" v-model="question.question" rows="3"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="Answer">{{ $lang.words.answer }}</label>
                                <textarea class="form-control" id="Answer" v-model="question.answer" rows="3"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="Comment">{{ $lang.words.operatorComment }}</label>
                                <textarea class="form-control" id="Comment" v-model="question.comment" rows="3"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="region">{{ $lang.words.region }}</label>
                                <select class="form-control" v-model="region.id" id="region" @change="getRayons(region.id)">
                                    <option v-for="region in regions" :key="region.id" :value="region.id">{{ region.title }}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="rayon">{{ $lang.words.rayon }}</label>
                                <select class="form-control" id="rayon" v-model="rayon.id" @change="getSchools(rayon.id)">
                                    <option v-for="rayon in rayons" :key="rayon.id" :value="rayon.id">{{ rayon.title }}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="school">{{ $lang.words.school }}</label>
                                <select class="form-control" id="school" v-model="question.schoolId">
                                    <option v-for="school in schools" :key="school.id" :value="school.id">{{ school.name }}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="personType">{{ $lang.words.status }}</label>
                                <select class="form-control" id="personType" v-model="question.personType">
                                    <option v-for="type in parentType" :key="type.id" :value="type.id">
                                        {{ $lang.words[type.name] }}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="replied">{{ $lang.words.haveAnswer }}</label>
                                <select class="form-control" v-model="question.replied" id="replied">
                                    <option :value="1">{{ $lang.words.yes }}</option>
                                    <option :value="2">{{ $lang.words.no }}</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $lang.words.close }}
                        </button>
                        <button @click.prevent="editQuestionary" data-dismiss="modal" type="button" class="btn btn-primary">{{ $lang.words.save }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { locationService } from '@/_services/location/location.service';
    import { questionCategoryService } from '@/_services/questionCategory.service';
    import { schoolService } from '@/_services/school.service';
    import Header from '@/components/header/Header';
    import { questionaryService } from '@/_services/questionary.service';
    import Pagination from '@/components/pagination/Pagination';
    import PreLoader from '@/components/preloader/PreLoader';
    import moment from 'moment';

    export default {
        name: 'CallDatabase',
        components: {
            'call-center-header': Header,
            Pagination,
            PreLoader,
        },
        data () {
            return {
                loading: false,
                showDialog: false,
                questions: [],
                currentPage: 0,
                totalPages: 0,
                pageSize: 0,
                question: {},
                categories: [],
                regions: [],
                rayons: [],
                schools: [],
                parentType: [
                    {
                        id:1,
                        name: 'parent',
                    },
                    {
                        id:2,
                        name: 'student',
                    },
                    {
                        id:3,
                        name: 'other',
                    }
                ],
                rayon: {},
                region: {},
                index: 0,
                date: moment(),
            };
        },
        created () {
            this.fetchQuestions();
        },
        methods: {
            fetchQuestions () {
                this.loading = true;
                questionaryService.getAll().then(res => {
                    if (res['_embedded']['questionaryResourceList']) {
                        this.questions = res['_embedded']['questionaryResourceList'].map(item => {
                            item.shortQuestion = item.question.substring(0, 20);
                            return item;
                        });
                        this.currentPage = res.page.number;
                        this.totalPages = res.page.totalPages;
                        this.pageSize = res.page.size;
                        this.loading = false;
                    }
                }).catch(err => {
                    console.log(err);
                    this.loading = false;
                });
            },
            fetchPages (page, size) {
                this.loading = true;
                questionaryService.getAll(page, size).then(res => {
                    if (res['_embedded']['questionaryResourceList']) {
                        this.questions = res['_embedded']['questionaryResourceList'].map(item => {
                            item.shortQuestion = item.question.substring(0, 20);
                            return item;
                        });
                        this.currentPage = res.page.number;
                        this.totalPages = res.page.totalPages;
                        this.pageSize = res.page.size;
                    }
                    this.loading = false;
                }).catch(err => {
                    console.log(err);
                    this.loading = false;
                });
            },
            changePage (page, size) {
                this.fetchPages(page, size);
            },
            showEditQuestionary (item, index) {
                this.showDialog = true;
                this.index = index;
                this.question = item;
                this.date = moment((this.question.repliedAt), 'DD/MM/YYYY HH:mm');
                this.getCategories();
                this.getRegions();
                this.getSchool(item.schoolId);
            },
            getSchool(id){
                schoolService.getById(id).then(res => {
                    this.rayon = res.rayon;
                    this.region = res.region;
                    this.getRayons(res.region.id);
                    this.getSchools(res.rayon.id);
                }).catch(err => console.log(err));
            },
            getCategories () {
                questionCategoryService.getAll().then(res => {
                    this.categories = res;
                }).catch(err => console.log(err));
            },
            getRegions () {
                locationService.getRegions().then(res => {
                    this.regions = res.content;
                }).catch(err => console.log(err));
            },
            getRayons (id) {
                locationService.getRayonByRegion(id).then(res => {
                    this.rayons = res;
                }).catch(err => console.log(err));
            },
            getSchools (id) {
                schoolService.getByRayon(id).then(res => {
                    this.schools = res;
                }).catch(err => console.log(err));
            },
            editQuestionary () {
                const newQuestion = {
                    id: this.question.id,
                    answer: this.question.answer,
                    callType: this.question.callType,
                    comment: this.question.comment,
                    extraPhone: this.question.extraPhone,
                    firstName: this.question.firstName,
                    lastName: this.question.lastName,
                    middleName: this.question.patronymic,
                    personType: this.question.personType,
                    phone: this.question.phone,
                    question: this.question.question,
                    questionCategoryId: this.question.categoryId,
                    replied: this.question.replied === 1,
                    repliedAt: moment(this.date).format('DD.MM.YYYY HH:mm'),
                    schoolId: this.question.schoolId
                };
                questionaryService.update(newQuestion).then(res => {
                    this.question.categoryTitle = this.categories.find(item => item.id === this.question.categoryId).title;
                    this.$set(this.questions, this.index, this.question);
                    this.$toaster.success(this.$lang.words.successMessage,{timeout: 3000});
                }).catch(err => console.log(err));
            }
        }
    };
</script>
<style lang="scss" scoped>
    .call-center-home {
        background-color: #f3f3f3;
        width: 100%;
        height: 100vh;
        display: table;
    }

    .home-content {
        width: 100%;

        table {
            display: table;
            width: 90%;
            margin: 50px auto;

            tr {
                th {
                    font-family: Helvetica;
                    font-size: 18px;
                    font-weight: normal;
                    text-align: center;
                    color: #ee7739;
                    padding: 0 10px;
                }

                input::-webkit-input-placeholder {
                    text-align: center;
                }

                input {
                    text-align: center;
                }

                td {
                    text-align: center;
                }

                select {
                    border: none;
                    width: 100%;
                    height: 33px;
                    text-align-last: center;
                }
            }

            tbody {
                tr {
                    width: 100%;
                    height: 33px;
                    background-color: #ffffff;

                    td {
                        color: #707070;
                        font-size: 16px;

                        i {
                            font-size: 14px;
                            padding-right: 10px;
                            cursor: pointer;
                        }
                    }
                }
            }

            .spacer {
                height: 20px;
            }
        }
    }

    .date {
        padding-right: 40px;
    }
</style>