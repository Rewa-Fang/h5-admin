# h5-examples

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


### vue使用axios发送post请求,php的$_POST接收不到值

PHP端的跨域： 
添加header:  

    header('Access-Control-Allow-Origin: *');


php的$_GET拿到值了，但是$_POST不行  

    axios.post(URL.addH5,this.h5Form)
    .then(response=>{
      console.log(response);
    })
    .catch(error=>{
      console.log(error);
    })  

php服务端post获取不到；

解决方法是

    import qs from 'qs';

  安装axios就自带;如果没有的话就npm install安装  

    let postData = qs.stringify(this.h5Form);
    axios.post(URL.addH5,this.h5Form)
    .then(response=>{
      console.log(response);
    })
    .catch(error=>{
      console.log(error);
    })

$_POST就可以拿到值了"# h5-admin" 
# h5-admin


### 修改本地支行IP地址  

config/index.js

    // Various Dev Server settings

    host: '192.168.0.7', // can be overwritten by process.env.HOST
    
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-