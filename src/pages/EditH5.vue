<template>
  <div>
    <el-row>
      <el-col :span="12"><label class="title">新增案例</label></el-col>
      <el-col :span="12"><el-button icon="el-icon-back" @click="goBackList">返回列表</el-button></el-col>
    </el-row>
    <el-form :model="h5Form" :rules="rules" ref="h5Form" label-width="100px" class="h5-from">
      <el-form-item label="名称" prop="title">
        <el-input v-model="h5Form.title" ></el-input>
      </el-form-item>

      <el-form-item label="链接" prop="link">
        <el-input v-model="h5Form.link" ></el-input>
      </el-form-item>

      <el-form-item label="封面图" prop="imgsrc">
        <span style="color:#606266">上传一张正方形的H5主封面图片</span>
        <el-upload
          class="avatar-uploader"
          action="http://a2designing.cn/A2/h5-examples/php/uploadImg.php"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="uploadImg.imageUrl" :src="uploadImg.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-alert v-if="uploadImg.display" :title="uploadImg.title" :type="uploadImg.iconType" show-icon>
        </el-alert>
      </el-form-item>

      <el-form-item label="类型" prop="labels">
        <el-checkbox-group v-model="h5Form.labels">
          <el-checkbox name="h5Type"
          v-for="item in allSelectData.types"
            :key="item.id"
            :label="item.name"
            :value="item.name"
            ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="所属客户" prop="customer">
        <el-select v-model="h5Form.customer" placeholder="请选择客户">
          <el-option
            v-for="item in allSelectData.customers"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="对接客服" prop="service">
        <el-select v-model="h5Form.service" placeholder="请选择客服">
          <el-option
            v-for="item in allSelectData.servicers"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="开发人员" prop="developer">
        <el-select v-model="h5Form.developer" placeholder="请选择开发者">
          <el-option
            v-for="item in allSelectData.developers"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="上线时间" prop="uptime">
        <el-date-picker type="date" placeholder="选择日期" v-model="h5Form.uptime" style="width: 100%;"
        value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="是否显示" prop="isShow">
        <el-switch v-model="h5Form.isShow"></el-switch>
        <span style="color:#606266">是否显示在H5案例集合列表中</span>
      </el-form-item>

      <el-form-item label="描述" prop="desc">
        <el-input type="textarea" v-model="h5Form.desc"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('h5Form')" :disabled="updateBtn">提交修改</el-button>
        <el-button @click="resetForm('h5Form')">重置</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import REQUESTURL from "@/ServiceAPI.config.js";
import qs from "qs";
export default {
    props: ['h5Form'],
  data() {
    var checkTitle = (rule, value, callback) => {
      if (!value) {
        callback(new Error("标题不能为空"));
      }else if (value.length < 5) {
        callback(new Error("标题不能少于5个字"));
      }else{
        callback();
      }
    };
    var checkLink = (rule, value, callback) => {
      var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
      if (!value) {
        callback(new Error("链接不能为空"));
      }else if (!reg.test(value)) {
        callback(new Error("链接格式不正确"));
      }else{
        callback();
      }
    };
    return {
      // h5Form: {
      //   title: "",
      //   imgsrc: "",
      //   desc: "",
      //   labels: [],
      //   type: "",
      //   customer: "",
      //   uptime: "",
      //   link: "",
      //   service: "",
      //   developer: "",
      //   isShow: 1,
      //   isShowBoolean: true
      // },
      rules: {
        title: [{ validator: checkTitle, trigger: "blur" }],
        link: [{validator:checkLink,trigger:"blur"}],
        labels:[{required:true,message:'选择一种类型',trigger:'change'}],
        customer:[{required:true,message:'选择所属客户',trigger:'change'}],
        service:[{required:true,message:'选择对接客服',trigger:'change'}],
        developer:[{required:true,message:'选择开发人员',trigger:'change'}],
        uptime:[{required:true,message:'选择上线时间',trigger:'change'}],
        imgsrc:[{required:true,message:'必须上传图片',trigger:'blur'}],
        desc:[{required:true,message:'简单描述一下该H5',trigger:'blur'},
              {min:10,message:'不少于10个字的描述',trigger:'blur'}
        ],
      },
      uploadImg: {
        imageUrl: "",
        display: false,
        title: "",
        iconType: ""
      },
      allSelectData: {},
      updateBtn:true,
    };
  },
  created() {
    if(!this.h5Form.title){
      this.$router.go(-1);
      return;
    }
    this.initSelects();
    // console.log('create:::'+this.h5FormOld.isShow);
    // this.h5Form = this.h5FormOld;
    this.uploadImg.imageUrl = this.h5Form.imgsrc;
    this.h5Form.labels = [];
    // console.log('create:::'+this.h5Form.isShow);
  },
  watch:{
    h5Form:{
      handler(val,oldVal){
        this.updateBtn = false;
      },
      deep:true
    }
  },
  methods: {
    initSelects() {
      axios
        .get(REQUESTURL.getTableAll)
        .then(response => {
          if (response.status == 200) {
            this.allSelectData = response.data.data;
          }
        })
        .catch(error => {
          // console.log(error);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveData();
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    saveData() {
      this.h5Form.type = this.h5Form.labels.join(); // 分类标签转成字符串 便于存储
      // this.h5Form.type = this.h5Form.type + "," + this.h5Form.customer; // 标签再加上客户名称 
      this.h5Form.isShow = this.h5Form.isShow ? 1 : 0; // 是否显示在列表 1显示 0不显示
      let postData = qs.stringify(this.h5Form);
      // console.log(postData);
      
      axios.post(REQUESTURL.updateH5, postData)
      .then(response => {
        // console.log(response);
        if (response.data.status == 100) {
          this.$message({
            message: "修改成功！",
            type: "success"
          });
          this.$router.push('/admin')
        } else {
          this.$message.error("网络异常，添加失败！");
        }
      })
      .catch(error => {
        // console.log(error);
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      this.uploadImg.imageUrl = URL.createObjectURL(file.raw);
      this.uploadImg.title = res.msg;
      this.uploadImg.display = true;
      if (res.code == 200) {
        this.h5Form.imgsrc = `http://a2designing.cn/A2/h5-examples/php/${
          res.fileName
        }`;
        this.uploadImg.iconType = "success";
      } else {
        this.uploadImg.iconType = "error";
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    goBackList(){
      this.$router.push('/admin');
    }
  }
};
</script>

<style>
.title {
  color: #666;
  margin-right: 10px;
  font-weight: 600;
}
.h5-from {
  width: 40%;
  margin-top: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>