<template>
  <div>
    <el-button type="success" icon="el-icon-plus" @click="addExamples">添加案例</el-button>
    <el-table :data="examples" stripe style="width: 100%" height="600">
      <el-table-column type="index">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="250">
      </el-table-column>
      <el-table-column prop="customer" label="客户" width="80">
      </el-table-column>
      <el-table-column prop="service" label="客服" width="80">
      </el-table-column>
      <el-table-column prop="developer" label="开发者" width="80">
      </el-table-column>
      <el-table-column prop="labels" label="标签" width="200">
          <template slot-scope="scope">
            <el-tag v-for="(typeTag,index) in scope.row.labels" :key="index" :type="index % 2 === 0 ? 'primary' : 'success'" disable-transitions>
              {{typeTag}}
            </el-tag>
          </template>
      </el-table-column>
      <el-table-column prop="uptime" label="上线时间" width="100">
      </el-table-column>
      <el-table-column prop="link" label="链接">
      </el-table-column>
      <el-table-column prop="desc" label="描述">
      </el-table-column>
      <el-table-column label="是否显示">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isShow" @change="changeShow(scope.$index, scope.row)" active-color="#13ce66">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import axios from 'axios';
  import REQUESTURL from '@/ServiceAPI.config.js';
  export default {
    data() {
      return {
        examples:[]
      }
    },
    created(){
      this.initExamData();
    },
    methods:{
      initExamData(){
        axios.get(REQUESTURL.getExamples)
        .then(response=>{
          console.log(response);
          if(response.status == 200){
            if(response.data.code == 200){
              this.examples = response.data.data;
              this.examples.forEach(item=>{
                item.labels = item.type.split(',');
                item.uptime = item.uptime.substring(0,10);
                item.isShow = item.isShow == 1?true:false;
              })
            }
          }
        })
        .catch(error=>{
          this.$message.error('网络异常，请刷新重试！')
        })
      },
      handleEdit(index,row){ 
      },
      changeShow(index,row){
        console.log(index,row);
        axios.get(REQUESTURL.updateIsShow,{
          params:{
            exampId : row.exampId,
            isShow : row.isShow?1:0
          }
        })
        .then(response=>{
          // if(response.data.code == 100){}
          console.log(response.data.msg);
          
        })
        .catch(error=>{
          console.log(error);
        })
      },
      addExamples(){
        this.$router.push('./addH5');
      }
    }

  }
</script>

<style scoped>
  .el-tag{
    padding: 0 6px;
    margin-right: 4px;
    height: 24px;
    line-height: 24px;
  }
</style>