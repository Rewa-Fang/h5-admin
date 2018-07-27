<template>
    <aside class="aside">
      <ul>
        <li v-for='(item,index) in items' :key="index" :class='item.color? "li-active" : "" ' @click='toggle(index)'>
          {{ item.name }}
        </li>
      </ul>
    </aside>
</template>

<script>
  export default {
    data() {
      return {
        items : [
          {name:'H5案例',color:false,toPage:'/admin/'},
          {name:'客户维护',color:false,toPage:'/admin/customer'},
          {name:'分类标签',color:false,toPage:'/admin/type'},
          {name:'客服管理',color:false,toPage:'/admin/service'},
          {name:'开发人员',color:false,toPage:'/admin/developer'}
          ],
      }
    },
    methods:{
        toggle(index){
            this.items.forEach((item,i) => {
                if(i!=index){
                    this.items[i].color = false;
                }else{
                    this.items[i].color = true;
                }
            });
            this.$router.push(this.items[index].toPage);
        },
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
    }
  }
</script>

<style scoped>
.aside{
  padding-top: 70px;
  width: 240px;
  height: 100%;
  background-color: #eee;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  color: #666;
}
li{
  list-style: none;
  width: 100%;
  padding-left:50px; 
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
li:hover{
  background-color: #ccc;
}
.li-active{
  color: #00a65a;
  border-right: 4px solid #00a65a;
  background-color: #ccc;
}
</style>