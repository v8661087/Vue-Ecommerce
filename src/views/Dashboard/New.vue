<template>
  <div>
    <loading
      :active.sync="isLoading"
      :color="'white'"
      :background-color="'#17181c'"
    ></loading>
    <ProductForm
      :name="name"
      :price="price"
      :remaining="remaining"
      :src="src"
      :type="type"
      @submitForm="submitForm"
    />
    <div class="modal" v-show="showAdd">新增成功</div>
  </div>
</template>

<script>
import ProductForm from "@/components/ProductForm";
import axios from "axios";
export default {
  data() {
    return {
      name: "超級噴火龍Ｘ",
      price: "999",
      remaining: "93",
      src:
        "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/ca3db4aad5c85a525d9be86852b26db1db7a22c0.png",
      type: "火 龍",
      showAdd: false,
    };
  },
  components: { ProductForm },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  methods: {
    async submitForm(val) {
      this.name = val.name;
      this.price = val.price;
      this.remaining = val.remaining;
      this.src = val.src;
      this.type = val.type;
      this.$store.state.isLoading = true;
      try {
        await axios.post(
          process.env.VUE_APP_PRODUCTS_URL,
          {
            name: this.name,
            price: this.price,
            quantity: 1,
            remaining: this.remaining,
            type: this.type,
            src: this.src,
          },
          {
            headers: { token: this.$store.state.token },
          }
        );
        this.showAdd = true;
        this.$store.state.isLoading = true;
        setTimeout(() => {
          this.$store.state.isLoading = false;
          this.showAdd = false;
          this.$router.push("/dashboard/products");
        }, 1000);
      } catch (err) {
        alert("此帳號無法進行操作");
        this.$store.state.isLoading = false;
      }
    },
  },
};
</script>

<style lang="scss">
</style>