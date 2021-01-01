<template>
  <div :class="['layouts', currentThemeName]">
    <el-container class="el-big-container">
      <el-header height="80px">
        <h1 class="logo-box">随心记</h1>
        <div class="header-right-box">
          <!-- <iframe
            frameborder="0"
            scrolling="no"
            hspace="0"
            src="https://i.tianqi.com/?c=code&a=getcode&id=2&num=6&icon=1"
            style="width: 100%; color: #fff; height: 80px"
            id="iframe1"
          ></iframe>-->
          <iframe
            id="iframe1"
            width="300"
            height="20"
            frameborder="0"
            scrolling="no"
            hspace="0"
            src="https://i.tianqi.com/?c=code&a=getcode&id=11&icon=1"
          ></iframe>
          <div class="login-group">
            <el-dropdown @command="changeTheme">
              <span class="el-dropdown-link reset-default-header-dropdown">
                修改默认主题
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="success-theme">默认</el-dropdown-item>
                <el-dropdown-item command="white-theme">暗黑主题</el-dropdown-item>
                <el-dropdown-item command="blue-theme">蓝色主题</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div v-if="!getIsLogin" class="inline">
              <nuxt-link to="/login" class="admin-login">
                <i class="el-icon-s-custom"></i>管理员登录
              </nuxt-link>
            </div>
            <div v-else class="user-info inline">
              <i class="el-icon-s-custom"></i>
              <span>{{ getNick }}</span>
              <span class="exit" @click="exit">退出登录</span>
            </div>
          </div>
        </div>
      </el-header>
      <el-container class="content-wrap">
        <el-aside width="200px">
          <el-menu :default-active="this.$route.path ?this.$route.path.replace(/\//g,''): '/'" class="el-menu-vertical-demo">
            <el-menu-item
              :index="item.path.replace(/\//g,'')"
              :key="index"
              v-for="(item, index) in isShowMenu"
              :style="{padding:0}"
            >
              <nuxt-link :to="item.path" tag="a">
                <i :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </nuxt-link>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="overflow">
          <keep-alive>
            <nuxt class="min-height-500" />
          </keep-alive>
          <p class="copyright"><a href="https://beian.miit.gov.cn" target="_blank">渝ICP备17015283号-2</a></p>
          <el-backtop target=".el-main" :bottom="40"></el-backtop>
        </el-main>
      </el-container>
    </el-container>
    <!--节日-->
    <section id="jieri"></section>

    <!--欢迎界面 -->
    <div :class="['welcome-box',visited===false?'first-look':'']" v-if="visited===false">
      <div class="welcome-content">
        <div class="text">
          <h3>
            <img src="../assets/img/shao.yuhong-1.jpg" alt="邵预鸿" />
            <pre>welcome | 欢迎首次到来</pre>
          </h3>
        </div>
        <div class="top-line"></div>
        <div class="bottom-line"></div>
        <div class="left-line"></div>
        <div class="right-line"></div>
      </div>
    </div>
  </div>
</template>

