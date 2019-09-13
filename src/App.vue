<template>
  <div class="page-wrapper">
    <div
      v-if="alert.message"
      class="sufee-alert alert with-close alert-danger alert-dismissible fade show"
    >
      <span class="badge badge-pill badge-danger">
        {{ alert.type }}
      </span>
      {{ alert.message }}
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">
          &times;
        </span>
      </button>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'App',
    computed: {
        ...mapState({
            alert: state => state.alert
        })
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear' 
        })
    },
    watch: {
        $route (to, from){
            // clear alert on location change
            this.clearAlert();
        }
    } 
};
</script>