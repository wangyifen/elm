import Mock from 'mockjs';
const devBaseUrl = 'http://erpapidev.diyibox.cn/oplatform'
Mock.mock(devBaseUrl + '/Tenant/GetPreAuth','post', {
    'data|1-2': [{
        title: '@title',
        article: '@csentence'
    }]
})
