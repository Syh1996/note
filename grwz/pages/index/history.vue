<template>
  <div class="history">
    <BrandNav :list="['首页', '历史今日']" />
    <ul class="history-list">
      <li v-for="(item, index) in tableData" :key="index">
        <div class="line-bar" v-if="index % 2 === 0">{{ item.year }}</div>
        <div class="msg-bar">
          <p class="item-title">{{ item.title }}</p>
          <p class="item-desc">{{ item.des }}</p>
          <img v-if="item.pic" :src="item.pic" />
        </div>
        <div class="line-bar" v-if="index % 2 !== 0">{{ item.year }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import seoConfig from "@/assets/seoConfig";
import { getTodayEvent } from "@/api";
import { get, post } from "@/libs/axios";
const jsonp = require("jsonp");
export default {
  name: "history",
  transition: "fade",
  data() {
    return {
      tableData: [],
    };
  },
  head() {
    /*  const desc = this.tableData[0].title; */
    const desc = "今日历史事件";
    return {
      title: "邵预鸿|" + desc,
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: seoConfig.keyWords,
        },
        {
          hid: "description",
          name: "description",
          content: "邵预鸿-今日历史,查询历史大事件|" + desc,
        },
      ],
    };
  },
  async asyncData() {},
  created() {},
  async mounted() {
    let now = new Date();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let that = this;
    jsonp(
      "https://www.shaoyuhong.cn/grzx/getTodayEvent.php/set_session_jsonp?month=" +
        month +
        "&day=" +
        day +
        "&callback=callback",
      null,
      (err, data) => {
        if (err) {
          console.error(err.message);
        } else {
          let result = JSON.parse(data);
          that.tableData = result.result;
        }
      }
    );
  },
};
</script>

<style scoped lang="less">
@color1: #46b2bc;
@color2: #ea3c14;
@color3: #8cc63e;
@color4: #f99324;
@color5: #0071bd;
@opacityColor1: #65c7d0;
@opacityColor2: #ef5720;
@opacityColor3: #6caf29;
@opacityColor4: #fbb03b;
@opacityColor5: #0050a3;
.history-list {
  max-width: 1400px;
  margin: 40px auto 0;
  li {
    min-height: 200px;
    display: table;
    width: 100%;
    position: relative;
    .line-bar,
    .msg-bar {
      display: table-cell;
      max-width: 50%;
      width: 50%;
      vertical-align: middle;
    }
    .msg-bar {
      padding: 40px 5%;
      box-sizing: border-box;
      & > img {
        display: block;
        width: 240px;
        margin-top: 10px;
      }
      .item-title {
        font-size: 22px;
        font-weight: 600;
        letter-spacing: 1px;
        color: inherit;
        margin-bottom: 5px;
      }
      .item-desc {
        margin-top: 8px;
        font-size: 15px;
        letter-spacing: 1px;
        color: #909090;
        line-height: 1.4;
      }
    }
    .line-bar {
      border-style: solid;
      border-width: 30px;
      height: 100%;
      position: relative;
      text-align: left;
      color: #65c7d0;
      font-size: 50px;
      font-weight: 600;
      padding-left: 10%;
      box-sizing: border-box;
      vertical-align: middle;
      &:before {
        content: "";
        display: block;
        width: calc(100% + 15px);
        height: calc(100% + 30px);
        border-style: solid;
        border-width: 15px;
        position: absolute;
        top: -15px;
        box-sizing: border-box;
      }
    }
    &:not(:first-child) {
      margin-top: -30px;
    }
    &:first-child,
    &:last-child {
      .line-bar {
        &:after {
          content: "";
          display: block;
          width: 40px;
          height: 40px;
          background-color: #e7e7e7;
          border: 10px solid #303334;
          position: absolute;
          box-sizing: border-box;
          z-index: 3;
          border-radius: 50%;
        }
      }
    }
    &:first-child {
      .line-bar {
        &:after {
          right: -20px;
          top: -35px;
        }
      }
    }
    &:nth-of-type(2n + 1):last-child {
      .line-bar {
        &:after {
          right: -20px;
          bottom: -35px;
        }
      }
    }
    &:nth-of-type(2n):last-child {
      .line-bar {
        &:after {
          left: -20px;
          bottom: -35px;
        }
      }
    }

    &:nth-of-type(2n + 1) {
      .line-bar {
        border-radius: 120px 0 0 120px;
        border-right: 0;
        &:before {
          border-radius: 120px 0 0 120px;
          border-right: 0;
          left: -15px;
        }
      }
    }
    &:nth-of-type(2n) {
      .line-bar {
        border-left: none;
        border-radius: 0 120px 120px 0;
        text-align: right;
        padding-right: 10%;
        &:before {
          border-radius: 0 120px 120px 0;
          border-left: none;
          left: 0;
        }
      }
    }
    &:nth-of-type(5n + 1) {
      color: @color1;
      .line-bar {
        color: @color1;
        border-color: @color1;
        &:before {
          border-color: @opacityColor1;
        }
      }
    }
    &:nth-of-type(5n + 2) {
      color: @color2;
      .line-bar {
        color: @color2;
        border-color: @color2;
        &:before {
          border-color: @opacityColor2;
        }
      }
    }
    &:nth-of-type(5n + 3) {
      color: @color3;
      .line-bar {
        color: @color3;
        border-color: @color3;
        &:before {
          border-color: @opacityColor3;
        }
      }
    }
    &:nth-of-type(5n + 4) {
      color: @color4;
      .line-bar {
        color: @color4;
        border-color: @color4;
        &:before {
          border-color: @opacityColor4;
        }
      }
    }
    &:nth-of-type(5n + 5) {
      color: @color5;
      .line-bar {
        color: @color5;
        border-color: @color5;
        &:before {
          border-color: @opacityColor5;
        }
      }
    }
  }
}
</style>