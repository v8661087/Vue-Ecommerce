<template>
  <div>
    <ProductForm
      :name="name"
      :price="price"
      :remaining="remaining"
      :src="src"
      :type="type"
      @submit="handleSubmit"
    />
    <div class="modal" v-show="showUpdate">更新成功</div>
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
  }
};
</script>

<style lang="scss">
</style>