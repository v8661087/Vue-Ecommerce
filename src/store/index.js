import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accounts:[{
      email:"test@test.com",
      password:"test",
    }],
    logining:true,
    form: {
      email: "123@test.com",
      username: "123",
      usertel: "123",
      useraddress: "123",
      message:"留言測試",
    },
    orders:  [
      {
        "id": "3tzsbyr48ojywqzadw2ho",
        "date": "2019/12/11 下午7:13:08",
        "cart": [
          {
            "id": 1,
            "name": "皮卡丘",
            "price": 100,
            "quantity": 1,
            "remaining":"93",
            "type": "電",
            "src": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/2b3f6ff00db7a1efae21d85cfb8995eaff2da8d8.png"
          }
        ],
        "form": {
          "email": "123@test.com",
          "username": "123",
          "usertel": "123",
          "useraddress": "123"
        },
        "paymentStatus": true
      },
      {
        "id": "3tzsbyr48ojywqzadw210",
        "date": "2019/12/11 下午7:13:51",
        "cart": [
          {
            "id": 1,
            "name": "皮卡丘",
            "price": 100,
            "quantity": 1,
            "remaining":"93",
            "type": "電",
            "src": "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/2b3f6ff00db7a1efae21d85cfb8995eaff2da8d8.png"
          }
        ],
        "form": {
          "email": "123@test.com",
          "username": "123",
          "usertel": "123",
          "useraddress": "123"
        },
        "paymentStatus": true
      }
    ] ,
    lists: ["全部", "火", "水", "草", "電","冰"],
    cart: [
      {
        id: 1,
        name: "皮卡丘",
        price: 100,
        quantity: 1,
        remaining:"93",
        type: "電",
        src:
          "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/2b3f6ff00db7a1efae21d85cfb8995eaff2da8d8.png"
      }
    ],
    products: [/*
      {
        id: 1,
        name: "皮卡丘",
        price: 100,
        quantity: 1,
        remaining:"93",
        type: "電",
        src:
          "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/2b3f6ff00db7a1efae21d85cfb8995eaff2da8d8.png"
      },
      {
        id: 2,
        name: "傑尼龜",
        price: 200,
        quantity: 1,
        remaining:"33",
        type: "水",
        src:
          "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/5794f0251b1180998d72d1f8568239620ff5279c.png"
      },
      {
        id: 3,
        name: "六尾",
        price: 300,
        quantity: 1,
        type: "火",
        remaining:"35",
        src:
          "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/f285c634efd141918f6ad066a6f59c20746d9050.png"
      },
      {
        id: 4,
        name: "妙蛙種子",
        price: 400,
        quantity: 1,
        remaining:"66",
        type: "草",
        src:
          "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/cf47f9fac4ed3037ff2a8ea83204e32aff8fb5f3.png"
      },
      {
        id: 5,
        name: "小火龍",
        price: 500,
        quantity: 1,
        type: "火",
        remaining:"60",
        src:
          "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/d0ee81f16175c97770192fb691fdda8da1f4f349.png"
      },
      {
        id: 6,
        name: "火狐狸",
        price: 600,
        quantity: 1,
        remaining:"77",
        type: "火",
        src:
          "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/466cc6aa93526c3b9038c11f1a0192e4eadc0761.png"
      },
      {
        id: 7,
        name: "卡蒂狗",
        price: 700,
        quantity: 1,
        remaining:"88",
        type: "火",
        src:
          "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/333e2aef290059dc46274b77ea4095094784316a.png"
      },
      {
        id: 8,
        name: "迷唇姐",
        price: 800,
        quantity: 1,
        remaining:"99",
        type: "冰",
        src:
          "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/8838c65ba52945317cda0d31f8de760860dd71ec.png"
      },
      {
        id: 9,
        name: "鯉魚王",
        price: 900,
        quantity: 1,
        remaining:"36",
        type: "水",
        src:
          "https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/3755f6d1176c7f8c64f663dae13ef9f1406d007a.png"
      }*/
    ]
  },
  mutations: {
    incrementCounter(state, payload) {
      state.count += payload;
    },
    addToCart(state, product) {
      const cart = state.cart;
      if (cart.some(item => item.id === product.id)) {
        const index = cart.findIndex(item => item.id === product.id);
        cart[index].quantity += product.quantity;
      } else {
        cart.push({ ...product });
      }
    },
    deleteProduct(state, product) {
      const cart = state.cart;
      cart.splice(cart.indexOf(product), 1);
    }
  },
  actions: {
    incrementAction(context, payload) {
      context.commit("incrementCounter", payload);
    },
    addToCartAction(context, payload) {
      context.commit("addToCart", payload);
    },
    deleteProductAction(context, payload) {
      context.commit("deleteProduct", payload);
    }
  },
  getters: {
    counter(state) {
      return state.count;
    },
    data(state) {
      return state;
    }
  },
  modules: {}
});
