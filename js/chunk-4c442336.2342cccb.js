(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4c442336"],{"022f":function(t,r,a){"use strict";var s=function(){var t=this,r=t.$createElement,a=t._self._c||r;return a("div",[t._m(0),t._l(t.cart,(function(r){return a("div",{key:r.id,staticClass:"cart-item"},[a("div",{staticClass:"cart-item__name"},[a("img",{attrs:{src:r.src,alt:r.name}}),a("div",[t._v(t._s(r.name))])]),a("div",{staticClass:"cart-item__quantity"},[t._v(t._s(r.quantity))]),a("div",{staticClass:"cart-item__price"},[t._v("$"+t._s(r.price))]),a("div",{staticClass:"cart-item__total"},[t._v(" $"+t._s(r.quantity*r.price)+" ")])])})),a("div",{staticClass:"cart-item total-price"},[t._v("總計金額 $"+t._s(t.totalPrice))]),t.discountPrice!==t.totalPrice?a("div",{staticClass:"cart-item total-price discount"},[t._v(" 折扣後金額 $"+t._s(t.discountPrice)+" ")]):t._e()],2)},e=[function(){var t=this,r=t.$createElement,a=t._self._c||r;return a("div",{staticClass:"cart-item"},[a("div",{staticClass:"cart-item__name"},[t._v("商品")]),a("div",{staticClass:"cart-item__quantity"},[t._v("數量")]),a("div",{staticClass:"cart-item__price"},[t._v("單價")]),a("div",{staticClass:"cart-item__total"},[t._v("小計")])])}],i=(a("a9e3"),{name:"Cart",props:{cart:Array,totalPrice:Number,discountPrice:Number}}),n=i,c=a("2877"),o=Object(c["a"])(n,s,e,!1,null,null,null);r["a"]=o.exports},"075c":function(t,r,a){"use strict";var s=function(){var t=this,r=t.$createElement,a=t._self._c||r;return a("div",{staticClass:"form-information"},[a("div",[a("span",[t._v("Email")]),a("span",[t._v(t._s(t.form.email))])]),a("div",[a("span",[t._v("收件人姓名")]),a("span",[t._v(t._s(t.form.username))])]),a("div",[a("span",[t._v("收件人電話")]),a("span",[t._v(t._s(t.form.usertel))])]),a("div",[a("span",[t._v("收件人地址")]),a("span",[t._v(t._s(t.form.useraddress))])]),a("div",[a("span",[t._v("留言")]),a("span",[t._v(t._s(t.form.message))])]),a("div",[a("span",[t._v("付款狀態")]),t.paymentStatus?a("b",{staticClass:"text-success"},[t._v("成功付款")]):a("b",{staticClass:"text-failure"},[t._v("尚未付款")])])])},e=[],i={name:"OrderForm",props:{form:Object,paymentStatus:Boolean}},n=i,c=a("2877"),o=Object(c["a"])(n,s,e,!1,null,null,null);r["a"]=o.exports},"7cb4":function(t,r,a){"use strict";a.r(r);var s=function(){var t=this,r=t.$createElement,a=t._self._c||r;return t.order?a("div",{staticClass:"cart"},[t._m(0),a("h1",[t._v("訂單資訊")]),a("div",{staticClass:"cart-information"},[a("CartItem",{attrs:{cart:t.cart,totalPrice:t.totalPrice,discountPrice:t.discountPrice}})],1),t.order.paymentStatus?a("div",[a("OrderForm",{attrs:{form:t.form,paymentStatus:t.order.paymentStatus}}),a("router-link",{attrs:{to:"/"}},[a("button",{staticClass:"step__shopping"},[t._v("<< 繼續購物")])])],1):a("div",[a("OrderForm",{attrs:{form:t.form,paymentStatus:t.status}}),a("router-link",{attrs:{to:"/"}},[a("button",{staticClass:"step__shopping"},[t._v("<< 繼續購物")])]),t.status?t._e():a("button",{on:{click:t.handlePayment}},[t._v("立即付款")])],1)]):t._e()},e=[function(){var t=this,r=t.$createElement,a=t._self._c||r;return a("div",{staticClass:"cart-header"},[a("div",[t._v("1.確認購買清單")]),a("div",[t._v("2.填寫收件資訊")]),a("div",{staticClass:"active"},[t._v("3.完成訂單!")])])}],i=(a("7db0"),a("022f")),n=a("075c"),c=a("bc3a"),o=a.n(c),u={components:{CartItem:i["a"],OrderForm:n["a"]},data:function(){return{status:!1}},computed:{order:function(){var t=this;return this.$store.state.orders.find((function(r){return r.id===t.$route.params.id}))},cart:function(){return this.order.cart},form:function(){return this.order.form},paymentStatus:function(){return this.order.paymentStatus},totalPrice:function(){return this.order.totalPrice},discountPrice:function(){return this.order.discountPrice}},methods:{handlePayment:function(){var t=this;setTimeout((function(){t.status=!0,o.a.patch("https://guarded-garden-48374.herokuapp.com/orders/"+t.order._id,{paymentStatus:!0})}),500)}},created:function(){this.$store.dispatch("getOrders","https://guarded-garden-48374.herokuapp.com/orders/")}},d=u,_=a("2877"),l=Object(_["a"])(d,s,e,!1,null,null,null);r["default"]=l.exports},"7db0":function(t,r,a){"use strict";var s=a("23e7"),e=a("b727").find,i=a("44d2"),n="find",c=!0;n in[]&&Array(1)[n]((function(){c=!1})),s({target:"Array",proto:!0,forced:c},{find:function(t){return e(this,t,arguments.length>1?arguments[1]:void 0)}}),i(n)}}]);
//# sourceMappingURL=chunk-4c442336.2342cccb.js.map