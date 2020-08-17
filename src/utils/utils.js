/**
 *
 *
 * @export
 * @param {*} title 多语言调用key
 * @returns
 */
export function getLang(title) {
    const hasKey = this.$te(title)
    if (hasKey) {
        const text =  this.$t(title)
        return text
    }
    return title
}

/**
 *合并object对象，新增相同key值报错
 *
 * @export
 * @returns
 */
export function mergeObject() {
    const data = Array.prototype.splice.call(arguments, 0)
    return merges(data)
}

function merges(data) {
    let isAlert = false;
    for (let i = 1; i < data.length; i++) {
        for (const j in data[i]) {
            if (Object.prototype.hasOwnProperty.call(data[0],j) && data[0][j].url != data[i][j].url) {
                isAlert = true;
                console.error('接口重名：' + j,'&&&&','涉及接口：==>' + data[i][j].url,data[0][j].url)
            } else {
                data[0][j] = data[i][j]
            }
        }
    }
    if (isAlert) {
        alert('接口重名，具体见conso日志')
    }
    return data[0];
}

/**
 * 
 * @param {*} key url 接口
 * @param {*} data 传输的数据
 */
export const getApi = function(key,data = {}) {
    return import('@/http/api').then((res) => {
        return res.default[key](data);
    })
}

