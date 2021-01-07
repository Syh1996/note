<template>
  <div class="rili-box">
    <BrandNav
      :list="[
        '首页',
        year + '年日历,今天距' + year + '-12-31年底剩余' + endDayNumber + '天',
      ]"
    />
    <div class="calendar">
      <div
        class="calendar-item"
        v-for="(monthArr, monthIndex) in jiriList"
        :key="monthIndex"
      >
        <ul class="date-list">
          <li
            class="week-title"
            v-for="(week, index) in weekList"
            :key="'week' + index"
          >
            {{ week }}
          </li>
          <li
            v-for="day in monthArr"
            :class="[day.date === today ? 'current-day' : '', 'week-day']"
            :key="day.day || Math.random()"
            @click="getCheckDayDetails(day)"
          >
            <div class="table-cell" v-if="day.day">
              <p class="date-number">{{ day.day }}</p>
              <p class="date-holiday">{{ day.holiday }}</p>
            </div>
          </li>
        </ul>
        <div class="month-bg">{{ monthIndex + 1 }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { get } from "@/libs/axios";
import { getCurrentDetails } from "@/api";
const holidayList = [
  {
    date: "1-1",
    name: "元旦节",
  },
  {
    date: "1-2",
    name: "休",
  },
  {
    date: "1-3",
    name: "休",
  },
  {
    date: "2-14",
    name: "情人节",
  },
  {
    date: "3-8",
    name: "妇女节",
  },
  {
    date: "3-12",
    name: "植树节",
  },
  {
    date: "3-15",
    name: "消费日",
  },
  {
    date: "4-1",
    name: "愚人节",
  },
  {
    date: "4-5",
    name: "清明节",
  },
  {
    date: "4-20",
    name: "谷雨",
  },
  {
    date: "5-1",
    name: "劳动节",
  },
  {
    date: "5-2",
    name: "休",
  },
  {
    date: "5-3",
    name: "休",
  },
  {
    date: "5-4",
    name: "青年节",
  },
  {
    date: "5-6",
    name: "立夏",
  },
  {
    date: "5-12",
    name: "512地震",
  },
  {
    date: "5-21",
    name: "小满",
  },
  {
    date: "6-1",
    name: "儿童节",
  },
  {
    date: "6-5",
    name: "环境日",
  },
  {
    date: "6-6",
    name: "芒种",
  },
  {
    date: "6-7",
    name: "高考",
  },
  {
    date: "6-22",
    name: "夏至",
  },
  {
    date: "7-1",
    name: "香港回归",
  },
  {
    date: "7-23",
    name: "大暑",
  },
  {
    date: "7-29",
    name: "火把节",
  },
  {
    date: "8-1",
    name: "建军节",
  },
  {
    date: "8-8",
    name: "立秋",
  },
  {
    date: "8-23",
    name: "处暑",
  },
  {
    date: "9-8",
    name: "白露",
  },
  {
    date: "9-10",
    name: "教师节",
  },
  {
    date: "9-27",
    name: "世界旅游",
  },
  {
    date: "10-1",
    name: "国庆节",
  },
  {
    date: "10-2",
    name: "休",
  },
  {
    date: "10-3",
    name: "休",
  },
  {
    date: "10-4",
    name: "休",
  },
  {
    date: "10-5",
    name: "休",
  },
  {
    date: "10-6",
    name: "休",
  },
  {
    date: "10-7",
    name: "休",
  },
  {
    date: "10-8",
    name: "寒露",
  },
  {
    date: "10-24",
    name: "程序员节",
  },
  {
    date: "11-1",
    name: "万圣节",
  },
  {
    date: "11-8",
    name: "立冬",
  },
  {
    date: "11-11",
    name: "买买买",
  },
  {
    date: "11-22",
    name: "小雪",
  },
  {
    date: "11-26",
    name: "感恩节",
  },
  {
    date: "12-7",
    name: "大雪",
  },
  {
    date: "12-20",
    name: "澳门回归",
  },
  {
    date: "12-22",
    name: "冬至",
  },
  {
    date: "12-24",
    name: "平安夜",
  },
  {
    date: "12-25",
    name: "圣诞节",
  },
];
export default {
  name: "rili",
  data() {
    return {
      weekList: ["一", "二", "三", "四", "五", "六", "日"],
      monthDayList: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      jiriList: new Array(12).fill(new Array(30).fill({ date: "" })),
      today: "",
      year: "",
      endDayNumber: 0,
      isLoad: false, //日历请示是否正在加载中
    };
  },
  head() {
    return {
      title: `邵预鸿-自己的日历`,
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: `邵预鸿-自己做的日历`,
        },
        {
          hid: "description",
          name: "description",
          content: `邵预鸿-自定义日历`,
        },
      ],
    };
  },
  created() {
    this.isRuiNian();
    this.setToday();
  },
  methods: {
    //获取今天的详细信息
    async getCheckDayDetails(opt) {
      let value = opt.date;
      if (!value || this.isLoad) {
        return;
      }
      this.isLoad = true;
      let now = new Date();
      let date = `${now.getFullYear()}-${value}`;
      const result = await get(getCurrentDetails, { date });
      let {
        reason,
        result: { data },
      } = result.data;
      if (reason === "Success") {
        let message = `
        <div class="notify-item">  <span class="notify-label">当前：</span><span class="notify-message">${
          data.date
        }</span></div>
        <div class="notify-item"> <span class="notify-label">农历：</span><span class="notify-message">${
          data.lunarYear
        }${data.lunar}，${data.weekday}；</span>
</div>
        <div class="notify-item">  <span class="notify-label">宜：</span><span class="notify-message">${
          data.suit || "无"
        }</span> 
</div>
        <div class="notify-item"> <span class="notify-label">忌：</span><span class="notify-message">${
          data.avoid || "无"
        }</span>
</div>
<div class="notify-item"> <span class="notify-label">备注：</span><span class="notify-message">${
          data.desc || "无"
        }</span>
</div>
      
        
        `;
        this.$notify({
          title: "日期详情",
          message,
          duration: 8000,
          dangerouslyUseHTMLString: true,
        });
      }
      this.isLoad = false;
    },
    //设置今天日期
    setToday() {
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      this.endDayNumber = Math.ceil(
        (new Date(year + "-12-31 23:59:59").getTime() - Date.now()) /
          1000 /
          60 /
          60 /
          24
      );
      this.year = year;
      this.today = month + "-" + day;
      this.getCheckDayDetails({ date: this.today });
    },
    //判断是否闰年
    isRuiNian() {
      let year = new Date().getFullYear();
      if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
        //闰年
        this.monthDayList[1] = 29;
      }
      this.jiriList = this.monthDayList.map((item, index) => {
        // item 为每月的天数
        let arr = [];
        for (let i = 1; i <= item; i++) {
          let result = holidayList.find(
            (item) => item.date === `${index + 1}-${i}`
          );
          let obj = {};
          let date = `${index + 1}-${i}`;
          obj["date"] = date;
          obj["day"] = i;
          obj["holiday"] = result ? result.name : "";
          arr[i - 1] = obj;
        }

        let year = new Date().getFullYear();
        let getWeek = new Date(`${year}-${index + 1}-1`).getDay(); //当前星期几 0-6
        let addEmptyNumber = 0;
        if (getWeek === 0) {
          addEmptyNumber = 6;
        } else {
          addEmptyNumber = getWeek - 1;
        }
        if (addEmptyNumber != 0) {
          arr.unshift(...new Array(addEmptyNumber).fill({ date: "" }));
        }
        return arr;
      });
    },
    //生成背景图
    madeBackgroud() {
      let madeBackgroud = document.querySelector("#made-background");
      if (!madeBackgroud) {
        let oCanvas = document.createElement("canvas");
        oCanvas.width = 400;
        oCanvas.height = 400;
        oCanvas.id = "made-background";
        oCanvas.style.cssText = "position:fixed;top:-1000px;left:-1000px;";
        let body = document.body;
        body.appendChild(oCanvas);
      }
      let oCanvas = document.querySelector("#made-background");
      let ctx=oCanvas.getContext("2d");
      let now = new Date();
      let year = now.getFullYear();
      ctx.clearRect(0,0,400,400);
      ctx.fillStyle="#efefef";
      ctx.textAlign="center"; 
      ctx.font="50px Arial";
      ctx.rotate(-45*Math.PI/180);
      ctx.fillText(`${year}年`,20,300);
      let base64 = oCanvas.toDataURL("image/png");
      document.querySelector(".rili-box").style.backgroundImage = `url(${base64})`;
    },
  },

  mounted() {
    let currentDayBar = document.querySelector(".current-day").parentNode
      .parentNode;
    let offsetTop = currentDayBar.offsetTop;
    document.querySelector(".el-main").scrollTop = offsetTop - 80;
    this.madeBackgroud();
  },
};
</script>
<style scoped lang="less">
.rili-box {
  text-align: center;

  .calendar {
    width: 1200px;
    margin: 20px auto 0;
    display: inline-block;
    &:after {
      content: "";
      display: block;
      clear: both;
    }
    .calendar-item {
      width: 550px;
      vertical-align: top;
      margin-bottom: 20px;
      float: left;
      box-sizing: border-box;
      padding: 15px;
      position: relative;
      .month-bg {
        position: absolute;
        z-index: 2;
        color: #f7f7f7;
        height: 240px;
        line-height: 240px;
        left: 0;
        right: 0;
        text-align: center;
        font-size: 200px;
        top: 50%;
        margin-top: -120px;
      }
      &:nth-of-type(2n + 1) {
        margin-right: 60px;
      }
      .date-list:after {
        content: "";
        display: block;
        clear: both;
      }
      .date-list {
        text-align: left;
        position: relative;
        z-index: 3;
        li {
          width: 75px;
          height: 65px;
          padding: 0 10px;
          border: 1px solid #ddd;
          box-sizing: border-box;
          float: left;
          display: table;
          &.week-day:not(:empty) {
            cursor: pointer;
          }
          &.week-day:not(:empty):hover {
            background-color: #efbbbb;
            color: #e02d2d;
            .date-number {
              color: #e02d2d;
            }
          }
          .table-cell {
            display: table-cell;
            vertical-align: middle;
          }
          .date-number {
            font-size: 24px;
            color: #333;
            margin-bottom: 5px;
          }
          .date-holiday {
            text-align: left;
            color: #e02d2d;
            font-size: 13px;
            height: 13px;
          }
          &:not(:nth-of-type(7n + 1)) {
            margin-left: -1px;
          }
          &:not(:nth-of-type(-n + 7)) {
            margin-top: -1px;
          }
          &.current-day {
            color: #e02d2d;
            background-color: #efbbbb;
            .date-number {
              color: #e02d2d;
            }
          }
          &.week-title {
            height: 40px;
            text-align: center;
            line-height: 38px;
            padding: 0;
          }
        }
      }
    }
  }
}
</style>