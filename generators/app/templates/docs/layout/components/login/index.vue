<template>
	<div class="rk-login flex-h">
		<div class="rk-login-l">
			<div class="rk-login-form-wrapper">
				<div class="rk-login-form">
					<el-alert
						v-if="loginInfo.show"
						:title="loginInfo.message"
						:type="loginInfo.type"
						@close="showError"
						effect="dark"
					/>
					<el-alert
						v-show="licenseInfoStatus && licenseInfoStatus.trial && licenseInfoStatus.valid"
						:title="$t('login.probationProduct')+`${licenseRemainingDay}${this.$t('login.uploadPermission')}`"
						type="warning"
						:closable="false"
						center
						effect="dark"
					/>
					<h1 class="mb-15 title" style="font-size: 28px">
						<span class="white-background-grey">{{ homeTitle || 'SunEDSP' }}</span>
					</h1>
					<el-form
						ref="loginForm"
						id="loginForm"
						:model="loginForm"
						style="width: 100%"
						:rules="loginRules"
						autocomplete="off"
						novalidate
					>
						<el-form-item prop="username">
							<div class="input-data">
								<input
									id="login-username"
									name="login-username"
									v-model="loginForm.username"
									class="rk-login-input mb-12"
									style="width: 100%"
									required
									type="text"
								/>
								<label class="sm b mb-5" for="login-username">{{ $t('username') }}</label>
							</div>
						</el-form-item>
						<el-form-item
							prop="password"
							class="login-password-form-item"
							@keyup.enter.native="handleLogin"
						>
							<div class="input-data">
								<input v-show="false" type="password" style="width: 100%" v-model="loginForm.password" />
								<input
									id="login-password"
									name="login-password"
									v-model="loginForm.password"
									autocomplete="off"
									style="width: 100%"
									class="rk-login-input mb-12"
									:class="{ 'input-password': !isShowPassword }"
									required
								/>
								<label class="sm b mb-5" for="login-password">{{ $t('password') }}</label>
								<span class="el-icon-view eye-btn el-icon-view" @click="showPassword"></span>
							</div>
						</el-form-item>
						<!-- 验证码 -->
            <el-form-item v-if="captchaEnabled" prop="captchaCode">
              <div class="input-data" style="display:flex">
                <input v-model="loginForm.captchaCode" class="captchaCode" required>
                <div style="width:76%" class="captchaCode" @click="changeCaptchaCode" >
                  <img :src="'data:image/jpg;base64,'+captchaCodeLogo" alt="验证码">
                </div>
                <label
                  class="sm b mb-5 captchaCode-label"
                >{{$t('captchaCode')}}</label>
              </div>
            </el-form-item>
						<el-form-item>
							<el-button
								id="login-form-submit"
								style="background: #409eff"
								type="primary"
								:loading="loading"
								class="rk-btn dib tc cp long mb-10 rk-login-btn"
								@click.native.prevent="handleLogin"
							>{{ $t('logIn') }}</el-button>
						</el-form-item>
					</el-form>
					<p class="grey sm">{{ footLabel }}</p>
				</div>
			</div>
		</div>

		<div class="rk-login-r hide-xs">
			<img v-if="homeLogo" :src="homeLogo" class="logo-home" width="350" height="70" />
		</div>
		<select-domain-dialog
			:visible="showDomainDialog"
			v-if="showDomainDialog"
			@closeDialog="closeDialog"
		></select-domain-dialog>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ElForm } from 'element-ui/types/form.js';
import _ from 'lodash';
import { UserCenter, EdspLoginService } from '../../services';
import CryptoJS from 'crypto-js';
import JsEncrypt from 'jsencrypt';
import { sm2 as SM2 } from 'sm-crypto';
import selectDomainDialog from '../../components/selectDomainDialog.vue';


const loginAPI = `edsp/login`;

interface Account {
  userName: string;
	password: string;
	captchaCode: string;
}


