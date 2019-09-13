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
            </tr>
            <tr class="spacer"></tr>
          <tr>
            <td>lorem</td>
            <td>lorem</td>
            <td>lorem</td>
            <td>lorem</td>
            <td>lorem</td>
            <td>lorem</td>
            <td>lorem</td>
          </tr>
          </tbody>
        </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Header from '@/components/header/Header';

export default {
    components: {
        'call-center-header': Header
    },
    computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.users.all
        })
    },
    created () {
        this.getAllUsers();
    },
    methods: {
        ...mapActions('users', {
            getAllUsers: 'getAll',
            deleteUser: 'delete'
        }),
        ...mapActions('account', [ 'logout' ]),
        signOut (){
            this.logout();
        },

    }
};
</script>
<style lang="scss" scoped>
  .call-center-home{
    background-color: #f3f3f3;
    width: 100%;
    height: 100vh;
  }
  .home-content{
    width: 100%;
    table{
      display: table;
      width: 90%;
      margin: 50px auto;
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
          }
        }
      }
      .spacer{
        height: 20px;
      }
    }
  }
</style>