import axios from 'axios'
import QS from 'qs';
import { Loading, Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

axios.defaults.withCredentials = true;

// 接口默认请求地址 （在dev.env.js里面配置）
axios.defaults.baseURL = process.env.BASE_URL

// 解决axios发post请求
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  console.log(config,'config')
  // 在发送请求之前做些什么
  let token = window.sessionStorage.getItem("token")
  if (token) {
      //将token放到请求头发送给服务器,将tokenId放在请求头中
      let tokenId = JSON.parse(window.sessionStorage.getItem("token")).tokenId
      config.headers.token = tokenId;     
      //也可以这种写法
      // config.headers['accessToken'] = Token;
       return config;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  console.log(response.data,88888)
  // 对响应数据做点什么
  if (response.data.resultCode == 401 || response.data.resultCode == 500) {
    Message(
      {
        message: response.data.message,
        type: 'warning'
      }
    )
     
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  Message(
    {
      message: error,
      type: 'warning'
    }
  )
  return Promise.reject(error); 
});

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
      axios.get(url, {
          params: params
      }).then(res => {
          resolve(res.data);
      }).catch(err => {
          reject(err.data)
      })
  });
}

/** 
* post方法，对应post请求 
* @param {String} url [请求的url地址] 
* @param {Object} params [请求时携带的参数] 
*/
export function post(url, params) {
  return new Promise((resolve, reject) => {
      axios.post(url, QS.stringify(params))
          .then(res => {
              resolve(res.data);
          })
          .catch(err => {
              reject(err.data)
          })
  });
}

/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url,params) {
  return new Promise((resolve, reject) => {
      axios.put(url,QS.stringify(params)).then(res => {
          resolve(res.data);
      }).catch(err => {
          reject(err.data)
      })
  });
}

/**
 * delete方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
// export function Delete(url) {
//   return new Promise((resolve, reject) => {
//       axios.delete(url).then(res => {
//           resolve(res.data);
//       }).catch(err => {
//           reject(err.data)
//       })
//   });
// }
export default axios