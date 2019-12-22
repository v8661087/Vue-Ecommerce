<template>
  <div v-if="product" class="dashboard__action">
    <div>
      <img :src="src" alt />
      <div style="width:90px;margin:0 auto" class="delete" @click="showAlert=true">刪除商品</div>
    </div>
    <ProductForm
      :name="name"
      :price="price"
      :remaining="remaining"
      :src="src"
      :type="type"
      @submit="handleSubmit"
    />

    <div class="modal" v-show="showUpdate">更新成功</div>
    <div class="modal" v-show="showAlert">
      <div>確定要刪除這個商品嗎?</div>
      <button @click="handleDelete">確定</button>
      <button @click="showAlert=false">取消</button>
    </div>
    <div class="modal" v-show="showDelete">刪除成功</div>
  </div>
</template>

<script>
import axios from "axios";
import ProductForm from "@/components/ProductForm";
export default {
  data() {
    return {
      name: "",
      price: "",
      src: "",
      remaining: "",
      type: "",
      showUpdate: false,
      showAlert: false,
      showDelete: false
    };
  },
  components: { ProductForm },
  computed: {
    product() {
      return this.$store.state.products.find(
        item => item._id == this.$route.params.id
      );
    }
  },
  mounted() {
    if (this.product) {
      this.name = this.product.name;
      this.price = this.product.price;
      this.remaining = this.product.remaining;
      this.src = this.product.src;
      this.type = this.product.type;
    }
  },
  methods: {
    handleSubmit(val) {
      this.name = val.name;
      this.price = val.price;
      this.remaining = val.remaining;
      this.src = val.src;
      this.type = val.type;
      axios.patch(process.env.VUE_APP_PRODUCTS_URL + this.product._id, {
        name: this.name,
        price: this.price,
        remaining: this.remaining,
        src: this.src,
        type: this.type
      });
      this.showUpdate = true;
      setTimeout(() => {
        this.showUpdate = false;
        this.$router.push("/dashboard/products");
      }, 1000);
    },
    handleDelete() {
      if (this.$store.state.products.indexOf(this.product) < 9) {
        alert("這個商品不能刪除");
      } else {
        axios.delete(process.env.VUE_APP_PRODUCTS_URL + this.product._id);
        this.showDelete = true;
        setTimeout(() => {
          this.showDelete = false;
          this.$router.push("/dashboard/products");
        }, 1000);
      }
    }
  }
};
</script>

<style lang="scss">
</style>