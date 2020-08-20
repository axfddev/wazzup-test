<template>
  <nav>
    <ul class="pagination justify-content-center">
      <router-link v-for="(item, key) in items"
                   :to="{name: 'Home', query: {page: item.page}}"
                   v-slot="{href, navigate, isExactActive}"
                   :key="key">
        <li class="page-item">
          <a :href="href" @click="navigate" class="page-link" :class="{disabled: isExactActive}">{{item.name}}</a>
        </li>
      </router-link>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: "pagination",
    props: {
      page: {
        type: Number,
        default: 1
      },
      all: {
        type: Number,
        default: 1
      },
    },
    computed: {
      items() {
        let res = [];
        if (this.page > 1) {
          res.push({name: '1', page: 1});
          res.push({name: 'Prev', page: this.page - 1});
        }

        res.push({name: this.page, page: this.page});

        if (this.page < this.all) {
          res.push({name: 'Next', page: this.page + 1});
          res.push({name: this.all, page: this.all});
        }

        return res;
      }
    }
  }
</script>

<style scoped>
  .disabled {
    pointer-events: none;
    color: red;
  }
</style>
