<template>
  <div>
    <div class="nav">
      <div class="form-div">
        <input class="input-srea" type="text" name="sreach" placeholder="keywords" v-model="sreachKeywords">
        <button class="button-srea" name="sreach-btn" @click="sreach">search</button>
      </div>
      <ul>
        <li>
          <select class="select-ops" name="customers" id="cust-slt" v-model="custSeleced" @change="screen">
              <option  value="All">All</option>
              <option v-for="(cust,index) in allSelectData.customers" :key="index" :value="cust.name">{{cust.name}}</option>
          </select>
        </li>
        <li>
          <select class="select-ops" name="type" id="type-slt" v-model="typeSeleced" @change="screen">
            <option  value="All">All</option>
            <option v-for="(type,index) in allSelectData.types" :key="index" :value="type.name">{{type.name}}</option>
          </select>
        </li>
      </ul>
    </div>
    <div class="examples">
      <transition-group name="list" tag="p">
          <div class="exam-item" v-for="(eaxm,index) in showExamples" :key="index" @click="toLink(eaxm.link)" v-if="eaxm.isShow==1">
            <div class="exam-img">
              <img :src="eaxm.imgsrc" alt="">
            </div>
            <div class="exam-centent">
              <div class="exam-title">{{ eaxm.title }}</div>
              <div class="exam-desc">{{ eaxm.desc }}</div>
              <div class="exam-label">
                <span v-for="(label,index) in eaxm.labels" :key="index">{{label}}</span>
                <span>{{ eaxm.customer }}</span>
              </div>
            </div>
          </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import REQUESTURL from '@/ServiceAPI.config.js';
  export default {
    data(){
      return {
        examples:[],
        custSeleced:'All',
        typeSeleced:'All',
        showExamples:[],
        sreachKeywords:'',
        allSelectData:{},
      }
      
    },
    created() {
      this.initSelects();
      this.initExamData();
    },
    methods:{
      screen(){
        if(this.typeSeleced === 'All' && this.custSeleced === 'All'){
          this.showExamples = this.examples;
        }else{
          if(this.custSeleced === 'All'){
            this.showExamples = this.examples.filter(x=>{
              return x.type.indexOf(this.typeSeleced) > -1;
            })
          }else if(this.typeSeleced === 'All'){
            this.showExamples = this.examples.filter(x=>{
              return x.customer === this.custSeleced;
            })
          }else{
            this.showExamples = this.examples.filter(x=>{
              return x.customer === this.custSeleced && x.type.indexOf(this.typeSeleced) > -1 ;
            })
          }
        }
      },
      sreach(){
        // console.log(this.sreachKeywords);
        if(!this.sreachKeywords) return;
        this.showExamples = this.examples.filter(x=>{
          return x.title.toLocaleLowerCase().indexOf(this.sreachKeywords) > -1 || x.desc.toLocaleLowerCase().indexOf(this.sreachKeywords) > -1;
        })
      },
      toLink(link){
        if(link){
          window.location.href = link;
        }else{
          alert('网络异常，请刷新重新！')
        } 
      },
      initSelects(){
        axios.get(REQUESTURL.getTableAll)
        .then(response=>{
          if(response.status == 200){
            this.allSelectData = response.data.data;
          }
        })
        .catch(error=>{
          // console.log(error);
        })
      },
      initExamData(){
        axios.get(REQUESTURL.getExamples)
        .then(response=>{
          // console.log(response);
          if(response.status == 200){
            if(response.data.code == 200){
              this.examples = response.data.data;
              this.examples.forEach(item=>{
                item.labels = item.type.split(',');
              })
              this.showExamples = this.examples;
            }
          }
        })
        .catch(error=>{
          this.$message.error('网络异常，请刷新重试！')
        })
      }
    }
  }
</script>

<style scoped>
  .nav{
  width: 100%;
  max-width: 750px;
  height: 4.5rem;
  position:fixed;
  top: 0;
  left: 0;
}
.nav ul{
  height: 2.2rem;
  display: flex;
  border-bottom: 1px solid #ddd;
}
.nav li{
  flex: 1;
  height: 100%;
  list-style: none;
}

.select-ops{
  height: 100%;
  width: 100%;
  border: 0;
  color: #666;
}
.form-div{
  background: #fff;
  height: 2.2rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid #ddd;
}
.input-srea{
  flex: 3;
  height: 2rem;
  border: 0;
  padding-left: 1.5rem;
  background: url('../assets/sreach.png') no-repeat left .3rem;
  background-size: 1.5rem 1.5rem;
  font-size: 18px;
  color: #666;
}
.button-srea{
  flex: 1;
  background:none;
  width: 30%;
  height: 100%;
  border: 0;
  color: #ffffff;
  text-transform: uppercase;
  background-color: #44b549;
}

/* examples */
.examples{
  width: 100%;
  max-width: 750px;
  margin-top: 5rem;
}
.exam-item{
  width: 100%;
  height: 10rem;
  display: flex;
  box-shadow: 0 3px 3px rgb(253, 133, 133);
  margin-bottom: .7rem;
  background-color: #fff;
}
.exam-item div{
  background-color: #fff !important;
}
.exam-img{
  flex: 1;
  height: 90%;
  text-align: center;
  border-right: 2px solid #ddd;
}
.exam-img img{
  width: 90%;
}
.exam-centent{
  height: 9rem;
  color: #666;
  flex: 1;
  font-size: 14px;
  padding-left: .5rem;
  overflow: hidden;
}
.exam-title{
  height: 1.5rem;
  font-size: 16px;
  font-weight: 700;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.exam-desc{
  height: 5rem;
  line-height: 1rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
}
.exam-label{
  height: 2.5rem;
  overflow: hidden;
  display: flex;
  flex-flow: row wrap;
  line-height: 1rem;
}
.exam-label span{
  display: block;
  height: 1rem;
  line-height: 1rem;
  border-radius: .3rem;
  border: 1px solid #ccc;
  color: #44b549;
  padding: 0 .2rem;
  margin-right: .2rem; 
  margin-bottom: .2rem; 
  text-align: center;
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>