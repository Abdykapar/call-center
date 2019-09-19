<template>
  <div class="client-info">
    <div class="client-info-call-center">
      <div class="column-left">
        <div class="item">
          <label>ФИО</label>
          <div class="info">
            <span>{{ person.name }} {{ person.surname }} {{ person.patronymic }}</span>
          </div>
        </div>
        <div class="item">
          <label>Телефон</label>
          <div class="info">
            <span>{{ person.phone }}</span>
          </div>
        </div>
        <div class="item">
          <label>Школа №</label>
          <div class="info">
            <span>{{ person.schoolTitle }}</span>
          </div>
        </div>
        <div class="item">
          <label>Регион</label>
          <div class="info">
            <span>{{ school.region.title }}</span>
          </div>
        </div>
      </div>
      <div class="column-right">
        <div class="item">
          <label>Адрес</label>
          <div class="info">
            <span>{{ person.address }}</span>
          </div>
        </div>
        <div class="item">
          <label>Position</label>
          <div class="info">
            <span>{{ person.position }}</span>
          </div>
        </div>
        <div class="item">
          <label>Район</label>
          <div class="info">
            <span>{{ school.rayon.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'CallClientInfo',
    props: [ 'person','school' ],
    data (){
        return {
            fullName: '',
        };
    },
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
            width: 100px;
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