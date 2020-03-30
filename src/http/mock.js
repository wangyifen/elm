import Mock from 'mockjs';
const devBaseUrl = 'http://erpapidev.diyibox.cn'
Mock.mock(devBaseUrl + '/demoapi','post', {
    'data|1-2': [{
        title: '@title',
        article: '@csentence'
    }]
})
