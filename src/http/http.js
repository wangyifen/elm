const host = JSON.parse(process.env.VUE_APP_BASEURL).BASE_URL
export const $post = (url, data,header = {}) => {
    const postda = {
        ReqTime: new Date().getTime(),
        ...data
    };
    // postda = Sign(postda)
    return axios.post(`${host}${url}`,
        JSON.stringify(postda), {
            headers: {
                'Content-Type': 'application/json'
            },
            ...header
        }
    )
}
