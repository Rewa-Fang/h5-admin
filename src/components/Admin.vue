<template>
  <div class="admin">
    <header class="header">
    爱图H5案例后台管理
    </header>
    <left-aside></left-aside>
    <right-main class="main"></right-main>
  </div>
</template>

<script>
  import LeftAside from '@/components/LeftAside';
  import RightMain from '@/components/Main';
  export default {
    data() {
      return {
      }
    },
    components:{LeftAside,RightMain}
  }
</script>

<style scoped>
.admin{
  font-size: 18px;
  height: 100%;
}
.header{
  width: 100%;
  background-color: #00a65a;
  color: #ffffff;
  font-weight: 600;
  height: 50px;
  line-height: 50px;
  padding-left:20px; 
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
}

</style>