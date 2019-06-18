<template>
  <div class="login-container">
    <!-- <div class="login-header">
      <div class="content">
        <img :src="logoIcon" alt="" class="logo">
      </div>
    </div> -->
    <div class="login-content">
      <div class="login-advertisement">
        <h2><img :src="logoIcon" alt="" class="logo" />Vue Project Template</h2>
        <!-- <p>Can be consulted </p> -->
      </div>
      <!-- loginForm -->
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title">Login By Username</div>
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            v-model="loginForm.username"
            name="username"
            type="text"
            auto-complete="on"
            placeholder="username"
          />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :type="pwdType"
            v-model="loginForm.password"
            name="password"
            auto-complete="on"
            placeholder="password"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon icon-class="eye" />
          </span>
        </el-form-item>
        <div class="captcha-content">
          <el-form-item prop="verificationCode" class="captcha">
            <el-input
              v-model="loginForm.verificationCode"
              name="verificationCode"
              type="text"
              auto-complete="off"
              placeholder="Captcha"
            />
          </el-form-item>
          <img @click="getCaptcha" ref="captcha" alt="captcha" class="captcha-img" title="change captcha" />
        </div>
        <el-form-item class="submit-btn">
          <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
            Sign In
          </el-button>
        </el-form-item>
        <div class="tips">
          <span style="margin-right:20px;">Username: j2ee</span>
          <span>Password: J2EE</span>
        </div>
      </el-form>
      <!-- ENDOF loginForm -->
    </div>
  </div>
</template>

<script>
import logoIcon from '@/assets/logo.png';

export default {
  name: 'Login',
  data() {
    return {
      captchaImg: '',
      loginForm: {
        // 表单数据
        username: 'j2ee',
        password: 'J2EE'
      },
      loginRules: {
        // 表单校验
        username: [{ required: true, trigger: 'blur', message: 'Please enter username' }],
        password: [{ required: true, trigger: 'blur', message: 'Please enter password' }],
        verificationCode: [{ required: true, trigger: 'blur' }]
      },
      loading: false,
      pwdType: 'password', // 是否明文密码
      redirect: undefined,
      logoIcon
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    // this.getCaptcha();
  },
  mounted() {
    this.getCaptcha();
  },
  methods: {
    // 明文/隐藏密码
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = '';
      } else {
        this.pwdType = 'password';
      }
    },
    // 登录操作
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch('Login', this.loginForm)
            .then(() => {
              this.loading = false;
              this.$router.push({ path: this.redirect || 'demo/demopage' });
            })
            .catch(() => {
              this.loading = false;
              // 登录失败需要重新拉取验证码
              this.getCaptcha();
              this.loginForm.verificationCode = '';
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getCaptcha() {
      const t = new Date().valueOf();
      console.log(process.env);
      this.$refs.captcha.src = process.env.VUE_APP_BASE_API + '/user/captcha?t=' + t;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;
$black: #333;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 40px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 5px 5px 5px 15px;
      color: $black;
      height: 40px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: $black !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid #999;
    border-radius: 5px;
    color: $black;
    margin-bottom: 32px;
    .el-form-item__content {
      line-height: 30px;
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$black: #333;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;

  .login-content {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    margin: 160px auto;
    .login-form {
      background: #fff;
      width: 400px;
      max-width: 100%;
      padding: 35px 35px 20px 35px;
      margin: 0;
      float: right;
      border-radius: 4px;
    }
    .login-advertisement {
      color: #fff;
      text-align: center;
      .logo {
        width: 45px;
        margin-top: 5px;
        margin-right: 10px;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
  .tips {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 2px 5px 5px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-family: PingFangSC-Regular;
    font-size: 22px;
    font-weight: 400;
    color: $black;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .captcha {
    width: 200px;
    display: inline-block;
  }
  .captcha-img {
    width: 120px;
    vertical-align: middle;
    cursor: pointer;
  }
  .submit-btn {
    border: 1px solid #409eff;
    .el-button {
      border: 1px solid #409eff;
    }
  }
}
</style>