<script>
import "~/assets/less/theme.less";
import seoConfig from "~/assets/seoConfig";
if (process.browser) {
  require("../libs/ribbon.min");
}
export default {
  name: "layout1",
  data() {
    return {
      currentThemeName: "success-theme",
      navList: [
        {
          icon: "el-icon-edit-outline",
          path: "/editNote/",
          name: "记笔记",
          isShow: false
        },
        {
          icon: "el-icon-s-claim",
          path: "/",
          name: "笔记列表",
          isShow: true
        },
        {
          icon: "el-icon-office-building",
          path: "/work/",
          name: "职业生涯",
          isShow: true
        },
        {
          icon: "el-icon-bicycle",
          path: "/way/",
          name: "行走路途",
          isShow: true
        },
        {
          icon: "el-icon-reading",
          path: "/history/",
          name: "历史今日",
          isShow: true
        },
        {
          icon: "el-icon-s-help",
          path: "/about/",
          name: "关于我",
          isShow: true
        },
        {
          icon: "el-icon-date",
          path: "/rili",
          name: "日历",
          isShow: true
        },
        {
          icon: "el-icon-message",
          path: "/tellme/",
          name: "给我留言",
          isShow: true
        },
        {
          icon: "el-icon-s-claim",
          path: "/noteManage/",
          name: "笔记管理",
          isShow: false
        },
        {
          icon: "el-icon-video-camera",
          path: "/videoManage/",
          name: "行走路途管理",
          isShow: false
        },
        {
          icon: "el-icon-school",
          path: "/workManage/",
          name: "职业生涯管理",
          isShow: false
        },
        {
          icon: "el-icon-menu",
          path: "/typeManage/",
          name: "分类管理",
          isShow: false
        }
      ],
      visited: true //是否浏览过
    };
  },
  head() {
    return {
      title: seoConfig.title,
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: seoConfig.keyWords
        },
        {
          hid: "description",
          name: "description",
          content: seoConfig.decoration_note
        }
      ]
    };
  },
  created() {},
  methods: {
    //退出
    exit() {
      this.$store.commit({
        type: "exit"
      });
      this.$router.replace({ name: "index" });
    },

    changeTheme(e) {
      this.currentThemeName = e;
      localStorage.setItem("theme", e);
    },
    /**
     * @param { string } msg
     * 节假日祝福
     */
    alertHolidayMessage(msg) {
      this.$notify({
        title: "好久不见",
        message: msg
      });
    },

    // 检查当前日期是否是节假日
    checkTodayIsHoliday() {
      //近10年除夕列表
      const chuxiList = [
        "2020-2-13",
        "2021-2-11",
        "2022-1-31",
        "2023-1-21",
        "2024-2-9",
        "2025-1-28",
        "2026-2-16",
        "2027-2-5",
        "2028-1-25",
        "2029-2-13",
        "2030-2-2"
      ];

      //近10年春节列表
      const newYearList = [
        "2020-2-14",
        "2021-2-12",
        "2022-2-1",
        "2023-1-22",
        "2024-2-10",
        "2025-1-29",
        "2026-2-17",
        "2027-2-6",
        "2028-1-26",
        "2029-2-14",
        "2030-2-3"
      ];

      //五一节日列表
      const wuyiList = ["5-1"];

      //元旦节日列表
      const yuandanList = ["1-1"];
      //端午节日列表
      const duanyuList = [
        "2020-6-25",
        "2021-6-14",
        "2022-6-3",
        "2023-6-22",
        "2024-6-10",
        "2025-5-31",
        "2026-6-19",
        "2027-6-9",
        "2028-6-27",
        "2029-6-16",
        "2030-6-5"
      ];

      //中秋节
      const zhongqiuList = [
        "2020-10-1",
        "2021-9-21",
        "2022-9-10",
        "2023-9-29",
        "2024-9-17",
        "2025-10-6",
        "2026-9-25",
        "2027-9-15",
        "2028-10-3",
        "2029-9-22",
        "2030-9-12"
      ];

      //3.8妇女节
      const sanbaList = ["3-8"];

      //国庆
      const guoqingList = ["10-1"];

      //清明节
      const qingmingList = [
        "2020-4-4",
        "2021-4-4",
        "2022-4-5",
        "2023-4-5",
        "2024-4-4",
        "2025-4-4",
        "2026-4-5",
        "2027-4-5",
        "2028-4-4",
        "2029-4-4",
        "2030-4-5"
      ];

      const now = new Date();
      const chinaBithday = parseInt(now.getFullYear() - 1949);
      const guoqing = `【国庆】 今天是10.1国庆，祖国${chinaBithday}岁生日，祝愿祖国繁荣昌盛，也祝愿您在这国庆长假中，旅途愉快!`;
      const holidayConfig = {
        yuandan:
          "【元旦】 今天是元旦，昨夜星辰昨夜梦，今日许愿今日圆，日出东方曙光现，幸福就在你身边，福星高照艳阳天，欢声笑语乐心田，良辰好景庆元旦，岁岁年年送祝愿，元旦到了，祝你在新的一年里事事顺利，快乐每一天。",
        chuxi:
          "【除夕】 今天是除夕夜，一张圆桌，合家团座笑呵呵；一顿晚餐，美味家肴喜庆多；一杯美酒，装满幸福和快乐；一个除夕，张灯结彩好喜气；一条祝福，愿你多财又多福；新年到，愿你全家幸福乐逍遥！",
        chujie:
          "【春节 大年初一】 今天是大年初一，忽如一夜春风来，千树万树梨花开。瑞雪喜降，大地披银，阳光虽好，寒气仍重，望您冷暖多保重，身心康乐迎新春。恭喜发财，春节快乐!",
        sanba:
          "【三八】 今天是3.8妇女节，三月的风，让你的心情灿烂。三月的雨，让你的快乐绵长。三月的`阳光，让你的心头温暖。三月的祝福，让你的生活美满。祝你三八妇女节快乐哦!",
        qingming:
          "【清明】 清明节又称踏青节、行清节、三月节、祭祖节等，是中华民族传统隆重盛大的春祭节日，属于慎终追远、礼敬祖先、弘扬孝道的一种文化传统节日。",
        wuyi:
          "【五一】 今天是五一小长假，辛劳了几个月，诗与远方交通都很便利，带上相机，背上背包，陪你所爱的人一起去往心之所向",
        zhongqiu:
          "【中秋】 今天是中秋佳节，月饼虽好，可不要贪吃哦！祝你中秋快乐",
        duanyu: "【端午】 今天是端午小长假，一家人团聚，其乐融融",
        guoqing
      };
      let fullToday = `${now.getFullYear()}-${now.getMonth() +
        1}-${now.getDate()}`;
      let sortToday = `${now.getMonth() + 1}-${now.getDate()}`;
      //No.1 元旦判断
      if (yuandanList.includes(sortToday)) {
        this.alertHolidayMessage(holidayConfig.yuandan);
        this.currentThemeName = "jieri-theme";
        document.querySelector("#jieri").className = "active";
        return;
      } //No.2 除夕判断
      if (chuxiList.includes(fullToday)) {
        this.alertHolidayMessage(holidayConfig.chuxi);
        document.querySelector("#jieri").className = "active";
        this.currentThemeName = "jieri-theme";
        return;
      } //No.3 春节判断
      if (newYearList.includes(fullToday)) {
        this.alertHolidayMessage(holidayConfig.chujie);
        document.querySelector("#jieri").className = "active";
        this.currentThemeName = "jieri-theme";
        return;
      }
      //No.4 判断 清明
      if (qingmingList.includes(fullToday)) {
        this.alertHolidayMessage(holidayConfig.qingming);
        document.body.style.filter = "grayscale(1)"; //清明节去色
        return;
      } //No.5 判断 五一

      if (wuyiList.includes(sortToday)) {
        this.alertHolidayMessage(holidayConfig.wuyi);
        this.currentThemeName = "jieri-theme";
        document.querySelector("#jieri").className = "active";
        return;
      } //No.6 判断端午

      if (duanyuList.includes(fullToday)) {
        this.alertHolidayMessage(holidayConfig.duanyu);
        this.currentThemeName = "jieri-theme";
        document.querySelector("#jieri").className = "active";
        return;
      } //国庆

      if (guoqingList.includes(sortToday)) {
        this.alertHolidayMessage(holidayConfig.guoqing);
        document.querySelector("#jieri").className = "active";
        this.currentThemeName = "jieri-theme";
        return;
      } //No.7 判断中秋
      if (zhongqiuList.includes(fullToday)) {
        this.alertHolidayMessage(holidayConfig.zhongqiu);
        document.querySelector("#jieri").className = "active";
        this.currentThemeName = "jieri-theme";
        return;
      } //No.8 判断3.8妇女

      if (sanbaList.includes(sortToday)) {
        this.alertHolidayMessage(holidayConfig.sanba);
        return;
      }
    }
  },
  computed: {
    isShowMenu() {
      let arr = JSON.parse(JSON.stringify(this.navList));
      if (this.$store.state.isLogin) {
        return arr.map(item => {
          item.isShow = true;
          return item;
        });
      } else {
        return arr.filter(item => item.isShow);
      }
    },
    getUserInfo() {
      return {
        nick: this.$store.state.nick,
        name: this.$store.state.token,
        isLogin: this.$store.state.isLogin
      };
    },
    getIsLogin() {
      return this.$store.state.isLogin;
    },
    getNick() {
      return this.$store.state.nick;
    }
  },
  mounted() {
    this.currentThemeName = localStorage.getItem("theme") || "success-theme";
    this.checkTodayIsHoliday();
    console.log("%c版权所有：邵预鸿", "font-size:15px;color:red");
    console.log(
      "%c网址使用nuxt+element搭建，仅供个人笔记使用，联系方式:1045749725@qq.com",
      "font-size:13px;color:red"
    );

    let visited = localStorage.getItem("visited");
    if (!visited) {
      this.visited = false;
      localStorage.setItem("visited", true);
    }
    let topWindow = window.top || "";
    if (topWindow) {
      if (topWindow !== window) {
        let template = `<h1><center>防嵌入!非官方网站，请访问http://www.shaoyuhong.cn</center></h1>`;
        document.body.innerHTML = template;
        topWindow.location.href = "http://www.shaoyuhong.cn";
      }
    } else {
      let template = `<h1><center>防嵌入!非官方网站，请访问http://www.shaoyuhong.cn</center></h1>`;
      document.body.innerHTML = template;
    }
  }
};
</script>

