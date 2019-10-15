<template>
    <div class="call-center-home">
        <pre-loader :show="loading"></pre-loader>
        <call-center-header/>
        <div class="home-content">
            <a-table
                    :columns="columns"
                    :dataSource="questionaries"
                    @change="onChange"
                    :rowKey="record => record.id"
                    bordered>
                <template slot="callTitle">
                    <span>{{ $lang.words.callType }}</span>
                </template>
                <template slot="dateTimeTitle">
                    <span>{{ $lang.words.dateAndTime }}</span>
                </template>
                <template slot="categoryTitle">
                    <span>{{ $lang.words.questionCategory }}</span>
                </template>
                <template slot="nameTitle">
                    <span>{{ $lang.words.fullName }}</span>
                </template>
                <template slot="phoneTitle">
                    <span>{{ $lang.words.phone }}</span>
                </template>
                <template slot="questionTitle">
                    <span>{{ $lang.words.question }}</span>
                </template>
                <template slot="haveAnswerTitle">
                    <span>{{ $lang.words.haveAnswer }}</span>
                </template>
                <template slot="giveAnswerTitle">
                    <span>{{ $lang.words.giveAnswer }}</span>
                </template>
                <template slot="lastName" slot-scope="text, record">
                    {{record.firstName}} {{record.lastName}}
                </template>
                <template slot="replied" slot-scope="text">
                    <span v-if="text === 1">+</span>
                    <span v-else>-</span>
                </template>
                <template slot="personType" slot-scope="text">
                    <span v-if="text === 1"> Родитель </span>
                    <span v-else-if="text === 2"> Ученик </span>
                    <span v-else>Другой</span>
                </template>
                <template slot="callType" slot-scope="text">
                    <span v-if="text === 1">Входящий</span>
                    <span v-else-if="text === 2">Исходящий</span>
                </template>
                <template slot="operation" slot-scope="text, record">
                    <router-link :to="{ name: 'CallHistoryOutgoing', params: { questionaryToAnswer: record } }">
                        <i class="fa fa-phone"></i>
                    </router-link>
                </template>
            </a-table>
        </div>
    </div>
</template>

<script>
    import { questionaryService } from '@/_services/questionary.service';
    import Header from '@/components/header/Header';
    import PreLoader from '@/components/preloader/PreLoader';
    import moment from 'moment';

    const columns = [
        {
        slots: { title: 'callTitle' },
        dataIndex: 'callType',
        scopedSlots: { customRender: 'callType' },
    }, {
        slots: { title: 'dateTimeTitle' },
        dataIndex: 'repliedAt',
        sorter: (a, b) => a.repliedAt < b.repliedAt ? -1 : a.repliedAt > b.repliedAt ? 1 : 0,
    }, {
        slots: { title: 'categoryTitle' },
        dataIndex: 'categoryTitle',
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
        slots: { title: 'nameTitle' },
        dataIndex: 'firstName',
        sorter: (a, b) => a.firstName < b.firstName ? -1 : a.firstName > b.firstName ? 1 : 0,
        scopedSlots: { customRender: 'lastName' },
    }, {
        slots: { title: 'phoneTitle' },
        dataIndex: 'phone',
        sorter: (a, b) => a.phone - b.phone,
    }, {
        slots: { title: 'questionTitle' },
        dataIndex: 'question',
        sorter: (a, b) => a.question < b.question ? -1 : a.question > b.question ? 1 : 0,
        width: 250
    }, {
        slots: { title: 'haveAnswerTitle' },
        dataIndex: 'replied',
        sorter: (a, b) => a.replied < b.replied ? -1 : a.replied > b.replied ? 1 : 0,
        scopedSlots: { customRender: 'replied' },
    }, {
        slots: { title: 'giveAnswerTitle' },
        key: 'operation',
        scopedSlots: { customRender: 'operation' }
    }];

    function onChange (pagination, filters, sorter) {
        // console.log('params', pagination, filters, sorter);
    }

    export default {
        name: 'Home',
        components: {
            'call-center-header': Header,
            PreLoader,
        },
        data () {
            return {
                columns,
                loading: false,
                questionaries: [],
                data: [],
                showQuestionary: false,
                totalPages: 0,
                currentPage: 0,
                pageSize: 0,
            };
        },
        created () {
            this.fetchQuestionaries();
        },
        methods: {
            onChange,
            fetchQuestionaries () {
                this.loading = true;
                questionaryService.getByNotReplied().then(res => {
                    this.questionaries = res;
                    this.loading = false;
                }).catch(err => {
                    console.log(err);
                    this.loading = false;
                });
            },

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

    a {
        display: flex;
        justify-content: center;
        color: #ee7739;
    }

    .home-content {
        width: 95%;
        margin: 20px auto;
    }
</style>