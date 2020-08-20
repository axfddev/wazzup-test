<template>
  <div class="modal" id="exampleModalCenter">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">User data</h5>
          <button type="button" class="close" @click="close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div>User Name: {{content.name}}</div>
          <div>City: {{content.city}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "modal",
    props: {
      show: {
        type: Boolean,
        default: false
      },
      content: {
        type: Object,
        default() {
          return {
            name: '',
            city: ''
          }
        }
      }
    },
    created() {
      window.addEventListener('click', this.onClick);
      window.addEventListener('keyup', this.onkeyup);
    },
    destroyed() {
      window.removeEventListener('click', this.onClick);
      window.removeEventListener('keyup', this.onkeyup);
    },
    methods: {
      onkeyup(event) {
        if (event.key === "Escape") this.close();
      },
      onClick(event) {
        if (event.target === this.$el) this.close();
      },
      close() {
        this.$emit('close');
      }
    }
  }
</script>

<style scoped>
  .modal {
    display: block;
  }
</style>