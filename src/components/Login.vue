<template>
  <div class="login-page">
      <div class="login">
        <div class="login-title">A2design H5管理系统</div>
        <div class="login-form">
          <el-form :model="userInfo" ref="userInfo" :rules="rules">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="userInfo.userName" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passWord">
              <el-input type="password" v-model="userInfo.passWord" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item >
              <el-button type="primary" @click="submitForm('userInfo')">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
  </div>
</template>

<script>
  import axios from "axios";
  import REQUESTURL from "@/ServiceAPI.config.js";
  import qs from "qs";
  export default {
    data() {
      return {
        userInfo:{
          userName: '',
          passWord:''
        },
        rules: {
          userName:[{required:true,message:'请输入用户名',trigger:'blur'}],
          passWord:[{required:true,message:'请输入用密码',trigger:'blur'}]
        },
      }
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.postLogin();
          } else {
            // console.log("error submit!!");
            return false;
          }
        });
      },
      postLogin(){
        // console.log('login');
        let postData = qs.stringify(this.userInfo);
        axios.post(REQUESTURL.login, postData)
        .then(response => {
          if (response.data.status == 100) {
            this.$message({
              message: "登录成功！",
              type: "success"
            });
            localStorage.userInfo = this.userInfo;
            this.$router.push('/admin')
          } else {
            this.$message.error("用户名或密码错误！");
          }
        })
        .catch(error => {
          // console.log(error);
          this.$message.error("网络异常，添加失败！");
        });
      }
    }
  }
</script>

<style scoped>
  .login-page{
    height:100%;
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login{
    width: 400px;
    height: 600px;
    margin: auto;
  }
  .login-form{
    width: 400px;
    height: 300px;
    border: 1px solid #dddddd;
    border-radius: 10px;
    box-shadow: 2px 4px 5px #ccc;
    text-align: center;
    padding: 40px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .login-title{
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    color: #666;
    margin-bottom: 20px;
  }
</style>