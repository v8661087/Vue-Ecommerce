<template>
  <div>

<h1>Products</h1>
    <table>
        <thead>
            <th>#</th>
            <th>name</th>
            <th>price</th>
            <th>remaining</th>
            <th>type</th>
        </thead>
        <tbody>
            <tr v-for="product in products" :key="product.id">
                <td><img width="30px" :src="product.src" alt=""></td>
                <td>{{product.name}}</td>
                <td>${{product.price}}</td>
                <td>{{product.remaining}}</td>
                <td>{{product.type}}</td>
                <td>
                    <router-link :to="{path:'/dashboard/edit/'+ product._id}">edit</router-link>
                    </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {
    name:"products",
    computed:{
        products(){
            return this.$store.state.products
        }
    }
}
</script>

<style>

</style>