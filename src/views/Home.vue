<template>
  <div class="container">
    <user-table :per-page="15" @error="onError"></user-table>
    <div v-if="error" class="alert alert-danger">{{error}}</div>
  </div>
</template>

<script>
  import UserTable from '@/components/UserTable.vue';

  export default {
    props: ['page'],
    data() {
      return {
        error: ''
      }
    },
    name: 'Home',
    components: {
      UserTable
    },
    methods: {
      onError(err) {
        this.error = err;
      }
    },
    errorCaptured(err, vm, info) {
      this.error = err.toString();
      return false;
    },
  }
</script>
