<template>
  <div class="product-form">
    <div>
      <img :src="mySrc" alt />
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required="true" v-model="myName" />
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input
          type="text"
          id="price"
          name="price"
          required="true"
          v-model="myPrice"
          @input="handleChange"
        />
      </div>
      <div class="form-group">
        <label for="remaining">剩餘數量</label>
        <input
          type="text"
          id="remaining"
          name="remaining"
          required="true"
          v-model="myRemaining"
          @input="handleChange"
        />
      </div>
      <div class="form-group">
        <label for="src">圖片網址</label>
        <input type="text" id="src" name="src" required="true" v-model="mySrc" />
      </div>
      <div class="form-group">
        <label for="type">Type</label>
        <input type="text" id="type" name="type" required="true" v-model="myType" />
      </div>
      <div>
        <button @click.prevent="handleCancel">取消</button>
        <button class="save" type="submit">保存</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ProductForm",
  props: {
    name: String,
    price: { type: [String, Number] },
    remaining: { type: [String, Number] },
    src: String,
    type: String
  },
  data() {
    return {
      myName: this.name,
      myPrice: this.price,
      myRemaining: this.remaining,
      mySrc: this.src,
      myType: this.type
    };
  },
  watch: {
    name(val) {
      this.myName = val;
    },
    price(val) {
      this.myPrice = val;
    },
    remaining(val) {
      this.myRemaining = val;
    },
    src(val) {
      this.mySrc = val;
    },
    type(val) {
      this.myType = val;
    }
  },
  methods: {
    handleChange(e) {
      if (e.target.name == "price") {
        this.myPrice = this.myPrice.replace(/^0|\D/g, "");
      } else {
        this.myRemaining = this.myRemaining.replace(/^0|\D/g, "");
      }
    },
    handleCancel() {
      window.history.back();
    },
    handleSubmit() {
      this.$emit("submit", {
        name: this.myName,
        price: this.myPrice,
        remaining: this.myRemaining,
        src: this.mySrc,
        type: this.myType
      });
    }
  }
};
</script>

<style>
</style>