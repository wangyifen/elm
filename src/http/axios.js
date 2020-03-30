// import { Message } from 'element-ui';
import { Message } from 'element-ui';
/**
 * 请求拦截操作
 */
let num = 0;
axios.interceptors.request.use(config => {
    if (num == 0) {
        // bus.state.issearch = true;
    }
    num++;
    return config
},error => {
    return Promise.reject(error)
})
/**
 * 响应拦截操作
 */
axios.interceptors.response.use(response => {
    num--;
    if (num == 0) {
        // bus.state.issearch = false;
    }
    switch (response.data.Code) {
    case 200:
        return response
    case 0:
        Message.warning(response.data.Message);
        break
    case 403:
        Message.warning(response.data.Message);
        console.log('exit')
        break
    case 406:
        Message.warning(response.data.Message);
        console.log('exit')
        break
    case undefined:
        return response
    default:
        Message.warning(response.data.Message);
        break;
    }
},error => {
    num--;
    Message.warning('系统繁忙，请稍后再试');
    if (num == 0) {
        // this.$store.bus.state.issearch = false;
    }
    return Promise.reject(error)
})
