<template>
  <div>
    <loading :active.sync="isLoading" :color="'white'" :background-color="'#17181c'"></loading>
    <h1>Coupons</h1>
    <button class="new" @click="showModal=true">建立新優惠券</button>
    <!-- Coupons -->
    <table>
      <thead>
        <tr>
          <th width="21%">優惠券</th>
          <th width="15%">代碼</th>
          <th width="9%">折扣</th>
          <th width="27%">到期日</th>
          <th width="9%">啟用</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item) in coupons.slice((currPage-1)*itemOfPage,currPage*itemOfPage)"
          :key="item.id"
        >
          <td>{{item.title}}</td>
          <td>{{item.code}}</td>
          <td>{{item.percent}}%</td>
          <td>{{item.due_date}}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="edit" @click="openModal(item)">編輯</button>
            <button class="delete" @click="showAlert=true">刪除</button>
            <div class="modal" v-show="showAlert">
              <div>確定要刪除這個優惠券嗎?</div>
              <button @click="removeCoupon(item)">確定</button>
              <button @click="showAlert=false">取消</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div id="modal" v-show="showModal">
      <div class="modal-content">
        <form @submit.prevent="updateCoupon">
          <div class="form-group">
            <label for="title">優惠券名稱</label>
            <input
              type="text"
              id="title"
              v-model="tempCoupon.title"
              placeholder="請輸入標題"
              autocomplete="off"
              required="true"
            />
          </div>
          <div class="form-group">
            <label for="code">優惠代碼</label>
            <input
              type="text"
              id="code"
              v-model="tempCoupon.code"
              placeholder="請輸入優惠碼"
              required="true"
              autocomplete="off"
            />
          </div>
          <div class="form-group">
            <label for="due_date">到期日</label>
            <input
              type="date"
              id="due_date"
              v-model="tempCoupon.due_date"
              placeholder="請輸入到期日"
              required="true"
            />
          </div>
          <div class="form-group">
            <label for="percent">折扣百分比</label>
            <input
              type="text"
              id="percent"
              v-model="tempCoupon.percent"
              placeholder="請輸入折扣百分比"
              @input="handleInput"
              autocomplete="off"
              required="true"
            />
          </div>
          <div class="form-group">
            <div class="form-check">
              <input type="checkbox" id="is_enabled" v-model="tempCoupon.is_enabled" />
              <label for="is_enabled">是否啟用</label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" @click="closeModal">取消</button>
            <button class="new" type="submit">保存</button>
          </div>
        </form>
      </div>
    </div>
    <div class="modal" v-show="showDelete">刪除成功</div>
    <div class="modal" v-show="showAdd">新增成功</div>
    <div class="modal" v-show="showUpdate">更新成功</div>
    <!-- Pagination -->
    <Pagination :currPage="currPage" :totalPage="totalPage" @setPage="setPage" />
  </div>
</template>

<script>
import axios from "axios";
import Pagination from "@/components/Pagination.vue";
import { mapState } from "vuex";
export default {
  name: "Coupons",
  data() {
    return {
      showModal: false,
      showAlert: false,
      showDelete: false,
      showAdd: false,
      showUpdate: false,
      tempCoupon: {
        title: "coupon",
        code: "30off",
        due_date: "2020-02-29",
        percent: 30,
        is_enabled: true
      },
      currPage: 1
    };
  },
  components: {
    Pagination
  },
  computed: {
    ...mapState(["coupons", "itemOfPage", "isLoading"]),
    totalPage() {
      return Math.ceil(this.coupons.length / this.itemOfPage);
    }
  },
  methods: {
    handleInput(e) {
      this.tempCoupon.percent = e.target.value.replace(/^0|\D/g, "");
      const max = 99;
      if (this.tempCoupon.percent > max) {
        this.tempCoupon.percent = max;
      }
    },
    closeModal() {
      this.showModal = false;
      this.tempCoupon = {};
    },
    openModal(item) {
      this.showModal = true;
      this.tempCoupon = { ...item };
    },
    async updateCoupon() {
      this.$store.state.isLoading = true;
      if (this.tempCoupon._id) {
        try {
          await axios.patch(
            process.env.VUE_APP_COUPONS_URL + this.tempCoupon._id,
            this.tempCoupon,
            {
              headers: { token: this.$store.state.token }
            }
          );
          this.showUpdate = true;
          setTimeout(() => {
            this.showUpdate = false;
          }, 1000);
        } catch (err) {
          alert("此帳號無法進行操作");
        }
      } else {
        try {
          await axios.post(process.env.VUE_APP_COUPONS_URL, this.tempCoupon, {
            headers: { token: this.$store.state.token }
          });
          this.showAdd = true;
          setTimeout(() => {
            this.showAdd = false;
          }, 1000);
        } catch (err) {
          alert("此帳號無法進行操作");
        }
      }
      this.tempCoupon = {};
      this.getCoupons();
      this.showModal = false;
    },
    async removeCoupon(item) {
      this.$store.state.isLoading = true;
      this.showAlert = false;
      try {
        await axios.delete(process.env.VUE_APP_COUPONS_URL + item._id, {
          headers: { token: this.$store.state.token }
        });
        this.getCoupons();
        this.showDelete = true;
        setTimeout(() => {
          this.showDelete = false;
        }, 1000);
      } catch (err) {
        alert("此帳號無法進行操作");
        this.$store.state.isLoading = false;
      }
    },
    getCoupons() {
      this.$store.dispatch("getCoupons", process.env.VUE_APP_COUPONS_URL);
    },
    setPage(n) {
      if (this.currPage !== n) {
        this.currPage = n;
        window.scrollTo(0, 0);
      }
    }
  },
  created() {
    (window.onclick = e => {
      if (e.target === document.getElementById("modal")) {
        this.showModal = false;
        this.tempCoupon = {};
      }
    }),
      this.getCoupons();
  },
  updated() {
    if (this.totalPage === 1) {
      this.currPage = 1;
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  display: inline-block;
  margin: 30px 60px;
}
#modal {
  position: fixed;
  z-index: 999;
  padding-top: 60px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-content {
  background-color: #17181c;
  margin: auto;
  padding: 30px 30px 60px;
  border: 1px solid #888;
  width: 60%;
}
</style>