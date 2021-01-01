<template>
  <div class="note-list">
    <BrandNav :list="['首页', '笔记列表']" />
    <div class="note-box">
      <div class="note-list-box">
        <ul class="note-list" v-if="noteList.length > 0" v-loading="loading">
          <nuxt-link
            tag="a"
            :to="{
              name: 'index-noteDetails',
              query: { id: item.note_id },
              params: { title: item.title, desc: item.desc },
            }"
            v-for="(item, index) in noteList"
            :key="index"
          >
            <div class="img-box" v-if="item.pic">
              <div
                class="img"
                :style="{ backgroundImage: 'url(' + item.pic + ')' }"
              ></div>
            </div>
            <div class="text-box">
              <h4 class="item-title">{{ item.title }}</h4>
              <h5 class="item-desc">{{ item.desc }}</h5>
              <p class="item-msg-info">
                <span class="item-timer">
                  <i class="el-icon-time"></i>
                  {{ item.create_time }}
                </span>
                <span class="item-author">
                  <i class="el-icon-user"></i>邵预鸿
                </span>
                <span class="item-type">
                  <i class="el-icon-tickets"></i>
                  {{ item.type_name }}
                </span>
                <span class="item-watch-number">
                  <i class="el-icon-view"></i>
                  {{ item.watch }}
                </span>
              </p>
            </div>
            <div class="order-index" v-if="index < 3 && currentPage === 1">
              {{ index + 1 }}
            </div>
          </nuxt-link>
        </ul>
        <div v-else>
          <Empty />
        </div>
        <Pagination
          v-if="noteList.length > 0"
          :currentPage.sync="currentPage"
          :total="total"
          @onLoadNextData="onLoadNextData"
        />
      </div>

      <aside class="note-hot">
        <div class="search-group">
          <input
            type="text"
            placeholder="请输入相关信息"
            v-model="search"
            @keydown.enter="typeFilter"
          />
          <a href="javascript:void(1)" @click="typeFilter">
            <i class="el-icon-search"></i>搜索
          </a>
        </div>
        <div class="type-filter-box">
          <h3>分类筛选</h3>
          <ul class="type-filter-list">
            <li
              v-for="(item, index) in typeList"
              :key="index"
              @click="
                (currentCheckdTypeIndex = index),
                  (filterType = item.type_id),
                  typeFilter()
              "
              :class="currentCheckdTypeIndex === index ? 'active' : ''"
            >
              {{ item.type_name }}
            </li>
          </ul>
        </div>
        <!--点击排行-->
        <div class="click-order">
          <h3>点击排行</h3>
          <ol>
            <li v-for="(item, index) in watchDescList" :key="index">
              <nuxt-link
                tag="a"
                :to="{
                  name: 'index-noteDetails',
                  query: { id: item.id },
                  params: { title: item.title, desc: item.desc },
                }"
              >
                <span class="badge">{{ index + 1 }}</span>
                {{ item.title }}
              </nuxt-link>
            </li>
          </ol>
        </div>
        <div class="new-comment-box">
          <h3>最新留言</h3>
          <ul class="new-comment-list">
            <li v-for="(item, index) in tellmeList" :key="index">
              <span class="from-autor"
                >IP:[{{ item.ip }}]，于{{ item.create_time }}：</span
              >
              {{ item.desc_msg }}
            </li>
          </ul>
        </div>
        <div class="about-me">
          <h3>与我联系</h3>
          <div class="my-info">
            <p>
              <span class="label">微信：</span
              ><span class="value">shaoyh200</span>
            </p>
            <p>
              <span class="label">手机：</span
              ><span class="value">18875025132</span>
            </p>
            <p>
              <span class="label">QQ邮箱：</span
              ><span class="value">1045749725@qq.com</span>
            </p>
            <p>
              <span class="label">企业邮箱：</span
              ><span class="value">shao.yuhong@zte.com.cn</span>
            </p>
            <p>
              <span class="label">Github：</span
              ><span class="value">https://github.com/Syh1996</span>
            </p>
            
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import { get, postAsync, getAsync } from "~/libs/axios";
import { getTellmeList, getTypeList, getNoteList, findClickDesc } from "~/api";
import Pagination from "~/components/Pagination";
import Empty from "~/components/empty";
export default {
  name: "note-list",
  transition: "fade",
  data() {
    return {
      search: "", //搜索内容
      filterType: "", //搜索的分类
      tellmeList: [], //留言列表
      typeList: [], //类型列表
      noteList: [], //笔记列表
      watchDescList: [], //排行列表
      total: 0,
      currentPage: 1,
      currentCheckdTypeIndex: 0, //当前选中的分类下标
      loading: true, //默认加载中
    };
  },
  components: {
    Pagination,
    Empty,
  },
  async asyncData() {
    const tellmeListData = await get(getTellmeList, { page: 1 });
    const typeListData = await get(getTypeList);
    const noteListData = await get(getNoteList, { page: 1 });
    const findClickDescListData = await get(findClickDesc);
    const tellmeList = tellmeListData.data.list;
    const typeList = typeListData.data.list;
    const noteList = noteListData.data.list;
    const watchDescList = findClickDescListData.data.list;
    return {
      tellmeList,
      typeList,
      noteList,
      watchDescList,
    };
  },
  async created() {
    this.loading = true;
    getAsync(getTellmeList, { page: 1 }).then((tellmeListData) => {
      this.tellmeList = tellmeListData.data.list;
    });
    getAsync(getTypeList).then((typeListData) => {
      this.typeList = typeListData.data.list;
    });
    getAsync(getNoteList, { page: this.currentPage }).then((noteListData) => {
      this.total = Number(noteListData.data.total);
      this.noteList = noteListData.data.list;
    });
    getAsync(findClickDesc).then((findClickDescListData) => {
      this.watchDescList = findClickDescListData.data.list;
    });
    this.loading = false; //关闭加载
  },
  methods: {
    /**
     * 打开详情
     * @param { object} item
     */
    goDetails(note_id) {
      this.$router.push({
        name: "index-noteDetails",
        query: {
          id: note_id,
        },
      });
    },

    /**
     * 分类筛选
     * @param { number } id
     */
    typeFilter() {
      this.loading = true;
      this.currentPage = 1;
      let opt = { page: this.currentPage };
      if (this.filterType && this.filterType != 0) {
        opt.type_id = this.filterType;
      }
      if (this.search.toString().length > 0) {
        opt.title = this.search;
      }
      getAsync(getNoteList, opt).then((noteListData) => {
        this.total = Number(noteListData.data.total);
        this.noteList = noteListData.data.list;
      });
      this.loading = false; //关闭加载
    },

    /*加载下一页数据 */
    onLoadNextData() {
      //this.noteList = [];
      this.loading = true; //关闭加载
      document.querySelector(".el-main").scrollTop = 0;
      getAsync(getNoteList, { page: this.currentPage })
        .then((noteListData) => {
          this.total = Number(noteListData.data.total);
          this.noteList = noteListData.data.list;
          this.loading = false; //关闭加载
        })
        .catch((e) => {
          this.loading = false; //关闭加载
        });
    },
  },
};
</script>

