(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{372:function(e,t,r){var content=r(409);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(15).default)("08fd8f81",content,!0,{sourceMap:!1})},408:function(e,t,r){"use strict";var n=r(372);r.n(n).a},409:function(e,t,r){(t=r(14)(!1)).push([e.i,".form[data-v-17260c8a]{width:70%;margin-top:20px}.form[data-v-17260c8a] .ql-toolbar.ql-snow+.ql-container.ql-snow,.form[data-v-17260c8a] .ql-toolbar.ql-snow+.ql-container.ql-snow .ql-editor{height:500px}.form .pic[data-v-17260c8a]{display:block;width:120px}.form .click-upload[data-v-17260c8a]{color:#606266;font-size:14px;cursor:pointer}.file[data-v-17260c8a]{position:fixed;left:-1000px;top:-1000px}",""]),e.exports=t},449:function(e,t,r){"use strict";r.r(t);r(100),r(41),r(42),r(16),r(68);var n=r(48),o=(r(39),r(2)),c=r(97),l=r(140),f=r(66);function m(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var v={name:"editor",middleware:"index",asyncData:function(){return Object(o.a)(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.a)(l.t,{});case 2:return t=e.sent,e.abrupt("return",{typeList:t.data.list});case 4:case"end":return e.stop()}}),e)})))()},head:function(){return{title:"邵预鸿-学习笔记|生活笔记|经验分享|开发问题|面试题笔记记笔记",meta:[{hid:"keywords",name:"keywords",content:f.a.keyWords},{hid:"description",name:"description",content:"邵预鸿-学习笔记|生活笔记|经验分享|开发问题|面试题笔记记笔记"}]}},data:function(){return{typeList:[],form:{title:"",desc:"",content:"",type:""},uploadPic:""}},methods:{onEditorChange:function(){},save:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var r,title,desc,content,n,o,f,code,m,i,v,w,y,h;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=e.form,title=r.title,desc=r.desc,content=r.content,n=r.type,title){t.next=4;break}return e.$message.error("笔记标题不能为空"),t.abrupt("return");case 4:if(desc){t.next=7;break}return e.$message.error("笔记描述不能为空"),t.abrupt("return");case 7:if(n){t.next=10;break}return e.$message.error("请选择分类"),t.abrupt("return");case 10:if(content){t.next=13;break}return e.$message.error("笔记详情不能为空"),t.abrupt("return");case 13:return t.next=15,Object(c.c)(l.w,d(d({},e.form),{},{pic:e.uploadPic}));case 15:if(o=t.sent,f=o.data,code=f.code,m=f.msg,200!==code){t.next=29;break}for(i in e.$message.success(m),e.form)e.form[i]="";return e.uploadPic="",e.$refs.file.value="",t.next=24,Object(c.c)(l.y);case 24:v=t.sent,w=v.data,y=w.success,h=w.remain,e.$message.success("成功推送:".concat(y,",剩余").concat(h)),t.next=30;break;case 29:e.$message.error(m);case 30:case"end":return t.stop()}}),t)})))()},setUploadPic:function(){var e=this,t=this.$refs.file.files[0],r=new FileReader;r.readAsDataURL(t),r.onload=function(t){e.uploadPic=this.result}}},components:{}},w=(r(408),r(22)),component=Object(w.a)(v,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"edit-note"},[r("BrandNav",{attrs:{list:["首页","记笔记"]}}),e._v(" "),r("el-form",{staticClass:"form",attrs:{"label-width":"80px",model:e.form}},[r("el-form-item",{attrs:{label:"标题"}},[r("el-input",{model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"封面"}},[r("span",{directives:[{name:"show",rawName:"v-show",value:!e.uploadPic,expression:"!uploadPic"}],staticClass:"click-upload",on:{click:function(t){return e.$refs.file.click()}}},[e._v("点击上传封面")]),e._v(" "),r("img",{directives:[{name:"show",rawName:"v-show",value:e.uploadPic,expression:"uploadPic"}],staticClass:"pic",attrs:{src:e.uploadPic},on:{click:function(t){return e.$refs.file.click()}}})]),e._v(" "),r("el-form-item",{attrs:{label:"描述"}},[r("el-input",{model:{value:e.form.desc,callback:function(t){e.$set(e.form,"desc",t)},expression:"form.desc"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"所属分类"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:""},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},e._l(e.typeList,(function(e,t){return r("el-option",{key:t,attrs:{label:e.type_name,value:e.type_id}})})),1)],1),e._v(" "),r("el-form-item",{attrs:{label:"内容"}},[r("quill-editor",{ref:"editor",on:{change:function(t){return e.onEditorChange(t)}},model:{value:e.form.content,callback:function(t){e.$set(e.form,"content",t)},expression:"form.content"}})],1),e._v(" "),r("el-form-item",{attrs:{label:""}},[r("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("保存")])],1)],1),e._v(" "),r("input",{ref:"file",staticClass:"file",attrs:{type:"file",accept:"image/png, image/jpeg, image/jpg, image/bmp"},on:{change:e.setUploadPic}})],1)}),[],!1,null,"17260c8a",null);t.default=component.exports;installComponents(component,{BrandNav:r(141).default})}}]);