<template>
    <div class="parent-substitute-container">
        <pre-loader :show="loading"></pre-loader>
        <call-center-header></call-center-header>
        <div class="parent-substitute-content">
            <div class="form">
                <form @submit.prevent="sendParent">
                    <md-card class="md-layout-item md-size-80 md-small-size-100">
                        <md-card-content>
                            <div class="form-group">
                                <label for="from-parent">{{ $lang.words.substitute_from_parent_login }}</label>
                                <div class="form-group-search">
                                    <a-select
                                            id="from-parent"
                                            mode="multiple"
                                            :placeholder="firstPlaceholder"
                                            :value="selectedItems"
                                            :defaultActiveFirstOption="false"
                                            :showArrow="false"
                                            :filterOption="false"
                                            style="width: 100%"
                                            @change="handleChange"
                                            @search="handleSearch"
                                    >
                                        <a-select-option v-for="item in filteredOptions" :key="item.id" :value="item.id">
                                            {{item.studentTitle}}
                                        </a-select-option>
                                    </a-select>
                                    <a-button type="primary" @click="search">
                                        <i class="fa fa-search"/>
                                    </a-button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="to-parent">{{ $lang.words.substitute_to_parent_login }}</label>
                                <div class="form-group-search">
                                    <a-select
                                            id="to-parent"
                                            showSearch
                                            :placeholder="secondPlaceholder"
                                            :value="toParent"
                                            :defaultActiveFirstOption="false"
                                            :filterOption="false"
                                            :showArrow="true"
                                            @change="handleSecondParent"
                                            style="width: 100%"
                                            @search="secondParentSearch"
                                            :notFoundContent="null"
                                    >
                                        <a-select-option v-for="item in toParents" :key="item.parentId">
                                            {{item.parentName}} {{ item.parentSurname }}
                                        </a-select-option>
                                    </a-select>
                                    <a-button type="primary" @click="secondSearch">
                                        <i class="fa fa-search"/>
                                    </a-button>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">{{ $lang.words.save }}</button>
                        </md-card-content>
                    </md-card>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import studentParentService from '@/_services/studentParent.service';
    import PreLoader from '@/components/preloader/PreLoader';
    import Header from '@/components/header/Header';

    export default {
        name: 'ParentSubstitute',
        components: {
            PreLoader,
            CallCenterHeader: Header
        },
        data () {
            return {
                parent: {
                    parentStudentDtoList:[],
                },
                loading: false,
                submitted: false,
                renderComponent: true,
                students: [],
                selectedItems: [],
                firstPlaceholder: this.$lang.words.parent_username,
                secondPlaceholder: this.$lang.words.parent_username,
                firstUsername: '',
                secondUsername: '',
                selectedStudents: [],
                toParent: [],
                toParents: [],
            };
        },
        computed: {
            filteredOptions() {
                return this.students.filter(o => !this.selectedItems.includes(o));
            },
            userProfile () {
                return this.$store.state.account.profile;
            },
        },
        methods: {
            sendParent(){
                //119895
                this.submitted = true;
                this.$validator.validate().then(valid => {
                    if(valid && this.selectedStudents.length > 0){
                        this.parent.parentId = this.toParent;
                        this.parent.parentalType = 2;
                        this.parent.parentStudentDtoList = this.selectedStudents.map(item => {
                            return {
                                id: item.id,
                                parentId: item.parentId,
                                parentalType: item.parentalType,
                                studentId: item.studentId
                            };
                        });
                        studentParentService.substituteStudent(this.parent).then(res => {
                            this.toParent = [];
                            this.selectedItems = [];
                            this.selectedItems = [];
                            this.selectedStudents = [];
                            this.firstPlaceholder = this.$lang.words.parent_username;
                            this.secondPlaceholder = this.$lang.words.parent_username;
                            this.students = [];
                            this.$toaster.success(this.$lang.words.successMessage,{timeout: 2000});
                        }).catch(err => { console.log(err); })
                    }
                })
            },
            handleSearch(e) {
                this.firstUsername = e;
                this.firstPlaceholder = e;
            },
            search() {
                if(!isNaN(this.firstUsername)) {
                    const data = {
                        'username': this.firstUsername,
                        'password': this.firstUsername
                    };
                    studentParentService.getChildrenList(data).then(res => {
                        this.students = res;
                        document.querySelector('#from-parent').click();
                    }).catch(err => console.log(err));
                }
            },
            handleChange(e) {
                this.selectedItems = e;
                this.selectedStudents = this.students.filter(item => e.includes(item.id));
            },
            handleSecondParent(e) {
                this.toParent = e;
            },
            secondParentSearch(e) {
                this.secondUsername = e;
                this.secondPlaceholder = e;
            },
            secondSearch() {
                if(!isNaN(this.secondUsername)) {
                    const data = {
                        'username': this.secondUsername,
                        'password': this.secondUsername
                    };
                    this.toParents = [];
                    studentParentService.getChildrenList(data).then(res => {
                        this.toParents.push(res[0]);
                        document.querySelector('#to-parent').click();
                    }).catch(err => console.log(err));
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    .parent-substitute-container {
        height: 100vh;
        background-color: #f3f3f3;
    }
    .parent-substitute-content{
        width: 100%;
        /*min-height: 100vh;*/
    }
    .form {
        width: 50%;
        margin: auto;
        padding-top: 50px;
        font-size: 18px;
    }
    .form-group-search {
        display: flex;
    }
    .fa-search {
        margin-right: 5px;
    }
    .ant-btn {
        margin-left: 20px;
    }
</style>
