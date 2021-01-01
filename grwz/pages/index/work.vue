<template>
  <div class="work">
    <BrandNav :list="['首页', '职业生涯']" />
    <div class="time-line-box">
      <!--时间轴开始 开始时间-->
      <div class="start-time">{{ endYear }}</div>

      <!--时间轴列表  -->
      <ul class="time-line-list">
        <li v-for="(item, index) in workList" :key="index">
          <div class="work-item">
            <div class="company-info">
              <div class="company-logo">
                <img :src="item.company_logo" />
              </div>
              <div class="join-info">
                <p class="company-name">{{ item.company_name }}</p>
                <p class="join-time">{{ item.join_time }}</p>
              </div>
            </div>
            <div class="company-message">
              <p>
                {{ item.desc }}
              </p>
              <video v-if="item.mp4_url" :src="item.mp4_url" controls></video>
            </div>
          </div>
        </li>
      </ul>
      <!--时间轴结束 结束时间-->
      <div class="end-time">2018</div>
    </div>
  </div>
</template>

<script>
import seoConfig from "~/assets/seoConfig";
import { findWorkList } from '@/api';
import {  get } from '@/libs/axios';
export default {
  name: "work",
  transition: "fade",
  data() {
    return {
      endYear: new Date().getFullYear(),
      workList: [],
    };
  },
  async asyncData() {
    const workList = await get(findWorkList);
    return {
      workList: workList.data.list,
    };
  },
  head() {
    return {
      title: "邵预鸿-职业生涯记录|中兴通讯",
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: "邵预鸿-职业生涯记录|中兴通讯,邵预鸿-职业生涯记录|重庆软江科技,邵预鸿-职业生涯记录|北京959品牌商机网",
        },
        {
          hid: "description",
          name: "description",
          content:
            "邵预鸿-职业生涯记录|中兴通讯|重庆软江科技有限公司|北京959品牌商机网,2020.8加入中兴通讯重庆研究所,担任云技术研发岗位",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
@color1: #03a9f4;
@left: 150px;
.time-line-box {
  width: 100%;
  position: relative;
  margin-top: 40px;
  .time-line-list {
    position: relative;
    & > li {
      width: 50%;
      position: relative;
      box-sizing: border-box;
      &:before {
        content: "";
        display: block;
        width: 20px;
        height: 20px;
        background-color: @color1;
        position: absolute;
        top: 50%;
        margin-top: -20px;
        border-radius: 50%;
        z-index: 2;
      }
      &:after {
        content: "";
        width: @left;
        height: 0;
        border-bottom: 1px dashed #9e9c9c;
        position: absolute;
        top: 50%;
        margin-top: -11px;
        z-index: 1;
      }
      &:nth-of-type(2n) {
        margin-left: 50%;
        border-left: 4px solid @color1;
        position: relative;
        left: -2px;
        text-align: left;
        padding-left: @left;
        box-sizing: border-box;
        &:before {
          left: -12px;
        }
        &:after {
          left: 0;
        }
      }
      &:nth-of-type(2n + 1) {
        border-right: 4px solid @color1;
        position: relative;
        left: 2px;
        text-align: right;
        padding-right: @left;
        box-sizing: border-box;
        &::before {
          right: -12px;
        }
        &:after {
          right: 0;
        }
      }
      .work-item {
        min-height: 200px;
        width: 80%;
        display: inline-block;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        padding: 20px;
        box-sizing: border-box;
        text-align: left;
        video {
          display: block;
          object-fit: fill;
          width: 100%;
          margin-top: 20px;
        }
      }
      .company-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .company-logo {
          flex: 0 0 60px;
          text-align: center;
          margin-right: 20px;
          & > img {
            width: 60px;
            display: inline-block;
          }
        }
        .join-info {
          flex: 1;
          .company-name {
            color: #337ab7;
            font-size: 16px;
          }
          .join-time {
            color: #777;
            font-size: 14px;
            margin-top: 5px;
          }
        }
      }
      .company-message {
        font-size: 17px;
        color: #777;
        text-align: justify;
        margin-top: 8px;
        line-height: 1.5;
      }
    }
  }
  .start-time,
  .end-time {
    width: 80px;
    height: 80px;
    border-radius: 40px;
    background-color: @color1;
    color: #fff;
    line-height: 80px;
    text-align: center;
    display: block;
    margin: 0 auto;
    font-size: 22px;
  }
}
</style>