<template>
  <div
    v-if="show"
    class="loader-container"
  >
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
    props: [ 'show' ],
    data () {
        return {};
    },

    watch: {
        show (bool) {
            if (!bool) {
                const body = document.querySelector('body');
                body.style.overflow = 'unset';
            }
        }
    },

    created () {
        // const body = document.querySelector('body');
        // body.style.overflow = 'hidden';
    }
};
</script>

<style lang="scss" scoped>
    .loader-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: 99999;
        background: rgba(#fff, 0.8);
    }

    .loader,
    .loader:before,
    .loader:after {
        background: #f0783a;
        -webkit-animation: load1 1s infinite ease-in-out;
        animation: load1 1s infinite ease-in-out;
        width: 1em;
        height: 4em;
    }

    .loader {
        color: #f0783a;
        text-indent: -9999em;
        margin: 20% auto 0;
        font-size: 16px;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
    }

    .loader:before,
    .loader:after {
        position: absolute;
        top: 0;
        content: '';
    }

    .loader:before {
        left: -1.5em;
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
    }

    .loader:after {
        left: 1.5em;
    }

    @-webkit-keyframes load1 {
        0%,
        80%,
        100% {
            box-shadow: 0 0;
            height: 4em;
        }
        40% {
            box-shadow: 0 -2em;
            height: 5em;
        }
    }

    @keyframes load1 {
        0%,
        80%,
        100% {
            box-shadow: 0 0;
            height: 4em;
        }
        40% {
            box-shadow: 0 -2em;
            height: 5em;
        }
    }
</style>