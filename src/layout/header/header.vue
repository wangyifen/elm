<template>
    <header class="clea">
        <router-link to="/firstpage">
            <div class="logo fl">
                <div class="home_logo fl">
                    <img src="../../assets/logos/Group@2x.png" class="diyi_logo"/>
                </div>
                <p class="fl logo_text">递易运营后台</p>
            </div>
        </router-link>

        <div class="fr info" @click="callmenu">
            <img class="admin_img" src="../../assets/icon/tou.png">
            <span>{{mobile}}</span>
            <ul class="admin_bars" v-show="adminbars">
                <router-link to="/">
                    <li @click="delcookie"><em><img src="../../assets/icon/32.png"></em>退出登录</li>
                </router-link>
            </ul>
        </div>

        <div class="fr admin">
            <el-badge :value="$store.bus.state.totalMessage" :max="99" class="item admin_msg" >
                <!-- <i class='el-icon-bell' @click="callmessage"></i> -->
                <img src="../../assets/icon/msg.png" alt="" srcset="" @click="callmessage" class="admin_img_msg">
            </el-badge>
            <div class="admin_msg_bars" v-show="adminmsgbars">
                <div class='msg_tital'>消息通知</div>
                <ul>
                    <!-- <li v-for="item in $store.bus.state.messageList" :key="item.Parameter">{{item.MessageTypeName}}<span @click="detail(item)">查看详情<i class='el-icon-arrow-right'></i></span></li> -->
                </ul>
                <div class='msg_view' @click="toMessageList">
                    查看更多消息
                </div>
            </div>

        </div>
        <!-- <div class="fr info">
            <p>{{mobile}}</p>
        </div> -->
    </header>
</template>
<script>
document.body.onclick = function (e) {
    if (document.getElementsByClassName('admin_bars').length > 0) {
        if (e.target.getAttribute('class') == 'admin_img') {
            document.getElementsByClassName('admin_bars')[0].style.display = 'block'
        } else {
            document.getElementsByClassName('admin_bars')[0].style.display = 'none'
        }
    }
    if (document.getElementsByClassName('admin_msg_bars').length > 0) {
        if (e.target.getAttribute('class') == 'admin_img_msg') {
            document.getElementsByClassName('admin_msg_bars')[0].style.display = 'block'
        } else {
            document.getElementsByClassName('admin_msg_bars')[0].style.display = 'none'
        }
    }
}
export default {
    name: 'Header',
    data () {
        return {
            adminbars: false,
            adminmsgbars: false,
            totalMessage: 0,
            messageList: []
        }
    },
    mounted () {
        window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
        callmenu () {
            this.adminbars = true
        },
        handleScroll () {
            this.adminbars = false
        },
        callmessage () {
            this.adminmsgbars = true
        },
        delcookie () {
            // this.$store.bus.state.userData = ''
            sessionStorage.clear()
            // this.$store.scrollBar.state.barList = []
            // this.$router.push('/login')
            location.href = '/#/login'
        },
        toMessageList () {
            this.$router.push({ name: 'messagenotice' })
        },
        detail (val) {
            switch (val.MessageType) {
            case 1:
                switch (val.AppId) {
                case 0:
                    this.$router.push({ name: 'appfeedback', params: { id: val.Parameter } })
                    break
                case 1:
                    this.$message.error('无法区分当前意见反馈来源')
                    break
                case 2:
                    this.$router.push({ name: 'courierfeedback', params: { id: val.Parameter } })
                    break
                case 3:
                    this.$router.push({ name: 'appassistantfeedback', params: { id: val.Parameter } })
                    break
                case 4:
                    this.$router.push({ name: 'generatefeedback', params: { id: val.Parameter } })
                    break
                case 5:
                    this.$router.push({ name: 'aftersalefeedback', params: { id: val.Parameter } })
                    break
                }
                break
            case 2:
                this.$router.push({ name: 'workorder', params: { id: val.Parameter } })
                break
            case 3:
                this.$router.push({ name: 'systemmessage', params: { id: val.Parameter } })
                break
            }
        }
    },
    computed: {
        mobile () {
            return this.$store.bus.state.userData.AccountName
        }
    }
}
</script>

<style scoped lang="scss">
    @import './header.scss'
</style>
