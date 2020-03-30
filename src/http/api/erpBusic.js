
import { $post } from '@/http/http.js'
/**
 *
 * @param {*} data为非公共参数
 *
 * 以ModifyCellStatus为例，调用如下
 * this.$api.ModifyCellStatus({data:1}).then(res=>{})  调用
 */
const ModifyCellStatus = (data) => { //微信柜设为故障、解除故障
    const url = '/Device/Smartbox/ModifyCellStatus';
    return $post(url,data)
}
const QueryAccountListData  = (data) => { //微信柜设为故障、解除故障
    const url = '/Device/Smartbox/QueryAccountListData';
    return $post(url,data)
}

export default {
    ModifyCellStatus,
    QueryAccountListData
}
