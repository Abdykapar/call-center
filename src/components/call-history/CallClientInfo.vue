<template>
  <div class="client-info">
    <div class="client-info-call-center">
      <div class="column-left">
        <div class="item">
          <label>{{ $lang.words.fullName }}</label>
          <div class="info">
            <span>{{ person.name }} {{ person.surname }} {{ person.patronymic }}</span>
          </div>
        </div>
        <div class="item">
          <label>{{ $lang.words.phone }}</label>
          <div class="info">
            <span>{{ person.phone }}</span>
          </div>
        </div>
        <div class="item">
          <label>{{ $lang.words.school }} №</label>
          <div class="info">
            <span>{{ person.schoolTitle }}</span>
          </div>
        </div>
        <div class="item" v-for="student in students" :key="student.id">
          <label>Имя ученика</label>
          <div class="info">
            <span>{{ student.studentTitle }}</span>
          </div>
        </div>
        <div class="item">
          <label>{{ $lang.words.login }}</label>
          <div class="info">
            <span>{{ person.username }}</span>
          </div>
        </div>
      </div>
      <div class="column-right">
        <div class="item">
          <label>{{ $lang.words.address }}</label>
          <div class="info">
            <span>{{ person.address }}</span>
          </div>
        </div>
        <div class="item">
          <label>{{ $lang.words.position }}</label>
          <div class="info">
            <span>{{ person.position }}</span>
          </div>
        </div>
        <div class="item">
          <label>{{ $lang.words.rayon }}</label>
          <div class="info">
            <span>{{ school.rayon.title }}</span>
          </div>
        </div>
        <div class="item" v-for="student in students" :key="student.id">
          <label>Класс ученика</label>
          <div class="info">
            <span>{{ student.studentClassTitle }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'CallClientInfo',
    props: [ 'person','school', 'students' ],
    data (){
        return {
            fullName: '',
        };
    },
    created () {
      console.log(this.students);
    }
};
</script>

<style lang="scss" scoped>
    .client-info{
        width: 100%;
    }
    .client-info-call-center{
        display: flex;
        width: 100%;
        .column-left{
            width: 40%;
        }
        .item{
            display: flex;
        }
        label{
            font-size: 18px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            letter-spacing: 0.07px;
            color: #ee7739;
            width: 200px;
            padding-top: 10px;
        }
        span{

        }
        .info{
            margin: 5px 0 auto 10px;
            height: 30px;
            background-color: #ffffff;
            width: 262.9px;
            display: flex;
            span{
                font-size: 16px;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                letter-spacing: 0.06px;
                color: #707070;
                margin-left: 10px;
                padding-top: 5px;
            }
        }
        .column-right{
            /*label{*/
            /*    width: 300px;*/
            /*}*/
        }
    }
    .client-info-header{
        display: flex;
        width: 90%;
        justify-content: center;
        span{
            width: 35%;
            font-size: 18px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            letter-spacing: 0.07px;
            color: #ee7739;
            text-align: center;
            margin: 0 0 20px 0;
        }
    }
    .client-info-question{
        display: flex;
        justify-content: center;
        width: 90%;
        span{
            margin: 0 20px;
            width: 400px;
            background-color: #ffffff;
            text-align: center;
        }
    }
</style>
