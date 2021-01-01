<template>
  <div class="way">
    <BrandNav :list="['首页','行走路途']" />
    <div class="video-box">
      <div class="new-video-box">
        <h3>最近上传</h3>
        <ul class="new-video-list">
          <li v-for="(item,index) in newList" :key="index" >
            <div class="item-box new-video">
              <iframe
                :src="item.url"
                scrolling="no"
                border="0"
                frameborder="no"
                framespacing="0"
                allowfullscreen="true"
              ></iframe>
            </div>
            <p class="item-title" @click="goDeitals(item.target)">{{item.title}}</p>
            <div class="desc">
              <span>
                <i class="el-icon-date"></i>
                {{item.create_time}}
              </span>
              <span>
                <!--  <i class="el-icon-view"></i>播放量 -->
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div class="all-video-box">
        <h3>全部视频</h3>
        <ul class="all-video-list">
          <li v-for="(item,index) in allList" :key="index">
            <div class="item-box new-video">
              <iframe
                :src="item.url"
                scrolling="no"
                border="0"
                frameborder="no"
                framespacing="0"
                allowfullscreen="true"
              ></iframe>
            </div>
            <p class="item-title" @click="goDeitals(item.target)">{{item.title}}</p>
            <div class="desc">
              <span>
                <i class="el-icon-date"></i>
                {{item.create_time}}
              </span>
              <span>
                <!--  <i class="el-icon-view"></i>播放量 -->
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import seoConfig from "@/assets/seoConfig";
import { get } from "@/libs/axios";
import { findVideo } from "@/api";
export default {
  name: "way",
  transition: "fade",
  data() {
    return {
      newList: [],
      allList: [],
    };
  },
  async asyncData() {
    const typeListData = await get(findVideo);
    let list = typeListData.data.list;
    let newList = list.slice(0, 3);
    let allList = list.slice(3);
    return {
      newList,
      allList,
    };
  },
  methods: {
    //计算高度
    computeVideoHeight() {
      let newVideo = document.querySelectorAll(".new-video");
     /*  let newVideoHeight =
        newVideo.length > 0
          ? parseInt((newVideo[0].offsetWidth / 16) * 9) + "px"
          : "300px"; */
      for (var i = 0; i < newVideo.length; i++) {
        newVideo[i].style.height = parseInt(newVideo[i].offsetWidth / 16 *9 )+"px";
      }
    },
    goDeitals(target){
      if(target){
        window.open(target)
      }
    }
  },
  mounted() {
    this.computeVideoHeight(); //计算视频高度
    window.addEventListener("resize", () => {
      this.computeVideoHeight(); //计算视频高度
    });
  },
  head() {
    return {
      title: "邵预鸿|我们一直在旅行",
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: "邵预鸿,旅行日记,旅行视频,自驾游,shao.yuhong,shaoyuong,我们一直在旅行,行走旅途",
        },
        {
          hid: "description",
          name: "description",
          content:
            "邵预鸿-我们一直在旅行，一直在等待某个人可以成为我们旅途的伴侣，陪我们走过一段别人无法替代的记忆。在那里，有我们特有的记忆，亲情之忆、友谊之花、爱情之树、以及遗憾之泪!",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
h3 {
  font-size: 22px;
  color: #333;
  box-sizing: border-box;
  position: relative;
  padding-left: 10px;
  font-weight: 500;
  &:before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 100%;
    background-color: #e01109;
  }
}
.over {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.video-box {
  margin-top:20px;
  .new-video-box,
  .all-video-box {
    .new-video-list,
    .all-video-list {
      margin-top: 20px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      li {
        cursor: pointer;
        flex: 1;
        vertical-align: top;
        max-width: calc((100% - 40px) / 3);
        box-shadow: 0 0 2px #c1c1c1;
        &:not(:last-child) {
          margin-right: 20px;
        }
      }
      .item-box {
        width: 100%;
        height: 320px;
        margin: 0 auto;
        position: relative;
        box-sizing: border-box;
        background-color: #eee;
        /deep/ iframe {
          width: 100%;
          height: 100%;
        }
        &:after {
          content: "";
          display: block;
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 3;
          pointer-events: none;
          transition: all 0.5s;
          background-color: rgba(0, 0, 0, 0);
        }
        & > img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .item-title {
        line-height: 1.5;
        .over;
        font-size: 16px;
        color: #525254;
        padding: 10px 15px 0;
        box-sizing: border-box;
        &:hover{
          color: #e01109;
        }
      }
      .desc {
        display: table;
        width: 100%;
        margin-top: 5px;
        padding: 0 15px 20px;
        box-sizing: border-box;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        & > span {
          display: table-cell;
          font-size: 14px;
          color: #9e9e9e;
          width: 50%;
          i {
            margin-right: 5px;
          }
        }
        & > span:first-child {
          text-align: left;
        }
        & > span:last-child {
          text-align: right;
        }
      }
    }
  }
  .all-video-box {
    margin-top: 20px;
    .all-video-list {
      flex-wrap: wrap;
      li {
        flex: 1 0 21%;
        margin-bottom: 20px;
        margin-right: 15px;
        max-width: calc((100% - 60px) / 4);
        &:nth-of-type(4n) {
          margin-right: 0;
        }
        .img-box {
          width: 100%;
          height: 240px;
        }
      }
    }
  }
}
</style>