<style scoped lang="less">
.layouts h1{
  margin:0;
}
.copyright {
  text-align: center;
  line-height: 1.5;
  font-size: 15px;
  color: #797777;
  margin-top: 20px;
  background-color: #f5f5f5;
  padding: 10px 0;
}
#jieri {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: url("../assets/img/jieri.png") repeat;
  background-position: 0 0;
  background-size: 500px 375px;
  z-index: 10000;
  pointer-events: none;
  display: none;
}
#jieri.active {
  animation: jieri1 20s infinite linear;
  display: block;
}
@keyframes jieri1 {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 500px -375px;
  }
}
.exit {
  margin-left: 10px;
  cursor: pointer;
}
.inline {
  display: inline-block;
}
.layouts /deep/ span.el-dropdown-link.reset-default-header-dropdown:focus {
  outline: none;
}

@keyframes toplineMove {
  0% {
    transform: translateX(-1000px) rotate(850deg);
    opacity: 0;
  }

  15%,
  80% {
    transform: translateX(0) rotate(0deg);
    opacity: 1;
  }

  100% {
    transform: translateX(1000px);
    opacity: 0;
  }
}

@keyframes bottomlineMove {
  0% {
    transform: translateX(1000px) rotate(-850deg);
    opacity: 0;
  }

  15%,
  80% {
    transform: translateX(0) rotate(0deg);
    opacity: 1;
  }

  100% {
    transform: translateX(-1000px);
    opacity: 0;
  }
}
@keyframes leftlineMove {
  0% {
    opacity: 0;
    transform: translateY(-1000px) rotate(850deg);
  }

  15%,
  80% {
    opacity: 1;
    transform: translateY(0) rotate(0deg);
  }

  100% {
    opacity: 0;
    transform: translateY(-1000px);
  }
}
@keyframes rightlineMove {
  0% {
    opacity: 0;
    transform: translateY(1000px) rotate(-850deg);
  }

  15%,
  80% {
    opacity: 1;
    transform: translateY(0) rotate(0deg);
  }

  100% {
    opacity: 0;
    transform: translateY(1000px);
  }
}

