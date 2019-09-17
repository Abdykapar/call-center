<template>
    <div class="call-pagination">
        <div class="pagination-item">
            <button>Previous</button>
        </div>
        <div class="pagination-item">
            <button>Next</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Pagination'
    };
</script>

<style lang="scss" scoped>
    .call-pagination{
        margin: 20px 0 40px 0;
        width: 93%;
        .pagination-item{
            display: flex;
            float: right;
            width: 10%;
            height: 37px;
            background-color: #ee7739;
            margin: 20px 0 50px 50px;
            justify-content: center;
            button{
                height: inherit;
                width: 100%;
                font-size: 18px;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                letter-spacing: 0.07px;
                color: white;
            }
        }
    }
</style>