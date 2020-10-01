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
        password: "test",
      },
    ],
    token: "",
    logining: false,
    form: {
      email: "123@test.com",
      username: "123",
      usertel: "123",
      useraddress: "123",
      message: "留言測試",
    },
    orders: [],
    lists: [
      "全部",
      "火",
      "水",
      "草",
      "電",
      "冰",
      "龍",
      "鋼",
      "飛行",
      "一般",
      "格鬥",
    ],
    cart: [],
    get totalPrice() {
      return this.cart.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      );
    },
    percentDiscount: 0,
    get discountPrice() {
      return Math.round((this.totalPrice * (100 - this.percentDiscount)) / 100);
    },
    products: [],
    coupons: [],
    itemOfPage: 9,
  },
  mutations: {
    addToCart(state, product) {
      const cart = state.cart;
      if (cart.some((item) => item._id === product._id)) {
        const index = cart.findIndex((item) => item._id === product._id);
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
    },
  },
  actions: {
    getProducts({ commit }, payload) {
      commit("LOADING", true);
      const api = payload;
      axios.get(api).then(function(response) {
        commit("PRODUCTS", response.data);
        commit("LOADING", false);
      });
    },
    getOrders({ commit }, payload) {
      commit("LOADING", true);
      const api = payload;
      axios.get(api).then(function(response) {
        commit("ORDERS", response.data);
        commit("LOADING", false);
      });
    },
    getCoupons({ commit }, payload) {
      commit("LOADING", true);
      const api = payload;
      axios.get(api).then(function(response) {
        commit("COUPONS", response.data);
        commit("LOADING", false);
      });
    },
  },
  getters: {},
  modules: {},
});
