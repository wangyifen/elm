
import md5 from 'js-md5'
import { getCookie } from './postdata'
export const changesign = (data) => {
    getCookie();
    const postda = {
        ...getCookie(),
        ...data
    }
    let list = []
    for (const prop in postda) {
        if (typeof postda[prop] == 'number' && postda[prop] == 0) {
            list.push(prop)
        } else if (postda[prop]) {
            if (typeof postda[prop] == 'string' && prop.indexOf('Time') == -1 && prop != 'SearchData') {
                postda[prop] = postda[prop].replace(/\s*/g, '');
            }
            if (postda[prop]) {
                list.push(prop)
            }
        }
    }
    list = list.sort();
    let str = '';

    for (let i = 0; i < list.length; i++) {
        let aa

        if (typeof postda[list[i]] == 'object') {
            if (postda[list[i]].length) {
                for (let j = 0; j < postda[list[i]].length; j++) {
                    const bb = postda[list[i]][j];

                    for (const pop in bb) {
                        if (typeof bb[pop] == 'string' && !bb[pop]) {
                            delete bb[pop]
                        }
                    }
                }
                aa = JSON.stringify(postda[list[i]])
            } else {
                aa = postda[list[i]]
                for (const prop in aa) {
                    if (typeof aa[prop] == 'string' && !aa[prop]) {
                        delete aa[prop]
                    }
                }
                aa = JSON.stringify(aa)
            }
        } else {
            aa = postda[list[i]]
        }
        str = str + list[i] + '=' + aa + '&'
    }
    let SignToken = '';
    if (localStorage.getItem('t_')) {
        SignToken = localStorage.getItem('t_');
    }
    str = str + 'key=' + SignToken;
    postda.Signature = md5(stringToByteArray(str)).toUpperCase()
    return postda;
}

function stringToByteArray(str) {
    const bytes = [];
    const len = str.length; let c;
    for (let i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x010000 && c <= 0x10FFFF) {
            bytes.push(((c >> 18) & 0x07) | 0xF0);
            bytes.push(((c >> 12) & 0x3F) | 0x80);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if (c >= 0x000800 && c <= 0x00FFFF) {
            bytes.push(((c >> 12) & 0x0F) | 0xE0);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if (c >= 0x000080 && c <= 0x0007FF) {
            bytes.push(((c >> 6) & 0x1F) | 0xC0);
            bytes.push((c & 0x3F) | 0x80);
        } else {
            bytes.push(c & 0xFF);
        }
    }
    return bytes;
}
