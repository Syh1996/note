<template>
  <div class="about">
    <BrandNav :list="['首页','关于我']" />
    <tagsCloud :useArray="useArray" :boxWidth="boxWidth" :speed="boxWidth" :randomColor="true"></tagsCloud>
    <div class="tag-list">
      <div class="tag-item syh-pic1">2018.6.22第一份实习工作距离今天我已经加入前端共{{joinWebDay}}天啦!</div>
      <div class="tag-item syh-pic2">喜好航拍旅行，到今天我已经拍摄许多条视频；虽然不高大上，但总归是回忆</div>
      <div class="tag-item syh-pic2">重庆师范大学毕业，因为兴趣选择前端</div>
      <div class="tag-item syh-pic3">经验总结，记录每一个问题，不断打磨，择善而从</div>
      <div class="tag-item syh-pic3">不轻言放弃，只要想做，摸爬滚打不撞南墙不回头</div>
      <div class="tag-item syh-pic1">撸猫狗人士，期待某一天，一套房、一辆车、一条博美；如此其乐融融</div>
      <div class="tag-item syh-pic2">路漫漫其修远兮，吾将上下而索；一个爱捣腾的96青年</div>
    </div>
        <div class="rotate-circle-box">
      <div class="rotate-circle">
         <div class="dot"></div>
      </div>
    </div>
  </div>
</template>

<script>
import tagsCloud from "../../components/tagsCloud";
import { get, post } from "~/libs/axios";
import seoConfig from "~/assets/seoConfig/index";
import { getTypeList, sendNoteItem } from "~/api";
export default {
  name: "about",
  data() {
    return {
      boxWidth: 760,
      useArray: [],
      joinWebDay:0,
    };
  },
  created(){
     let joinTime = new Date("2018-6-22 0:0:0").getTime();
     let now = Date.now();
     let day = parseInt( parseInt((now - joinTime) / 24/60/60/1000) );
     this.joinWebDay = day;

  },
  head() {
    const desc = "关于我";
    return {
      title: "邵预鸿-学习笔记|生活笔记|经验分享|开发问题|面试题笔记" + desc,
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: "关于我,邵预鸿,axios,html,vue,react"
        },
        {
          hid: "description",
          name: "description",
          content:
            "邵预鸿-学习笔记|生活笔记|经验分享|开发问题|面试题笔记" + desc
        }
      ]
    };
  },
  async asyncData() {
    const typeList = await get(getTypeList, {});
    let list = typeList.data.list;
    let arr = Array.from(list, (item, index) => {
      return { name: item.type_name, url: item.type_name };
    }).filter(item => !["全部", "面试题", "个人笔记"].includes(item.name));
    let customTag = [
      "95后",
      "本科",
      "重师大",
      "中兴员工",
      "航拍",
      "摄影",
      "花草",
      "骑行",
      "自驾游",
      "坚持",
      "撸猫狗",
      "jquery",
      "移动端"
    ];
    customTag = [...customTag, ...customTag].map(item => {
      return {
        name: item,
        url: item
      };
    });
    arr = arr.concat(customTag).sort(function(a, b) {
      return Math.random() > 0.5 ? -1 : 1;
    });
    return {
      useArray: arr
    };
  },
  mounted() {
    /* this.boxWidth = parseInt(window.height * 0.6); */
    document.querySelector("#bgCanvas").style.visibility = "hidden";
  },
  destroyed() {
    document.querySelector("#bgCanvas").style.visibility = "visible";
  },
  components: {
    tagsCloud
  }
};
</script>

<style scoped lang="less">
@keyframes toLeftScroll {
  0%,
  100% {
    transform: translateX(2000px);
  }
  50% {
    transform: translateX(-2000px);
    
  }
  51%{
    visibility: hidden;
    transform: translateX(-2000px);
  }

  52% {
    transform: translateX(2000px);
    visibility: hidden;
  }
  56%{
    visibility: visible;
  }
  
}
@keyframes startRotate {
  0% {
    transform: rotateX(70deg) rotateZ(0deg);
/*     box-shadow: 0 0 0 rgba(0,0,0,.3); */
  }
  100% {
    transform: rotateX(70deg) rotateZ(360deg);
/*     box-shadow: 10px 30px 30px rgba(0,0,0,.3); */
  }
}
@keyframes dotChange {
   0%,100%{
     transform: scale(0,0);
     opacity: 0;
   }
   50%{
     transform: scale(1,1);
     opacity: 1;
   }
}
.about {
  background-color: #fff;
  position: relative;
  overflow: hidden;
}
__nuxt /deep/ #bgCanvas {
  display: none !important;
}
.tag-list {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 0;
  height: 100%;
  z-index: 10;
  pointer-events: none;
  .tag-item {
    max-width: 450px;
    min-height: 40px;
    padding: 20px 10px;
    box-sizing: border-box;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    display: inline-block;
    position: absolute;
    padding-left: 60px;
    box-sizing: border-box;
    line-height: 1.3;
    background-color: #fff;
    border-radius: 0 18px 18px 0;
    transform: translateX(2000px);
    animation: toLeftScroll 100s infinite linear;

    &.syh-pic1:before {
      background: url(../../assets/img/shao.yuhong-1.jpg) no-repeat;
      background-size: cover;
      background-position: center;
    }
    &.syh-pic2:before {
      background: url(../../assets/img/shao.yuhong-2.jpg) no-repeat;
      background-size: cover;
      background-position: center;
    }
    &.syh-pic3:before {
      background: url(../../assets/img/shao.yuhong-3.jpg) no-repeat;
      background-size: cover;
      background-position: center;
    }
    &:nth-of-type(1) {
      left: 100px;
      top: 50px;
    }
    &:nth-of-type(2) {
      right: 10px;
      top: 70px;
      animation-delay: -95s;
    }
    &:nth-of-type(3) {
      top: 250px;
      left: 30px;
      animation-delay: -90s;
    }
    &:nth-of-type(4) {
      top: 300px;
      right: 0px;
      animation-delay: -85s;
    }
    &:nth-of-type(5) {
      top: 420px;
      left: 70px;
      animation-delay: -80s;
    }
    &:nth-of-type(6) {
      right: 20px;
      top: 500px;
      animation-delay: -75s;
    }
    &:nth-of-type(7) {
      bottom: 100px;
      left: 80px;
      animation-delay: -70s;
    }
    &::before {
      content: "";
      display: block;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 1px solid #ddd;
      position: absolute;
      left: -40px;
      top: 50%;
      margin-top: -40px;
      background-color: #fff;
    }
  }
}
.rotate-circle-box {
  transform-style: preserve-3d;
  perspective: 700px;
  /* perspective-origin: top center; */
  .rotate-circle {
    width: 700px;
    height: 700px;
    position: absolute;
    left: 50%;
    margin-left: -350px;
    bottom: -280px;
    transform: rotateX(60deg) rotateZ(0deg);
    background: url(../../assets/img/circle-jiantou.png) no-repeat;
    background-position: center center;
    background-size: 600px auto;
    z-index: 10;
    pointer-events: none;
    border-radius: 50%;
    animation: startRotate 10s infinite linear;
    .dot{
      width: 80px;
      height: 80px;
      background-color: #f7f7f7;
      border-radius: 50%;
      position: absolute;
      left:50%;
      top:50%;
      margin-left: -40px;
      margin-top: -40px;
      animation: dotChange 5s infinite ;
    }
  }
}
</style>
