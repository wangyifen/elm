<template>
    <div id="login">
        <div class="login-wrap">
            <div class="login">
                <div class="logo">
                    <img src="../../assets/logos/login_logo.png"/>
                </div>
                <div>
                    <p class="title">登录</p>
                    <p class="tip_text">欢迎登录，后台管理系统</p>
                    <form>
                        <ul>
                            <li>
                                <label class="name">
                                    <input 
                                        type="text" 
                                        placeholder="请输入账号" 
                                        v-model="name"
                                        name="username" />
                                </label>
                            </li>
                            <li>
                                <label class="psd clearfix">
                                    <input :type="showPsd?'text':'password'" placeholder="请输入密码" v-model="passwords" name="psd">
                                    <i v-show="psd" :class="showPsd ?'show_psd fr':'noshow_psd fr'" @click="showpsd"></i>
                                </label>
                            </li>
                            <li>
                                <label class="psd clearfix key">
                                    <input type="text" class="code" placeholder="请输入验证码" maxlength="6" v-model="accountVerificationCode" name="psd">
                                    <span v-show="time!=60" class="fr getcode-mobile">{{time + "s"}}</span>
                                    <el-button class="fr mobileCode" @click="getAccountCode" v-show="time==60" type="text" size="mini" :disabled="isbtn">获取验证码</el-button>
                                </label>
                            </li>
                        </ul>
                        <div class="clearfix rememberpsd_box">
                            <div :class="rememberPsd? 'fl rememberpsd':'fl norememberpsd'" @click="remember"></div>
                            <span class="fl psd_tip_text appload_text" @click="remember">记住密码</span>
                            <span class="fl psd_tip_text appload_text forgetpwd" @click="tojump">忘记密码？</span>
                        </div>
                        <input type="button" class="login_btn" @click="tologin" value="登录">
                    </form>
                </div>
            </div>
            <p class="copyright">Copyright©2013-2020.diyibox.com.ALL Rights Reserved &nbsp; <a class="tiao" href="http://www.beian.miit.gov.cn" target="blank">沪ICP备14004052</a></p>
        </div>
    </div>
</template>

<script>
export default {
    props: {

    },
    data () {
        return {
            userData: '',
            accountVerificationCode: '',
            psd: true,//密码显示隐藏控制
            rememberPsd: true, // 是否记住密码的控件
            showPsd: false, // 是否展示密码的控件
            name: '', // 登录的用户名
            passwords: '', // 登录密
            isbtn: false,//获取验证码防止重复点击
            time: 60,//倒计时
            timer: '',//计时器名称
            isPassing: false
        }
    },
    computed: {

    },
    created () {
        console.log(this.$api,'lllllllllll')
    },
    methods: {
        tojump() {
            this.$router.push({ name: 'forget', params: { account: this.name } });
        },
        cutDown () {
            this.time--;
            this.$notify({
                title: '提示',
                message: ('i', { style: 'color: teal' }, '验证码已发送，请查收短信')
            });
            this.timer = setInterval(() => {
                this.time--;
                if (this.time <= 0) {
                    clearInterval(this.timer);
                    this.time = 60;
                }
            }, 1000);
        },
        //获取验证码
        getAccountCode () {
            if (!this.name) {
                this.$message.error('请输入账号！');
                return
            }
            // const postData = {
            //     AccountName: this.name
            // }
            this.cutDown();
        },
        remember() { // 记住密码
            this.rememberPsd = !this.rememberPsd;
        },
        showpsd() { // 密码现实与否
            this.showPsd = !this.showPsd;
        },
        tologin() { //去登陆
            if (!this.name) {
                this.$message.warning('账号不能为空');
                return
            }
            if (!this.psd) {
                this.$message.warning('密码不能为空');
                return
            }
            if (!this.accountVerificationCode || this.accountVerificationCode.trim().length == 0) {
                this.$message.warning('验证码不能为空');
            }
        },
        getInfo() {
            this.$api.QueryAccountListData({}).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
    },
    mounted() {
        this.getInfo();
    },
    watch: {

    },
    components: {

    }
}
</script>

<style scoped lang="scss">
@import './login.scss';
</style>
