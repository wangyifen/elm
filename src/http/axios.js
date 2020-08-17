import { Message } from 'element-ui';
import store from '@/store'
import Axios from 'axios'
var instance = new Axios.Create();
/**
 * 请求拦截操作
 */
let num = 0;
instance.interceptors.request.use(config => {
    if (!config.headers.isIgnore) {
        if (num == 0) {
            store.state.common.isSearch = true
        }
        num++;
    }
    return config
},error => {
    return Promise.reject(error)
})
/**
 * 响应拦截操作
 */
instance.interceptors.response.use(response => {
    console.log(response)
    if (!response.config.headers.isIgnore) {
        num--;
        if (num == 0) {
            store.state.common.isSearch = false;
        }
        if (response.data.Code) {
            switch (response.data.Code) {
            case 200:
                return response
            case 403:
                Message.warning(response.data.Message);
                store.commit('loginOut')
                return Promise.reject(response);
            case 406:
                Message.warning(response.data.Message);
                store.commit('loginOut')
                return Promise.reject(response);
            default:
                Message.warning(response.data.Message);
                return Promise.reject(response);
            }
        } else {
            return Promise.resolve(response);
        }
    } else {
        return Promise.resolve(response);
    }
},error => {
    if (num > 0) {
        num--;
    }
    // Message.warning('系统繁忙，请稍后再试,错误码：' + error.response.data.status);
    if (num == 0) {
        store.state.common.isSearch = false
    }
    return Promise.reject(error)
})
