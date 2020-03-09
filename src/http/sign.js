
import md5 from 'js-md5'
import {getCookie} from './postdata'
export const changesign = (data) => {
    getCookie();
    let postda = {
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
