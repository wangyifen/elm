<template>
    <div class="bg">
        <div class='main'>
            <div class="content_head">
                <p class="head-title">找回密码</p>
                <el-row class="forget_step">
                    <el-steps :active="step" align-center>
                        <el-step title="确认账号"></el-step>
                        <el-step title="验证身份"></el-step>
                        <el-step title="设置密码"></el-step>
                        <el-step title="完成" icon="el-icon-success"></el-step>
                    </el-steps>
                </el-row>                        
            </div>
            <div class="forget_content">
                <div class="step_1" v-if="step == 1">
                    <el-form size="large" label-width="100px" :rules="rules1">
                        <el-form-item label="账号：">
                            <el-input placeholder="用户名/已注册手机号" v-model="account"></el-input>
                        </el-form-item>
                        <el-form-item label="验证码" prop="verify">
                            <el-input placeholder="请输入验证码" v-model="verify"></el-input>
                            <span class="fr curp" @click="refreshCode">换一张</span>
                            <s-identify class="fr" :identifyCode="identifyCode"></s-identify>                            
                        </el-form-item>
                        <el-form-item class="btns">
                            <el-button type="primary" @click="Prestep(1)">返回</el-button>
                            <el-button type="primary" @click="nextStep1" :disabled="canstep">下一步</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="step_2" v-if="step == 2">
                    <el-form size="large" label-width="150px">
                        <el-form-item label="您的手机号码：">
                            <span>{{accountArr.misMobile}}</span>
                        </el-form-item>
                        <el-form-item label="短信验证码：">
                            <el-input placeholder="请输入6位短信验证码" v-model="mobilecode"></el-input>
                            <span class="curp" @click="getCode" v-show="time==60" :disabled="isbtn">获取验证码</span>
                            <span v-show="time!=60">{{time + "s"}}</span>
                        </el-form-item>
                        <el-form-item class="btns">
                            <el-button type="primary" @click="Prestep(2)">上一步</el-button>
                            <el-button type="primary" @click="nextStep2">下一步</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="step_3" v-show="step == 3">
                    <el-form :model="ruleform" size="large" label-width="120px" :rules="rules" ref="ruleform">
                        <el-form-item label="新密码：" prop="password">
                            <el-input placeholder="密码支持数字、字母、特殊符号（~!@#$%&\_），6—20位" v-model="ruleform.password"  @focus="showtip"></el-input>
                        </el-form-item>
                        <el-form-item label="重复密码：" prop="repassword">
                            <el-input placeholder="请再次输入新密码" v-model="ruleform.repassword" ></el-input>
                        </el-form-item>
                        <el-form-item class="btns">
                            <el-button type="primary" @click="Prestep(3)">上一步</el-button>
                            <el-button type="primary" @click="nextStep3">确定</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="step_4" v-if="step == 4">
                    <img src="../../assets/icon/blue.jpg">
                    <div class="fl">
                        <p>您的新密码已设置成功.请记住它哦！</p>
                        <p>{{second}}秒后，自动返回之前的网页。</p>
                        <p><router-link to="/login" class="toreturn">点击此处,</router-link>立刻返回之前的网页。</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SIdentify from '@/components/identify'
