<template>
    <div class="client-info">
<!--        <div class="client-info-header">-->
<!--            <span>Header 1</span>-->
<!--            <span>Header 2</span>-->
<!--            <span>Header 3</span>-->
<!--        </div>-->
<!--        <div class="client-info-question">-->
<!--            <span>Технический вопрос</span>-->
<!--            <span>Технический вопрос</span>-->
<!--            <span>Технический вопрос</span>-->
<!--        </div>-->
        <div class="client-info-call-center">
            <div class="column-left">
                <div class="item">
                    <label>ФИО</label>
                    <div class="info">
                        <span>dasda</span>
                    </div>
                </div>
                <div class="item">
                    <label>Телефон</label>
                    <div class="info">
                        <span>dasda</span>
                    </div>
                </div>
                <div class="item">
                    <label>Школа №</label>
                    <div class="info">
                        <span>dasda</span>
                    </div>
                </div>
                <div class="item">
                    <label>Город</label>
                    <div class="info">
                        <span>dasda</span>
                    </div>
                </div>
            </div>
            <div class="column-right">
                <div class="item">
                    <label>Дополнительный номер</label>
                    <div class="info">
                        <span>dasda</span>
                    </div>
                </div>
                <div class="item">
                    <label>Село</label>
                    <div class="info">
                        <span>dasda</span>
                    </div>
                </div>
                <div class="item">
                    <label>Район</label>
                    <div class="info">
                        <span>dasda</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CallClientInfo'
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
        }
        span{

        }
        .info{
            margin: auto 0 auto 10px;
            height: 30px;
            background-color: #ffffff;
            width: 262.9px;
            span{
                font-size: 16px;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                letter-spacing: 0.06px;
                color: #707070;
                margin-left: 10px;
            }
        }
        .column-right{
            label{
                width: 300px;
            }
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