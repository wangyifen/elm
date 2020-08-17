import { changesign } from './sign'
import axios from 'axios'
let host = JSON.parse(process.env.VUE_APP_BASEURL).BASE_URL
if (location.host.indexOf('gray') != -1 && process.env.VUE_APP_GRAY_BASEURL) {
    host = JSON.parse(process.env.VUE_APP_GRAY_BASEURL).BASE_URL
}

export const $post = (url, data,header = {}) => {
    const Store = Vue.prototype.$Store
    var postda = {
        ...data
    };
    postda = changesign(postda)
    let Platform = '';
    if (Store && Store.state.common) {
        Platform = Store.state.common.userdata.Platform
    }
    return axios.post(`${host}${url}`,
        JSON.stringify(postda), {
            headers: {
                'Content-Type': 'application/json',
                Platform: Platform,
                ...header
            }
        }
    )
}

export const $get = (url, params = {}) => {
    return axios.get(`${host}${url}`,
        {
            params: params,
            headers: {
                'Content-Type': 'application/json',
                ...header
            }
        }
    )
}