@keyframes photoFade {
  0% {
    transform: translateY(100px) rotate(360deg);
    opacity: 0;
  }

  15%,
  80% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }

  100% {
    transform: translateY(-100px) rotate(-360deg);
    opacity: 0;
  }
}

@keyframes textChange {
  0% {
    opacity: 0;
    transform: skew(15deg) translateY(50px);
  }

  8% {
    transform: skew(-15deg) translateY(50px);
  }

  15%,
  80% {
    opacity: 1;
    transform: skew(0deg) translateY(0px);
  }

  90%,
  100% {
    opacity: 0;
    transform: skew(15deg) translateY(-50px);
  }
}

@keyframes boxChange {
  0% {
    opacity: 0;
    transform: translate(0px, 0px);
  }

  4%,
  95% {
    opacity: 1;
  }

  99% {
    opacity: 0;
    transform: translate(0px, 0px);
  }

  100% {
    opacity: 0;
    display: none;
    transform: translate(-1000px, -1000px);
  }
}

.welcome-box {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 10001;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-width: 1200px;
  opacity: 0;
  transform: translateY(-1000px, -1000px);

  &.first-look {
    animation: boxChange 13s 1;
    animation-fill-mode: forwards;

    .text h3 {
      img {
        animation: photoFade 10s 1;
        animation-fill-mode: forwards;
        animation-delay: 2.4s;
      }

      pre {
        animation: textChange 10s 1 cubic-bezier(0.58, 1.5, 0.57, 0.74);
        animation-fill-mode: forwards;
        animation-delay: 2.6s;
      }
    }
    .top-line {
      animation: toplineMove 10s 1;
      animation-delay: 2s;
      animation-fill-mode: forwards;
    }
    .bottom-line {
      animation: bottomlineMove 10s 1;
      animation-fill-mode: forwards;
      animation-delay: 2.25s;
    }
    .left-line {
      animation: leftlineMove 10s 1;
      animation-delay: 2.25s;
      animation-fill-mode: forwards;
    }
    .right-line {
      animation: rightlineMove 10s 1;
      animation-delay: 2.5s;
      animation-fill-mode: forwards;
    }
  }

  .welcome-content {
    width: 1200px;
    text-align: center;
    position: relative;
    color: #fff;
    .top-line {
      position: absolute;
      left: 0;
      top: 0;
      width: 600px;
      height: 2px;
      background-color: #fff;
      border-radius: 2px 0 0 2px;
      transform: translateX(-1000px);
      opacity: 0;

      &:after {
        content: "";
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #fff;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -10px;
      }
    }

    .text {
      padding: 80px 0 80px 0;

      h3 {
        font-size: 48px;

        img {
          display: block;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          margin: 0 auto 20px;
          transform: translateY(100px) rotate(360deg);
          opacity: 0;
        }

        pre {
          font-size: inherit;
          opacity: 0;
          transform: skew(15deg) translateY(50px);
        }
      }
    }

    .bottom-line {
      position: absolute;
      right: 0;
      width: 600px;
      height: 2px;
      background-color: #fff;
      border-radius: 0 2px 2px 0;
      transform: translateX(1000px);
      opacity: 0;

      &:after {
        content: "";
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #fff;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -10px;
      }
    }

    .left-line {
      position: absolute;
      left: 300px;
      bottom: 0;
      height: 600px;
      width: 2px;
      background-color: #fff;
      border-radius: 0 2px 2px 0;
      opacity: 0;
      transform: translateY(-1000px);
      &:after {
        content: "";
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #fff;
        position: absolute;
        left: 0;
        bottom: 0;
        margin-left: -10px;
      }
    }
    .right-line {
      position: absolute;
      right: 300px;
      top: 0;
      height: 600px;
      width: 2px;
      background-color: #fff;
      border-radius: 0 2px 2px 0;
      opacity: 0;
      transform: translateY(1000px);

      &:after {
        content: "";
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #fff;
        position: absolute;
        left: 0;
        top: 0;
        margin-left: -10px;
      }
    }
  }
}
</style>