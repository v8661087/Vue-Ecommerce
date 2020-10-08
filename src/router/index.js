import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/game",
    name: "game",
    component: () => import("../views/Game.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/CartPage.vue"),
  },
  {
    path: "/createorder",
    name: "createorder",
    component: () => import("../views/CreateOrder.vue"),
  },
  {
    path: "/checkout/:id",
    name: "checkout",
    component: () => import("../views/Checkout.vue"),
  },
  {
    path: "/product-detail/:id",
    name: "prduct-detail",
    component: () => import("../views/ProductDetail.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/dashboard",
    component: () => import("../views/Dashboard.vue"),
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("../views/Dashboard/Index.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "products",
        name: "products",
        component: () => import("../views/Dashboard/Products.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "new",
        name: "new",
        component: () => import("../views/Dashboard/New.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "edit/:id",
        name: "edit",
        component: () => import("../views/Dashboard/EditProduct.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "orders",
        name: "orders",
        component: () => import("../views/Dashboard/Orders.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "order/:_id",
        name: "order",
        component: () => import("../views/Dashboard/EditOrder.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "coupons",
        name: "coupons",
        component: () => import("../views/Dashboard/Coupons.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.state.logining) {
      next();
    } else {
      next({ path: "/login" });
    }
  } else {
    next();
  }
});
export default router;
