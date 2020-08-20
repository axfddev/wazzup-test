<template>
  <div>
    <h1>Users list</h1>
    <hr>
    <button v-if="!loaded" class="btn btn-primary" @click="load" :disabled="loading">{{btnText}}</button>
    <template v-else>

      <div class="row">
        <div class="col-10">
          <div class="form-group">
            <input type="email" class="form-control" placeholder="Search" v-model.lazy="query">
          </div>
        </div>
        <div class="col-2">
          <button type="button" class="btn btn-primary" @click.prevent="setFilter">Search</button>
        </div>
      </div>

      <table class="table">
        <thead>
        <tr class="clickable">
          <th scope="col"
              v-for="(column, colKey) in columns"
              @click="sorting(colKey)"
              @mouseenter="hover = colKey"
              @mouseleave="hover = ''"
          >
            {{column}}
            <v-icon v-show="sort.column == colKey || hover == colKey" :name="sortArrow(colKey)"></v-icon>
          </th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(user,userKey) in pageUsers" class="clickable" @click="selected = userKey">
          <td v-for="(column,colKey) in columns">{{user[colKey]}}</td>
        </tr>
        </tbody>
      </table>
      <modal v-if="show" :content="modal" @close="selected = ''"></modal>
      <pagination v-if="pages > 1" :page="page" :all="pages"></pagination>
    </template>
    <hr>

  </div>
</template>

<script>
  import Modal from '@/components/Modal.vue';
  import Pagination from '@/components/Pagination.vue';
  import 'vue-awesome/icons/long-arrow-alt-up';
  import 'vue-awesome/icons/long-arrow-alt-down';

  export default {
    name: "UserTable",
    data() {
      return {
        hover: '',
        selected: '',
        status: 0,
        users: [],
        error: '',
        query: '',
        filter: '',
        columns: {
          fullname: 'Name',
          uname: 'User name',
          company: 'Company',
          email: 'E-mail',
        },
        sort: {
          column: '',
          desc: false
        }
      }
    },
    props: {
      perPage: {
        type: Number,
        default: 10
      }
    },
    components: {
      Pagination,
      Modal
    },
    computed: {
      show() {
        return this.selected !== '';
      },
      modal() {
        let res = {name: '', city: ''};
        if (this.selected !== '') {
          res.name = this.pageUsers[this.selected].fullname;
          res.city = this.pageUsers[this.selected].address.city;
        }
        return res;
      },
      hasErros() {
        return (this.error.length > 0)
      },
      loading() {
        return this.status === 1;
      },
      loaded() {
        return (this.error === '' && this.status === 2);
      },
      btnText() {
        return this.loading ? 'Loading ...' : 'Show users';
      },
      routePage() {
        return this.$route.query.page;
      },
      page() {
        let page = parseInt(this.routePage);
        if (isNaN(page)) page = 1;
        return Math.min(Math.max(1, page), this.pages);
      },
      pages() {
        return Math.ceil(this.all / this.perPage);
      },
      resUsers() {
        let res = this.users;
        let col = this.sort.column;

        if (this.filter) {
          let columns = Object.keys(this.columns);
          res = res.filter((item) => {
            for (let key in item) {
              if (!columns.includes(key)) continue;
              if (String(item[key]).search(new RegExp(this.filter, "i")) !== -1) return true;
            }
            return false;
          })
        }

        if (col !== '') {
          res.sort((a, b) => {
            if (a[col] > b[col]) return 1;
            if (a[col] < b[col]) return -1;
            return 0;
          })
        }
        if (this.sort.desc) {
          res.reverse();
        }

        return res;
      },
      all() {
        return this.resUsers.length
      },
      pageUsers() {
        let start = ((this.page - 1) * this.perPage);
        return this.resUsers.slice(start, start + this.perPage - 1);
      }
    },
    methods: {
      sortArrow(colName) {
        if (this.sort.column === colName && this.sort.desc) {
          return 'long-arrow-alt-down';
        }
        return 'long-arrow-alt-up';
      },

      setFilter() {
        this.filter = this.query;
        this.$router.push({name: 'Home'});
      },
      sorting(column) {
        if (this.sort.column !== column) {
          this.sort.column = column;
          this.sort.desc = false;
        } else {
          this.sort.desc = !this.sort.desc;
        }
      },
      load() {
        this.status = 1;
        this.axios
          .get('http://www.filltext.com/?rows=100&id=%7Bindex%7D&fullname=%7BfirstName%7D~%7BlastName%7D&company=Bbusiness&email=%7Bemail%7D&uname=%7Busername%7D&address=%7BaddressObject%7D')
          .then(response => {
            this.users = response.data;
            /*throw new Error('Тестовая ошибка');*/
            this.status = 2;
          })
          .catch(err => {
            this.status = 0;
            this.$emit('error', err.message);
          })
      }
    },
    watch: {
      routePage(val) {
        if (this.page != val) this.$router.push({name: 'Home', query: {page: this.page}})
      }
    }
  }
</script>

<style>
  .clickable {
    cursor: pointer;
  }
</style>