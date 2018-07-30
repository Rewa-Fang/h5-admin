<template>
  <div>
    <el-row>
      <label class="title">开发者列表</label>
      <el-button type="primary" class="btn" icon="el-icon-plus" circle @click="dialogFormVisible = true"></el-button>
      <!-- <el-button type="primary" class="btn" icon="el-icon-edit" circle></el-button> -->
    </el-row>
    
    <el-table
      height="600"
      :border="tableBorder"
      :data="developers"
      style="width: 301px;margin-top:10px;">
      <el-table-column
        prop="id"
        label="开发者ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="开发者名称"
        width="200">
      </el-table-column>
    </el-table>
    
    <el-dialog title="添加开发者" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="developerForm" ref="developerForm">
        <el-form-item label="开发者名称" prop="name" :label-width="formLabelWidth"
        :rules="[{ required: true, message: '请输入开发者名称'}]"
        >
          <el-input v-model="developerForm.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCustomer('developerForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios';
  import URL from '@/ServiceAPI.config.js'
  export default {
    data() {
      return {
        type:'developer',
        developers:[],
        value:'',
        tableBorder:true,
        dialogFormVisible:false,
        formLabelWidth:'110px',
        developerForm: {
          name: ''
        },
      }
    },
    created(){
      axios.get(URL.getTable + this.type)
      .then(response=>{
        if(response.status == 200){
          this.developers = response.data.data;
        }
      })
      .catch(error=>{
        // console.log(error);
      })
    },
    methods:{
      addCustomer(fromName){
        this.$refs[fromName].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false;
            axios.get(URL.addTable+'name=' + this.developerForm.name + '&type=' + this.type)
            .then(response=>{
              if(response.status == 200){
                let addId = Math.floor(this.developers[this.developers.length-1].id) + 1;
                this.developers.push({id:addId,name:this.developerForm.name});
              }
            })
            .catch(error=>{
              // console.log(error);
            })
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .title{
    color:#666;
    margin-right: 10px;
    font-weight: 600;
  }
  .btn{
    padding: 6px;
  }
</style>