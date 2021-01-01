<template>
  <div class="noteDetails">
    <BrandNav :list="['首页', '笔记详情']" />
    <div class="note-box">
      <div class="node-details" v-loading="loading">
        <h3 class="center">{{ details.title }}</h3>
        <div class="center">
          <span class="create-time">
            <i class="el-icon-time"></i>
            最后编辑：{{ details.create_time }}
          </span>
          <span class="type">
            <i class="el-icon-tickets"></i>
            所属分类：{{ details.type_name }}
          </span>
          <span class="item-watch-number">
            <i class="el-icon-view"></i>
            浏览量：{{ details.watch }}
          </span>
        </div>
        <div class="create-msg" v-html="details.details"></div>
        <div class="comment-box">
          <h3>
            以上是我的个人观点和理解，部份解决方案来源于网络，本网站仅供个人学习经验总结，如果您有更深的理解还望您不吝赐教，我的联系邮箱:1045749725@qq.com，您也可以在下方留言
          </h3>
          <textarea
            placeholder="积累跬步，可至千里，千里之行，始于足下，评论一条再走吧!"
            v-model="commentMsg"
          ></textarea>
          <el-button type="primary" class="btn" @click="sendComment"
            >发布评论</el-button
          >
        </div>
        <div class="comment-list-box">
          <h3>最新评论</h3>
          <ul class="comment-list" v-if="commentList.length !==0">
            <li v-for="(item, index) in commentList" :key="index">
              <span class="from-author">IP[{{ item.ip }}]</span>
              <span class="from-autor-send-time">{{ item.create_time }}:</span>
              <span>{{ item.comment_msg }}</span>
            </li>
          </ul>
          <Empty v-else></Empty>
        </div>
      </div>
      <aside class="note-hot">
        <div class="click-order">
          <h3>点击排行</h3>
          <ol>
            <li v-for="(item, index) in watchDescList" :key="index">
              <a href="javascript:void(1)" @click="reload(item.id)">
                <span class="badge">{{ index + 1 }}</span>
                {{ item.title }}
              </a>
            </li>
          </ol>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import { get, post } from "~/libs/axios";
import Empty from '@/components/empty';
import {
  getNoteItemDetails,
  commentSave,
  findCommentItem,
  addClickNumber,
  findClickDesc,
} from "~/api";
export default {
  transition: "fade",
  data() {
    return {
      details: {}, //详情
      commentMsg: "", //评论信息
      note_id: "", //当前文章id
      commentList: [], //评论列表
      watchDescList: [], //排行列表
      loading: true, //默认加载中
    };
  },
  head() {
    let {title='加载中',desc='加载中'} = this.$route.params;
    return {
      title:`邵预鸿-${title}`,
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: `邵预鸿-${title}`,
        },
        {
          hid: "description",
          name: "description",
          content: `邵预鸿-标题:${title},内容:${desc}`,
        },
      ],
    };
  },
  components:{
    Empty
  },
  async mounted() {
    this.reload(this.$route.query.id);
  },
  methods: {
    async sendComment() {
      if (!this.commentMsg) {
        this.$message.error("请输入评论信息");
        return;
      }
      const result = await post(commentSave, {
        note_id: this.note_id,
        comment_msg: this.commentMsg,
        title: this.details.title,
      });
      let { code, msg } = result.data;
      if (code === 200) {
        this.$message.success(msg);
        this.commentMsg = "";
        const commentListData = await get(findCommentItem, {
          note_id: this.$route.query.id,
        });
        this.commentList = commentListData.data.list;
      } else {
        this.$message.error(msg);
      }
    },
    async reload(note_id) {
      const id = note_id;
      this.loading = true;
      const reuslt = await get(getNoteItemDetails, { note_id: id });
      const commentListData = await get(findCommentItem, { note_id: id });
      const addClickNumberData = await post(addClickNumber, {
        note_id: id,
      });
      const findClickDescListData = await get(findClickDesc);
      const watchDescList = findClickDescListData.data.list;
      this.details = reuslt.data.list[0] || {};
      this.note_id = id;
      this.commentList = commentListData.data.list;
      this.watchDescList = watchDescList;
      this.loading = false; //加载完成
    },
  },
};
</script>