@Component({
	components: {
		selectDomainDialog,
	},
})
export default class Login extends Vue {
	isEncrypt: boolean = false;
	randomString: string = '';
	aesKey: any = '';
	rasPublicKey: any = '';
	isShowPassword: boolean = false;
	loginRules: object = {};
	loading: boolean = false;
	showDomainDialog: boolean = false;
	footLabel: string = localStorage.getItem('copyright') || '';
	activeName: string = 'first';
	homeLogo = '../../images/sunline_logo.png';
	passwordEncryptionType: string = ''; // 加密类型
  publicKey: any = '';
	loginForm = {
		username: '',
		password: '',
		url: loginAPI,
		captchaCode: '',
    captchaToken: '',
	};
	loginInfo = {};
	clusterList = [];
	captchaCodeLogo ='';
  captchaEnabled = true;


	created() {
		this.loginRules = {
			username: [
				{
					required: true,
					message: (this as any).$t('login.inputUsername'),
					trigger: 'blur',
				},
			],
			password: [
				{
					required: true,
					message: (this as any).$t('login.inputPassword'),
					trigger: 'blur',
				},
			],
      captchaCode: [
        {
          required: true,
          message: (this as any).$t('login.inputCaptchaCode'),
          trigger: 'blur',
        },
      ],
		};
		this.loginInfo = {
			message: `${(this as any).$t('login.hello')}`,
			type: 'error',
			show: false,
		};
	}

	mounted() {
		  this.getcaptchaCode();
	}

	// 获取验证码
  getcaptchaCode(){
     EdspLoginService.getCaptcha().then((res) => {
       if (res && res.code === 200) {
          this.captchaCodeLogo = res.data.img;
          this.captchaEnabled = res.data.captchaEnabled;
          this.loginForm.captchaToken =  res.data.captchaToken;
       }     
     });
  }
// 更新验证码
  changeCaptchaCode(){
    this.getcaptchaCode();
  }

	closeDialog(val) {
		this.showDomainDialog = val;
	}

	handleLogin() {
		(this.$refs.loginForm as ElForm).validate((valid) => {
			if (valid) {
				this.loginConfirm(this.loginForm);
			} else {
				this.loading = false;
				return false;
			}
		});
	}

	showPassword() {
		this.isShowPassword = this.isShowPassword ? false : true;
	}
	

	//AES加函数，返回加密后的字符串
	aesEncrypt(word, keyStr) {
		//AES加密
		let keyHex = CryptoJS.enc.Utf8.parse(keyStr);
		let encrypted = CryptoJS.AES.encrypt(word, keyHex, {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7,
		});
		// encrypted生成的是一个对象，通过ciphertext拿到密文
		encrypted = encrypted.ciphertext.toString();
		//转成16进制
		let encryptedHexStr = CryptoJS.enc.Hex.parse(encrypted);
		//base64编码
		let base64 = CryptoJS.enc.Base64.stringify(encryptedHexStr);
		// //本地AES解密
		return base64;
	}

	//RSA加密
	rsaEncrypt(message, publicKey) {
		//实例化jsEncrypt对象
		let encrypt = new JsEncrypt();
		//设置公钥;publicKey为公钥
		encrypt.setPublicKey(publicKey);
		const txt = encrypt.encrypt(message);
		return txt;
	}

	// SM2加密
  sm2(publicKey, originalData) {
    return `04${SM2.doEncrypt(originalData, publicKey)}`;
  }

	async loginConfirm(param) {
		this.loading = true;
		// param.loginSystem = 'SunEDSP';
		// 进行深克隆,防止密码输入框替换为密文
		let userLoginInfo = _.cloneDeep(param);
		if (!userLoginInfo.apiKey) {
			try {
				let keysres = await UserCenter.loginEncryptionKeys();
			  if (keysres.code === 200) {
          this.isEncrypt = keysres.data.encrytionKey;
          this.publicKey = keysres.data.publicKey;
          this.passwordEncryptionType = keysres.data.passwordEncryptionType;
          if (this.passwordEncryptionType !== 'SM2') {
            this.randomString = keysres.data.randomString;
            this.aesKey = keysres.data.aesKey;
          }
        }
				//判断是否需要加密
		   // 判断是否需要加密
        if (this.isEncrypt) {
          if (this.passwordEncryptionType === 'SM2') {
           try {
            userLoginInfo.password = this.sm2(this.publicKey, this.loginForm.password);
           } catch (error) {
             
           }
          } else {
            // AES加密
            let aesEncryptStr = this.aesEncrypt(this.randomString, this.aesKey);
            // AES加密后拼接
            let rsaStr = `${aesEncryptStr}:${this.loginForm.password}`;
            // RSA加密
            let rsaEncryptStr = this.rsaEncrypt(rsaStr, this.publicKey);
            // 将最终加密的结果对password进行替换
            userLoginInfo.password = rsaEncryptStr;
          }
        }
			} catch {
				this.loading = false;
				return;
			}
		}

		this.$store
			.dispatch('Login', userLoginInfo)
			.then((url) => {
				(this as any).$i18n.locale = localStorage.getItem('LANGUAGE_STYLE');
				this.loading = false;
				this.showDomainDialog = true;
			})
			.catch((res) => {
        this.getcaptchaCode();
				this.loading = false;
				this.$message.error('用户名/密码有误,请重新输入');
			});
	}
}
</script>
<style lang="less">
.rk-login {
	height: 100%;
	background: #fff;

	.title {
		font-weight: bolder;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
	}
}

