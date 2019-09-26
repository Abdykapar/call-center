<template>
  <div class="call-pagination">
      <div class="pagination-item">
          <button v-if="currentPage >= totalPages - 1" class="disabled">{{ $lang.words.next }}</button>
          <button v-else @click="nextPage">{{ $lang.words.next }}</button>
      </div>
      <div class="pagination-item">
      <button v-if="currentPage <= 0" class="disabled" >{{ $lang.words.previous }}</button>
      <button v-else @click="previousPage">{{ $lang.words.previous }}</button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: [ 'totalPages', 'pageSize', 'currentPage' ],
    methods: {
        nextPage ()
        {
            this.$emit('changePage',this.currentPage + 1, this.pageSize);
        },
        previousPage ()
        {
            this.$emit('changePage',this.currentPage - 1, this.pageSize);
        }
    }
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
    .disabled{
        opacity: 0.4;
        cursor: not-allowed;
    }
</style>