const CryptoJS = require('crypto-js')
export default {
    name: 'codetest',
    data() {
        const validatepassword = (rule, value, callback) => {
            this.tip = false;
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (value.length < 6 || value.length > 12) {
                    callback(new Error('长度只能在6—20位之间'));
                } else if (!this.$store.bus.state.testpass.test(value)) {
                    callback(new Error(this.$store.bus.state.passtip));
                } else {
                    callback();
                }
            }
        };
        const validaterepassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleform.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        const validateverify = (rule, value, callback) => {
            if (!this.verify) {
                callback(new Error('验证码不能为空'));
            } else if (this.verify.toLowerCase() != this.identifyCode.toLowerCase()) {
                callback(new Error('您输入的验证码有误，请重新输入!'));
            } else {
                callback();
            }
        };
        return {
            identifyCodes: 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789',
            identifyCode: '',
            canstep: true,
            account: '',
            verify: '',
            step: 1,
            mobile: '',
            accountArr: {},
            mobilecode: '',
            time: 60,
            isbtn: false,
            second: 3,
            ruleform: {
                password: '',
                repassword: ''
            },
            rules: {
                password: [
                    { required: true,validator: validatepassword, trigger: 'blur' }
                ],
                repassword: [
                    { required: true,validator: validaterepassword, trigger: 'blur' }
                ]
            },
            rules1: {
                verify: [
                    { required: true,validator: validateverify, trigger: 'blur' }
                ]
            },
            tip: false,
            timer: null
        };
    },
    mounted() {
        this.identifyCode = '';
        this.makeCode(this.identifyCodes, 4);
    },
    methods: {
        showtip() {
            this.tip = true;
        },
        encryptByDES(message, key) {
            const keyHex = CryptoJS.enc.Utf8.parse(key);
            const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            return encrypted.toString();
        },
        nextStep3() {
            this.$refs.ruleform.validate((valid) => {
                if (valid) {
                    const a = this.accountArr.AccountMobile;
                    const postda = {
                        ...this.$store.bus.state.basePost,
                        ReqTime: new Date().getTime(),
                        UniqueId_Account: this.accountArr.AccountKey,
                        AccountMobile: this.accountArr.AccountMobile,
                        AccountPwd: this.encryptByDES(this.ruleform.password, a.substring(0, 8)),
                        UpdateAccount: this.accountArr.AccountKey,
                        AccountID: this.accountArr.AccountKey,
                        TenantID: this.accountArr.TenantKey,
                        AccountType: 1,
                        SuperAdminId: this.accountArr.SuperAdminId

                    };
                    this.$store.bus.commit('changesign',postda);
                    this.$ajax.post(`${this.$store.bus.state.url1}/ErpBasic/Account/UpdatePassword`,
                        JSON.stringify(this.$store.bus.state.postda),
                        { headers: { 'Content-Type': 'application/json' } }
                    ).then(response => {
                        if (response.status == 200) {
                            if (response.data.Code == 200) {
                                this.step = 4
                                const second = setInterval(() => {
                                    this.second--;
                                    if (this.second <= 0) {
                                        clearInterval(second);
                                        this.second = 3;
                                        this.$router.push({ path: '/login' });
                                    }
                                },1000);
                            } else {
                                this.$message.error(response.data.Message)
                            }
                        }
                    }).catch(() => {

                    })
                } else {
                    return false;
                }
            })
        },
        nextStep2() {
            if (!this.mobilecode) {
                this.$message.error('请填写短信验证码');
                return;
            } else if (!this.$store.bus.state.testnum.test(this.mobilecode)) {
                this.$message.error(this.$store.bus.state.numtip);
                return;
            }
            const postda = {
                RedisName: 'RetrievePassword',
                AccountKey: this.accountArr.AccountKey,
                TenantKey: this.accountArr.TenantKey,
                VerificationCode: this.mobilecode,
                AccountMobile: this.accountArr.AccountMobile
            };
            const requre = require('querystring');
            this.$ajax.post(`${this.$store.bus.state.url}/api/Common/ExistVerificationCode`,
                requre.stringify(postda),
                { emulateJSON: false }
            ).then(response => {
                if (response.status == 200) {
                    if (response.data.Code == 200 && response.data.Data == 1) {
                        this.step = 3
                    } else {
                        this.$message.error(response.data.Message);
                    }
                }
            })
        },
        Prestep(val) {
            switch (val) {
            case 1:
                this.$router.push({ path: '/login' });
                break;
            case 2:
                this.step = 1
                break; 
            case 3:
                this.step = 2
                break; 
            }
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
            },1000);
        },
        getCode () {
            const postData = {
                Phone: this.accountArr.AccountMobile,
                RedisName: 'RetrievePassword',
                AccountID: this.accountArr.AccountKey,
                AccountKey: this.accountArr.AccountKey,
                TenantKey: this.accountArr.TenantKey,
                AppID: '9999',
                Nonce: 'abcd',
                TerminalType: 'pcweb',
                TerminalVersion: '1.0.0',
                ReqTime: new Date().getTime(),
                AccountType: 1
            }
            this.$store.bus.commit('changesign',postData)
            this.isbtn = true
            this.$ajax.post(`${this.$store.bus.state.url1}/ErpBasic/Common/GetVerificationCode`,
                JSON.stringify(this.$store.bus.state.postda),
                { headers: { 'Content-Type': 'application/json' } }
            ).then(response => {
                this.isbtn = false
                if (response.data.IsSuccess == true && response.data.Code == 200) {
                    this.cutDown();
                } else {
                    this.$message.error(response.data.Message);
                }
            }).catch(() => {
                this.isbtn = false
            });
        },
        nextStep1() {
            if (this.verify.toLowerCase() != this.identifyCode.toLowerCase()) {
                this.$message.warning('您输入的验证码有误，请重新输入!');
                this.refreshCode()
                return;
            }
            const postda = {
                AccountNameOrMobile: this.account,
                AppID: this.$store.bus.state.basePost.AppID
            };
            this.$ajax.post(`${this.$store.bus.state.url1}/ErpBasic/Account/QueryAccountDetailByNameOrMobile`,
                JSON.stringify(postda),
                { headers: { 'Content-Type': 'application/json' } }
            ).then(response => {
                if (response.status == 200) {
                    if (response.data.Code == 200) {
                        this.step = 2
                        this.accountArr = response.data.Data;
                        this.accountArr.misMobile = this.accountArr.AccountMobile.substr(0,3) + '****' + this.accountArr.AccountMobile.substr(7)
                        this.$store.bus.state.userData = { SignToken: response.data.Data.SignToken }
                    } else {
                        this.$message.error(response.data.Message);
                        this.refreshCode();
                    }
                } else {
                }
            }).catch(() => {

            })
        },
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        refreshCode() {
            this.identifyCode = '';
            this.makeCode(this.identifyCodes, 4);
        },
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                ];
            }
        },
        fetchData() {
            this.verify = '';
            this.step = 1;
            this.accountArr = {};
            this.mobilecode = '';
            this.time = 60;
            clearInterval(this.timer);
            this.timer = null;
            this.isbtn = false;
            this.ruleform = {
                password: '',
                repassword: ''
            };
            this.identifyCode = '';
            this.makeCode(this.identifyCodes, 4);
        }
    },
    components: {
        SIdentify: SIdentify
    },
    watch: {
        account: function (newQuestion, oldQuestion) {
            if (this.verify && this.account) {
                this.canstep = false;
            } else {
                this.canstep = true;
            }
        },
        verify: function (newQuestion, oldQuestion) {
            if (this.verify && this.account) {
                this.canstep = false;
            } else {
                this.canstep = true;
            }
        },
        $route: 'fetchData'
    },
    created() {
        if (this.$route.params.account) {
            this.account = this.$route.params.account;
        }
    }
};
</script>

<style scoped>
    #app .bg{
        background: #fff;
        overflow: hidden;
        height: auto;
    }
    .main{
        width: 80%;
        margin: 0 auto;
    }
    .content_head{
        margin-top: 100px;
    }
    .head-title{
        font-size: 24px;
        line-height: 50px;
        color: #409EFF;
        text-indent: 9%;
        margin-bottom: 20px;
    }
    .el-steps{
        border-bottom: 2px solid #eee;
        padding-bottom: 20px;
    }
    .forget_content{
        margin: 0 auto;
        margin-top: 100px;
        width: 630px;
    }
    .el-form .el-input{
        width: 350px;
    }
    .s-canvas{
        display: inline;
    }
    .el-form-item{
        margin-bottom: 30px;
    }
    .btns{
        margin-top: 50px;
    }
    .btns .el-button{
        width: 120px;
    }
    .curp{
        cursor: pointer;
        color: #409EFF; 
        margin-left: 20px;
    }
    .step_4{
        height: auto;
        overflow: hidden;
        width: 350px;
        margin: 0 auto;
    }
    .step_4 img{
        width: 65px;
        height: auto;
        float: left;
        margin-right: 15px;
    }
    .toreturn{
        color: #409EFF; 
    }
</style>