.rk-img-wrapper {
	width: 100%;
	height: 100%;
	animation: spin 100s linear infinite;
	background-size: 100%;
	background-position: center;
}

.rk-img-logo {
	position: absolute;
	top: 35%;
	left: 50%;
	margin-left: -150px;
}

.input-data {
	position: relative;
	margin-top: 15px;
	width: 100%;

	.input-password {
		-webkit-text-security: disc;
		text-security: disc;
	}
	.captchaCode{
    margin-top: 23px;
    height: 40px;
    border: 1px solid #e4e7ed;
    img{
    width: 100%;
    height: 40px;
    &:hover{
      cursor: pointer;
    }
    }
  }
  .captchaCode-label{
    font-size: 14px;
    line-height: 1;
    color: #24c1ab;
  }
	label {
		position: absolute;
		top: 0;
		left: 0;
		transition: all linear 0.2s;
		font-size: 16px;
	}

	.rk-login-input:-webkit-autofill {
		box-shadow: 0 0 0 1000px #fff inset;
		-webkit-text-fill-color: #000;
	}

	.rk-login-input {
		width: 100%;
		border: 0;
		font-size: 16px;
		border-bottom: 1px solid #e4e7ed;
		padding: 2px 0.2em 5px;
		transition: border-color 0.3s;
		background: #ffff;
		color: #000000;

		&:focus {
			outline: none;
			border-bottom: 1px solid #409eff;
		}

		&::before {
			display: inline-block;
			content: '';
			background-color: #ffff;
			width: 100%;
			height: 100%;
		}

		&:focus ~ label {
			top: -25px;
			font-size: 14px;
			color: #409eff;
		}

		&:valid ~ label {
			top: -25px;
			font-size: 14px;
		}
	}
}

.login-password-form-item {
	position: relative;
	width: 100%;

	.password-eye-button {
		position: absolute;
		right: 5px;
		top: 5px;
		line-height: 30px;
		height: 30px;
		cursor: pointer;
	}
}

.rk-login-form-wrapper {
	display: table-cell;
	vertical-align: middle;
}

.rocket {
	position: absolute;
	width: 120px;
	height: 120px;
	top: 50%;
	left: 50%;
	margin-top: -60px;
	margin-left: -60px;
}

.rk-login-form {
	min-width: 360px;
	margin: 0 auto;
	padding-bottom: 30px;

	.dscp {
		margin-bottom: 30px;
	}
}

.rk-login-l {
	padding: 0 40px;
	height: 100%;
	flex-shrink: 0;
	margin: 0 auto;
	width: 40%;
	display: flex;
	position: relative;
	align-items: center;
	justify-content: center;
}

.rk-login-r {
	display: flex;
	position: relative;
	height: 100%;
	flex: 1;
	background-color: #21272b;
	overflow: hidden;
}

.rk-login {
	display: flex;
	justify-content: center;

	.el-form {
		padding: 0;
	}
}

.logo-home {
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	position: absolute;
}

@keyframes spin {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

.rk-login-btn {
	padding: 12px 2em !important;
	width: 100%;
	margin-top: 10px;
}

.rk-login-red {
	border-color: #f76363;
}

.eye-btn {
	position: absolute;
	right: 0;
	top: 0;
	transform: translateY(70%);
}

.el-alert__content {
	display: contents;
}
</style>