<style scoped lang="less">
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
.center {
  text-align: center;
}
@c1: #e01109;
.note-box {
  .flex;
  width: 100%;
  padding: 20px 0;
  .node-details {
    flex: 1;
    overflow: hidden;
    border: 1px solid #ddd;
    padding: 20px;
    box-sizing: border-box;
    margin-right: 40px;
    h3 {
      color: rgba(0, 0, 0, 0.65);
      font-size: 22px;
      margin-bottom: 15px;
    }
    h3 + div {
      color: #ccc;
      font-size: 14px;
      margin-bottom: 15px;
      & > span {
        margin-right: 5px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .create-msg {
      line-height: 1.8;
      color: #777;
      font-size: 16px;
      max-width: 100%;
      overflow: hidden;
      /deep/ pre.ql-syntax {
        background-color: #2d2d2d;
        color: #a5a4a4;
        border-radius: 5px;
        margin: 4px 0;
        padding: 10px 20px;
        box-sizing: border-box;
      }
      /deep/ img {
        display: block;
        max-width: 100%;
        margin: 0 auto;
      }
      /deep/ p {
        word-break: break-all;
        max-width: 100%;
      }
      /deep/ h1,
      /deep/ h2,
      /deep/ h3,
      /deep/ h4,
      /deep/ h5,
      /deep/ h6,
      /deep/ p,
      /deep/ span,
      /deep/ div {
        font-weight: 500 !important;
        font-size: 15px !important;
        line-height: 1.5;
        color: #777;
      }
      /deep/ pre {
        white-space: pre-wrap;
        margin: 0;
      }
      /deep/ ol > li {
        list-style-type: decimal;
      }
      /deep/ blockquote {
        margin: 0;
        padding: 0;
      }
      /deep/ p:empty {
        height: 10px;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        line-height: 1;
      }
      /deep/ p > br {
        font-size: 10px;
      }
      /deep/ blockquote {
        position: relative;
        padding-left: 15px;
        box-sizing: border-box;
        &::before {
          content: "";
          display: block;
          width: 4px;
          height: 80%;
          position: absolute;
          left: 0;
          top: 10%;
          background-color: #ccc;
        }
      }
    }
    .comment-box {
      margin-top: 30px;
      background-color: #f3f3f3;
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      padding: 15px;
      box-sizing: border-box;
      h3 {
        line-height: 1.5;
        font-size: 15px;
        font-weight: 500;
      }
      textarea {
        display: block;
        width: 100%;
        height: 150px;
        resize: vertical;
        padding: 10px;
        outline: 0;
        box-sizing: border-box;
      }
      .btn {
        margin-top: 20px;
        width: 100%;
      }
    }
    .comment-list-box {
      padding: 15px;
      margin-top: 30px;
      h3 {
        font-weight: 500;
        font-size: 18px;
        border-bottom: 1px solid #ddd;
        padding-bottom: 15px;
        color: rgba(0, 0, 0, 0.65);
      }
      .comment-list {
        li {
          font-size: 15px;
          vertical-align: middle;
          color: rgba(0, 0, 0, 0.65);
          margin-bottom: 20px;
          line-height: 1.5;
          .from-author {
            color: #8a93a0;
            font-size: 15px;
          }
          .from-autor-send-time {
            color: rgba(0, 0, 0, 0.45);
            font-size: 14px;
            vertical-align: middle;
            margin-right: 10px;
          }
        }
      }
    }
  }
  .note-hot {
    flex: 0 0 320px;
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
            max-width: 300px;
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
  }
}
</style>