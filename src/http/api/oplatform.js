export default {
    GetPreAuth: { //获取预授权码
        url: '/Tenant/GetPreAuth',
        type: 'post',//默认post，可忽略不写
        header: {
            'Content-Type': 'application/json',//可省略默认
            isIgnore: true//是否过滤拦截，默认false
        }
    },
    BindOffiAccount: { //绑定公众号
        url: '/Tenant/BindOffiAccount'
    },
    GetOffiAccountList: { //公众号列表
        url: '/Tenant/GetOffiAccountList'
    },
    UnBundleOffiAccount: { //解绑公众号
        url: '/Tenant/UnBundleOffiAccount'
    },
    BasicInfo: { //公众号基本信息
        url: '/Offiaccount/BasicInfo'
    },
    ModifyIndustry: { //修改行业信息
        url: '/Offiaccount/ModifyIndustry'
    },
    GetMenuList: { //获取公众号菜单
        url: '/Menu/List'
    },
    SetMenuList: { //设置公众号菜单
        url: '/Menu/Set'
    },
    GetRuleList: { //获取公众号回复规则列表
        url: '/AutoReply/RuleList'
    },
    GetRuleDetail: { //获取公众号回复规则详情
        url: '/AutoReply/RuleDetail'
    },
    DeleteRule: { //删除公众号回复规则
        url: '/AutoReply/DeleteRule'
    },
    DeleteKeyword: { //删除公众号回复关键字
        url: '/AutoReply/DeleteKeyword'
    },
    DeleteReplyContent: { //删除公众号回复内容
        url: '/AutoReply/DeleteReplyContent'
    },
    AddRule: { //添加公众号回复规则详情
        url: '/AutoReply/AddRule'
    },
    MessageList: { //用户留言列表
        url: '/Message/List'
    },
    MessageReply: { //回复留言
        url: '/Message/Reply'
    },
    FunsList: { //粉丝列表
        url: '/Funs/List'
    },
    FunsRecord: { //粉丝记录
        url: '/Funs/Record'
    },
    CommonUploadImg: { //上传图片
        url: '/Common/UploadImg'
    }
}
