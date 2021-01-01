<template>
  <div class="login">
    <img
      src="../assets/img/rect1.png"
      class="rect1 wow fadeInDown"
      data-wow-delay=".3s"
    />
    <img
      src="../assets/img/rect2.png"
      class="rect2 wow fadeInRight"
      data-wow-delay="1.4s"
    />
    <img
      src="../assets/img/nan-img2.png"
      class="man-img2 wow fadeInLeft"
      data-wow-delay="1.8s"
    />
    <img
      src="../assets/img/rect4.png"
      class="rect4 wow fadeInRight"
      data-wow-delay="1s"
    />
    <img
      src="../assets/img/rect3.png"
      class="rect3 wow fadeInRight"
      data-wow-delay="1.8s"
    />
    <img
      src="../assets/img/nv1.png"
      class="nv1 wow bounceInUp"
      data-wow-delay="2.1s"
    />
    <img
      src="../assets/img/nan-img.png"
      class="man-img1 wow fadeInRight"
      data-wow-delay="2.5s"
    />
    <img
      src="../assets/img/dui-icon.png"
      class="dui-icon wow bounceIn"
      data-wow-delay=".5s"
    />
    <img
      src="../assets/img/setting-icon.png"
      class="setting-icon wow bounceIn"
      data-wow-delay="1s"
    />
    <img
      src="../assets/img/zhuanshi-icon.png"
      class="zhuanshi-icon wow bounceIn"
      data-wow-delay="1.5s"
    />
    <div class="form-group wow fadeInDown" data-wow-delay="2s">
      <h3>管理员登录</h3>
      <el-form
        ref="form"
        :model="form"
        label-width="60px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名">
          <el-input v-model="form.user"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.pass" type="password" @keypress.native.enter = "submit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import "normalize.css";
import seoConfig from "@/assets/seoConfig";
if (process.browser) {
  // 在这里根据环境引入wow.js bounceInUp
  var { WOW } = require("wowjs");
}
import { loginApi } from "../api";
import { post } from "@/libs/axios";
export default {
  name: "login",
  head() {
    return {
      title: "登录",
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: seoConfig.keyWords,
        },
        {
          hid: "description",
          name: "description",
          content: "邵预鸿-前端开发|生活记录",
        },
      ],
    };
  },
  data() {
    return {
      form: {
        user: "",
        pass: "",
      },
    };
  },
  methods: {
    resetForm() {
      for (let i in this.form) {
        this.form[i] = "";
      }
    },
    async submit() {
      let { user, pass } = this.form;
      if (user.length ===0) {
        this.$message.error("用户名不能为空");
        return;
      }
      if (pass.length===0) {
        this.$message.error("密码不能为空");
        return;
      }
      const result = await post(loginApi,{user,pwd:pass});
      let { code,msg } = result.data;
      if(code ===200){
         localStorage.setItem("token",result.data.token);
         localStorage.setItem("login_time",Date.now());
         this.$store.commit({
           type:'setLoginStatus',
           payload:{
              token:result.data.token,
              nick:result.data.nick
           }
         });
         this.$message.success(msg);
         this.$router.replace({name:'index'});
      }else{
        this.$message.error(msg);
      }
    },
  },
  mounted() {
    if (process.browser) {
      // 在页面mounted生命周期里面 根据环境实例化WOW
      new WOW({
        live: false,
        offset: 0,
      }).init();
    }
  },
};
</script>

<style scoped lang="less">
@px: 9.7px;
.block {
  position: absolute;
  display: block;
}
.login {
  width: 100vw;
  height: 100vh;
  background: url("../assets/img/login-bg.png") no-repeat;
  background-size: auto 100%;
  background-position: left center;
  position: relative;
  img {
    user-select: none;
  }
  .rect1 {
    .block;
    left: 284px / @px * 1vh;
    top: 136px / @px * 1vh;

    height: 100px / @px * 1vh;
  }
  .rect2 {
    left: 400px / @px * 1vh;
    top: 300px / @px * 1vh;
    .block;
    height: 330px / @px * 1vh;
    z-index: 2;
  }
  .man-img2 {
    .block;
    left: 0;
    top: 290px / @px * 1vh;
    width: 230px / @px * 1vh;
  }
  .rect4 {
    .block;
    left: 230px / @px * 1vh;
    top: 420px / @px * 1vh;
    height: 108px / @px * 1vh;
  }
  .rect3 {
    .block;
    left: 600px / @px * 1vh;
    top: 230px / @px * 1vh;
    z-index: 3;
    height: 220px / @px * 1vh;
    box-shadow: 0 3px 10px rgba(232, 114, 219, 0.2);
  }
  .nv1 {
    top: 490px / @px * 1vh;
    .block;
    left: 260px / @px * 1vh;
    height: 580px / @px * 1vh;
  }
  .man-img1 {
    .block;
    left: 630px / @px * 1vh;
    top: 450px / @px * 1vh;
    height: 500px / @px * 1vh;
  }
  .dui-icon {
    .block;
    left: 230px / @px * 1vh;
    top: 250 / @px * 1vh;
    width: 40px / @px * 1vh;
  }
  .setting-icon {
    .block;
    left: 720px / @px * 1vh;
    top: 140px / @px * 1vh;
    width: 40px / @px * 1vh;
  }
  .zhuanshi-icon {
    .block;
    left: 1000px / @px * 1vh;
    top: 350px / @px * 1vh;
    width: 40px / @px * 1vh;
  }
  .form-group {
    .block;
    right: 100px / @px * 1vh;
    top: 40%;
    width: 400px;
    border: 1px solid #ddd;
    padding: 50px 30px;
    h3 {
      font-size: 30px;
      font-weight: 500;
      color: #230d44;
      margin-bottom: 30px;
    }
  }
  /deep/ .el-form-item:last-child {
    margin-bottom: 0;
  }
}
</style>