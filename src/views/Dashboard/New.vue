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
      showAdd: false
    };
  },
  components: { ProductForm },
  methods: {
    handleSubmit(val) {
      this.name = val.name;
      this.price = val.price;
      this.remaining = val.remaining;
      this.src = val.src;
      this.type = val.type;
      axios.post(process.env.VUE_APP_PRODUCTS_URL, {
        name: this.name,
        price: this.price,
        quantity: 1,
        remaining: this.remaining,
        type: this.type,
        src: this.src
      });
      this.showAdd = true;
      setTimeout(() => {
        this.showAdd = false;
        this.$router.push("/dashboard/products");
      }, 1000);
    }
  }
};
</script>

<style lang="scss">
</style>