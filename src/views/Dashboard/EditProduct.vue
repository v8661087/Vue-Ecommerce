<template>
  <div class="edit">
    <div>
      <img :src="src" alt />
      <div class="delete" @click="showAlert=true">刪除商品</div>
    </div>
    <form @submit.prevent="handleSubmit" action autocomplete="off">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required="true" v-model="name" />
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input
          type="text"
          id="price"
          name="price"
          required="true"
          v-model="price"
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
          v-model="remaining"
          @input="handleChange"
        />
      </div>
      <div class="form-group">
        <label for="src">圖片網址</label>
        <input type="text" id="src" name="src" required="true" v-model="src" />
      </div>

      <div class="form-group">
        <label for="type">Type</label>
        <input type="text" id="type" name="type" required="true" v-model="type" />
      </div>
      <input type="submit" value="保存" />
    </form>
    <div class="update" v-show="showUpdate">更新成功</div>
    <div class="alert" v-show="showAlert">
      <div>確定要刪除這個商品嗎?</div>
      <button @click="handleDelete">確定</button>
      <button @click="showAlert=false">取消</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      price: "",
      src: "",
      remaining: "",
      type: "",
      showUpdate: false,
      showAlert: false
    };
  },
  computed: {
    product() {
      return this.$store.state.products.find(
        item => item.id == this.$route.params.id
      );
    }
  },
  beforeMount() {
    this.name = this.product.name;
    this.price = this.product.price;
    this.remaining = this.product.remaining;
    this.src = this.product.src;
    this.type = this.product.type;
  },
  methods: {
    handleChange(e) {
      if (e.target.name == "price") {
        this.price = this.price.replace(/^0|\D/g, "");
      } else {
        this.remaining = this.remaining.replace(/^0|\D/g, "");
      }
    },
    handleSubmit() {
      this.product.name = this.name;
      this.product.price = this.price;
      this.product.src = this.src;
      this.product.type = this.type;
      this.showUpdate = true;
      setTimeout(() => {
        this.showUpdate = false;
        this.$router.push("/dashboard/products");
      }, 1000);
    },
    handleDelete() {
      this.$store.state.products.splice(
        this.$store.state.products.indexOf(this.product),
        1
      );
      this.$router.push("/dashboard/products");
    }
  }
};
</script>

<style lang="scss">
.edit {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  img {
    width: 50vw;
  }
}
.update,
.alert {
  position: fixed;
  top: 30%;
  left: 50%;
  width: 330px;
  height: 219px;
  background: #17181c;
  border: 1px solid gray;
  margin-left: -165px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.alert {
  button {
    width: 40%;
    border-radius: 0;
  }
}
.delete {
  width: 90px;
  padding: 9px;
  cursor: pointer;
  margin: 0 auto;
  &:hover {
    color: red;
  }
}
</style>