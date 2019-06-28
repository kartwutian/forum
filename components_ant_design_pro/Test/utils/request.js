import {Toast} from 'antd-mobile';
import axios from 'axios';

// Make a request for a user with a given ID

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// axios.defaults.timeout = 30000;


/**
 *无约定的ajax封装
 * @param url
 * @param options
 * @returns {Promise<AxiosResponse<any>>}
 *
 */
export function requestBase(url, options) {
  return axios(url, {
    ...options,
    headers: options
      ? {
          'x-requested-with': 'XMLHttpRequest',
          ...options.headers,
        }
      : {
          'x-requested-with': 'XMLHttpRequest',
        },
    data: options && options.body,
  })
    .then((res)=>{
      if(res.data) return res.data;
    })
    .catch(e => {
      console.dir(e);
    });
}


/**
 * 和后台约定状态码后的ajax封装
 * 切换到axios来执行ajax
 *  'x-requested-with': 'XMLHttpRequest',参数用来传递的后端判断是否是ajax请求，是的话session过期请求头返回
 *  sessionstatus:timeout,前端统一判断处理
 * @param url
 * @param options
 * @returns {Promise<AxiosResponse<any>>}
 *
 */
export default function request(url, options) {
  return axios(url, {
    ...options,
    headers: options
      ? {
          'x-requested-with': 'XMLHttpRequest',
          ...options.headers,
        }
      : {
          'x-requested-with': 'XMLHttpRequest',
        },
    data: options && options.body,
  })
    .then((res)=>{
      // 约定正常状态 返回 code 0
      if(res.data.code !== 0){
        const error = new Error(res.msg || '请求出错啦');
        error.response = res;
        error.type = 'custom'; // 标记自定义错误
        throw error;
      }else{
        return res.data;
      }
    })
    .catch(e => {
      console.dir(e);
      const { response } = e;
      if(e.type === 'custom'){
        Toast.fail(e.message, 2);
        throw (e)
      }else{
        Toast.fail(codeMessage[response.status] || response.statusText, 2)
      }
    });
}
