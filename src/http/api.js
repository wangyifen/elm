
import { Message } from 'element-ui';
import { changesign } from './sign'
const getApi = {};
let errNumber = 0; let httploading = 0;//定义错误请求返回个数,定义总请求个数
const getApis = (name) => {
    for (const api in name) {
        for (const apiItem in name[api]) {
            getApi[apiItem] = function(data) {
                return new Promise(function (resolve, reject) {
                    httploading++;
                    name[api][apiItem](changesign(data)).then(response => {
                        httploading--;
                        switch (response.data.Code) {
                        case 200:
                            resolve(response.data.Data)
                            break;
                        case 0:
                            Message.warning(response.data.Message);
                            resolve(response.data.Data)
                            break
                        case 403:
                            errNumber++;
                            if (errNumber == 1) {
                                Message.warning(response.data.Message);
                                if (httploading == 0) {
                                    errNumber = 0;
                                }
                            }
                            break
                        case 406:
                            errNumber++;
                            if (errNumber == 1) {
                                Message.warning(response.data.Message);
                                if (httploading == 0) {
                                    errNumber = 0;
                                }
                            }
                            break;
                        default:
                            Message.warning(response.data.Message);
                            break;
                        }
                    }).catch(err => {
                        httploading--;
                        Message.warning('系统繁忙，请稍后再试')
                        reject(err)
                    })
                })
            }
        }
    }
    window.$api = getApi
}

export {
    getApis
}
