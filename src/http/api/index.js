// 导入所有接口
import apiList from './apiList'
if (!window.$api) {
    window.$api = apiList;
} else {
    window.$api = { ...window.$api,...apiList }
}
