<template>
    <div class="call-center-header">
        <div class="top-menu">
            <div class="top-menu-items">
                <div class="top-menu-main">
                <span>
                    <img src="/static/images/header/home-interface-button-symbol-2@3x.png">
                </span>
                    <span class="main">Главная</span>
                </div>
                <div class="logout">
                    <span class="exit"> Выход </span>
                </div>
            </div>
        </div>
        <div class="divider">

        </div>
        <div class="header-nav-bar">
            <span>
                <img src="/static/images/header/books-stack-of-three%20(1)@3x.png">
                База знаний
            </span>
            <span>
                <img src="/static/images/header/incoming-call@3x.png">
                Исходящий звонок
            </span>
            <span>
                <img src="/static/images/header/incoming-call@3x.png">
                Входящий звонок
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Header'
    };
</script>

<style lang="scss" scoped>
    .call-center-header{
        background-color: #474747;
        height: 138px;
        width: 100%;
        padding: 0 70px 0 40px;
    }
    .top-menu{
        width: 100%;
        .top-menu-items{
            display: flex;
            float: right;
        }
        .top-menu-main{
            display: flex;
            height: 37px;
            border-radius: 0 0 20px 20px;
            border: solid 4px #ee7739;
            border-top: 0;
            span{
                width: 100%;
                font-family: Helvetica;
                font-size: 18px;
                font-weight: bold;
                font-style: normal;
                color: #ffffff;
                padding-left: 12px;
                cursor: pointer;
            }
        }
        .main{
            padding: 5px 15px 5px 5px;
        }
        .exit{
            float: right;
            margin: 0 30px;
            font-family: Helvetica;
            font-size: 16px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            color: #ffffff;
            cursor: pointer;
        }
        .logout{
            margin-top: 8px;
        }
    }
    .divider{
        height: 90px;
        width: 100%;
    }
    .header-nav-bar{
        font-family: Helvetica;
        font-size: 20px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        letter-spacing: 0.08px;
        color: #ffffff;
        img{
            margin: 0 5px;
            height: 20px;
        }
        span{
            cursor: pointer;
            padding: 0 20px;
        }
    }
</style>