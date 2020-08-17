// 导入所有接口
import { $post,$get } from '@/http/http'
import { mergeObject } from '@/utils/utils'
import ErpBasicApi from '@/http/api/ErpBasicApi'
import commonApi from '@/http/api/commonApi'
import oplatform from '@/http/api/oplatform'
const apiList = mergeObject(ErpBasicApi,commonApi,oplatform)

const api = {};
for (const i in apiList) {
    api[i] = (data) => {
        const url = apiList[i].url;
        let type = 'post'; let header = {};
        if (apiList[i].type) {
            type = apiList[i].type
        }
        if (apiList[i].header) {
            header = apiList[i].header
        }
        if (type === 'get') {
            return $get(url,data,header)
        } else {
            return $post(url,data,header)
        }
    }
}

export default api;

