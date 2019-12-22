import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    accounts:[{
      email:"test@test.com",
      password:"test",
    }],
    logining:false,
    form: {
      email: "123@test.com",
      username: "123",
      usertel: "123",
      useraddress: "123",
      message:"留言測試",
    },
    orders:  [] ,
    lists: ["全部", "火", "水", "草", "電","冰","龍"],
    cart: [],
    products: []
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
      localStorage.setItem("cart",JSON.stringify(cart))
    },
    deleteProduct(state, product) {
      const cart = state.cart;
      cart.splice(cart.indexOf(product), 1);
      localStorage.setItem("cart",JSON.stringify(cart))
    }
  },
  actions: {
    addToCartAction(context, payload) {
      context.commit("addToCart", payload);
    },
    deleteProductAction(context, payload) {
      context.commit("deleteProduct", payload);
    }
  },
  getters: {
  },
  modules: {}
});
