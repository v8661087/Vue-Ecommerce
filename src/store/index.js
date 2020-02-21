import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    isLoading: true,
    accounts: [
      {
        email: "test@test.com",
        password: "test"
      }
    ],
    logining: false,
    form: {
      email: "123@test.com",
      username: "123",
      usertel: "123",
      useraddress: "123",
      message: "留言測試"
    },
    orders: [],
    lists: ["全部", "火", "水", "草", "電", "冰", "龍"],
    cart: [],
    get totalPrice() {
      return this.cart.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      );
    },
    percentDiscount: null,
    get discountPrice() {
      if (this.percentDiscount) {
        return Math.round(
          (this.totalPrice * (100 - this.percentDiscount)) / 100
        );
      }
      return false;
    },
    products: [],
    coupons: [],
    itemOfPage: 9
  },
  mutations: {
    addToCart(state, product) {
      const cart = state.cart;
      if (cart.some(item => item._id === product._id)) {
        const index = cart.findIndex(item => item._id === product._id);
        cart[index].quantity += product.quantity;
      } else {
        cart.push({ ...product });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      const div = document.createElement("div");
      const text = document.createTextNode("商品已加入購物車");
      div.appendChild(text);
      document.getElementById("popup").appendChild(div);
      setTimeout(() => {
        document.getElementById("popup").removeChild(div);
      }, 1500);
    },
    deleteProduct(state, product) {
      const cart = state.cart;
      cart.splice(cart.indexOf(product), 1);
      localStorage.setItem("cart", JSON.stringify(cart));
    },
    LOADING(state, status) {
      state.isLoading = status;
    },
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    ORDERS(state, payload) {
      state.orders = payload;
    },
    COUPONS(state, payload) {
      state.coupons = payload;
    }
  },
  actions: {
    addToCartAction(context, payload) {
      context.commit("addToCart", payload);
    },
    deleteProductAction(context, payload) {
      context.commit("deleteProduct", payload);
    },
    getProducts(context, payload) {
      context.commit("LOADING", true);
      const api = payload;
      axios.get(api).then(function(response) {
        context.commit("PRODUCTS", response.data);
        context.commit("LOADING", false);
      });
    },
    getOrders(context, payload) {
      context.commit("LOADING", true);
      const api = payload;
      axios.get(api).then(function(response) {
        context.commit("ORDERS", response.data);
        context.commit("LOADING", false);
      });
    },
    getCoupons(context, payload) {
      context.commit("LOADING", true);
      const api = payload;
      axios.get(api).then(function(response) {
        context.commit("COUPONS", response.data);
        context.commit("LOADING", false);
      });
    }
  },
  getters: {},
  modules: {}
});