<style scoped  lang="less">
.h3 {
  font-size: 18px;
  color: #333;
  box-sizing: border-box;
}
.flex(@align:stretch) {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}
.text-over {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.mt20 {
  margin-top: 20px;
}
.trans(@time) {
  transition: all @time;
}
@c1: #e01109;
.note-box {
  .flex;
  width: 100%;
  padding: 20px 0;
  .note-list-box {
    flex: 1;
  }
  .note-list {
    padding-right: 40px;
    box-sizing: border-box;
    & > a {
      display: block;
      background-color: #fff;
      cursor: pointer;
      overflow: hidden;
      margin-bottom: 20px;
      padding: 20px;
      position: relative;
      border: 1px solid #ddd;
      .flex(center);
      .trans(0.2s);
      .order-index {
        display: block;
        position: absolute;
        right: 10px;
        top: 0;
        width: 20px;
        height: 40px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        line-height: 30px;
        color: #fff;
        background-color: @c1;
        &:after {
          content: "";
          display: block;
          position: absolute;
          bottom: 0;
          left: 50%;
          margin-left: -10px;
          width: 0;
          height: 0;
          border-bottom: 10px solid #fff;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
        }
      }
      &:hover {
        .text-box {
          .item-title {
            color: @c1;
          }
        }
        .img-box {
          .img {
            background-size: auto 120%;
          }
        }
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      }
    }
    .img-box {
      flex: 0 0 160px;
      border: 1px solid #eee;
      .img {
        width: 160px;
        height: 110px;
        background-size: auto 100%;
        background-repeat: no-repeat;
        background-position: center center;
        .trans(0.5s);
      }
    }
    .text-box {
      flex: 1;
      padding-left: 20px;
      .item-title {
        margin: 0 0 4px 0;
        line-height: 1.5;
        .text-over;
        font-size: 18px;
        font-weight: 500;
        max-width: 600px;
      }
      .item-desc {
        overflow: hidden;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        font-size: 14px;
        color: #666;
        font-weight: 500;
        line-height: 1.3;
        margin: 10px 0;
      }
      .item-msg-info {
        font-size: 13px;
        color: #888;
        & > span {
          margin-right: 15px;
          i {
            margin-right: 5px;
          }
        }
        .item-type {
          color: #518f97;
        }
      }
    }
  }
  .note-hot {
    flex: 0 0 420px;
    .search-group {
      font-size: 0;
      .flex;
      & > input {
        border: #ed4040 2px solid;
        border-radius: 5px 0 0 5px;
        overflow: hidden;
        box-sizing: border-box;
        padding-left: 10px;
        height: 36px;
        flex: 1;
        outline: 0;
        font-size: 15px;
        color: #333;
        &::-webkit-input-placeholder {
          transform-origin: left center;
          .trans(0.4s);
        }
        &:focus::-webkit-input-placeholder {
          transform: scale(0.8);
        }
      }
      & > a {
        height: 36px;
        background-color: #ed4040;
        border-radius: 0 5px 5px 0;
        text-align: center;
        line-height: 36px;
        box-sizing: border-box;
        flex: 0 0 80px;
        color: #fff;
        font-size: 15px;
        text-decoration: none;
      }
    }
    .type-filter-box {
      .mt20;
      h3 {
        .h3;
      }
      .type-filter-list {
        padding-top: 15px;
        padding-left: 15px;
        box-sizing: border-box;
        li {
          display: inline-block;
          margin: 5px;
          border: #666 1px solid;
          border-radius: 3px;
          color: #666;
          padding: 5px;
          text-transform: uppercase;
          cursor: pointer;
          .trans(0.2s);
          &.active {
            background-color: @c1;
            color: #fff;
            border-color: @c1;
          }
          &:hover {
            background-color: @c1;
            color: #fff;
            border-color: @c1;
          }
        }
      }
    }
    .new-comment-box {
      .mt20;
      h3 {
        .h3;
      }
      .new-comment-list {
        padding-left: 20px;
        box-sizing: border-box;
        padding-top: 20px;
        & > li {
          position: relative;
          background: #f5f5f5;
          margin-bottom: 20px;
          border: #e4e4e4 1px solid;
          padding: 10px;
          font-size: 14px;
          border-radius: 5px;
          color: #333;
          line-height: 1.3;
          .from-autor {
            color: #989898;
          }
          &:before {
            content: "";
            display: block;
            width: 0;
            height: 0;
            border-right: 10px solid #e4e4e4;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            position: absolute;
            left: -10px;
            top: 30%;
          }
        }
      }
    }
    .click-order {
      .mt20;
      h3 {
        .h3;
      }
      & > ol {
        padding-top: 20px;
        padding-left: 20px;
        & > li {
          margin-bottom: 20px;
          color: #333;
          font-size: 15px;
          line-height: 1.3;
          &:last-child {
            margin-bottom: 0;
          }
          &:hover {
            color: @c1;
          }
          & > a {
            display: block;
            width: 100%;
            max-width: 360px;
            color: inherit;
            .text-over;
            text-decoration: none;
          }
          .badge {
            background-color: #8eb9f5;
            width: 22px;
            height: 22px;
            font-size: 11px;
            color: #fff;
            text-align: center;
            line-height: 22px;
            display: inline-block;
            margin-right: 4px;
            vertical-align: middle;
          }
          &:first-child {
            .badge {
              background-color: #f54545;
            }
          }
          &:nth-of-type(2) {
            .badge {
              background-color: #ff8547;
            }
          }
          &:nth-of-type(3) {
            .badge {
              background-color: #ffac38;
            }
          }
        }
      }
    }
    .about-me {
      h3 {
        .h3;
      }
      .my-info {
        padding: 20px;
        box-sizing: border-box;
        background-color: whitesmoke;
        color: #333;
        border-radius: 8px;
        border: #e4e4e4 1px solid;
        margin-left: 20px;
        margin-top: 20px;
        color: #333;
        p:not(:last-child) {
          margin-bottom: 15px;
        }
        .label {
          width: 80px;
          text-align: right;
          display: inline-block;
        }
        .value {
          display: inline-block;
          padding-left: 10px;
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>