<template>
<div class="create-product">
    <img class="create-product__image" :src="src" alt="">
    <form @submit.prevent="handleSubmit" action="" autocomplete="off">
        <div class="form-group">
            <label for="name">Name</label>
            <input
            type="text"
            id="name"
            name="name"
            required="true"
            v-model="name"
            />
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
            <input
            type="text"
            id="src"
            name="src"
            required="true"
            v-model="src"
            />
        </div>
        <div class="form-group">
            <label for="type">Type</label>
            <input
            type="text"
            id="type"
            name="type"
            required="true"
            v-model="type"
            />
        </div>
      <input type="submit" value="新增">
    </form>
    <div class="update" v-show="showAdd">新增成功</div>
</div>
</template>

<script>
export default {
    data(){
        return {
            name:"超級噴火龍Ｘ",
            price:"999",
            remaining:"93",
            src:"https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/ca3db4aad5c85a525d9be86852b26db1db7a22c0.png",
            type:"火",
            showAdd:false,
        }
    },
    computed:{
    },
    methods:{
        handleChange(e){
            if(e.target.name == "price"){
                this.price = this.price.replace(/^0|\D/g,"")
            }else{
                this.remaining = this.remaining.replace(/^0|\D/g,"")
            }
        },
        handleSubmit(){
          const products =  this.$store.state.products
          products.push({
            id:products.length+1,
            name:this.name,
            price:this.price,
            quantity:1,
            remaining:this.remaining,
            type:this.type,
            src:this.src,
            })
            this.showAdd = true
            setTimeout(()=>{
                this.showAdd = false
                this.$router.push("/dashboard/products")
            }
            ,1000)
            
        }
    }
}
</script>

<style lang="scss">
.create-product{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    &__image{
        width: 45vw;
        height: 45vw;
    }
}
.update{
    position: fixed;
    top:21%;
    left:50%;
    width: 300px;
    height: 210px;
    background: #17181c;
    border:1px solid gray;
    margin-left: -150px;
    display: flex;
    justify-content: center;
    align-items: center
}
</style>