(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{378:function(t,e,n){var content=n(425);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(15).default)("73549bba",content,!0,{sourceMap:!1})},424:function(t,e,n){"use strict";var r=n(378);n.n(r).a},425:function(t,e,n){(e=n(14)(!1)).push([t.i,".tellme[data-v-5adb73ce]{width:70%}.form[data-v-5adb73ce]{margin-top:20px}.label[data-v-5adb73ce]{vertical-align:middle;float:left;font-size:16px;color:#606266;line-height:40px;padding:0 12px 0 0;box-sizing:border-box}",""]),t.exports=e},446:function(t,e,n){"use strict";n.r(e);n(39);var r=n(2),o=n(97),c=n(140),l={transition:"fade",name:"tellme",data:function(){return{form:{content:""}}},head:function(){return{title:"邵预鸿-给我留言",meta:[{hid:"keywords",name:"keywords",content:"邵预鸿-给我留言"},{hid:"description",name:"description",content:"邵预鸿-您的留言将通过邮件自动下发到我的邮箱，如果您有留下相关联系邮箱，我将很快回复您的消息"}]}},methods:{save:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,l,code,d;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={desc_msg:t.form.content},e.next=3,Object(o.c)(c.x,n);case 3:r=e.sent,l=r.data,code=l.code,d=l.msg,200===code?(t.$message.success(d),t.form.content=""):t.$message.error(d);case 6:case"end":return e.stop()}}),e)})))()}}},d=(n(424),n(22)),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tellme"},[n("BrandNav",{attrs:{list:["首页","给我留言"]}}),t._v(" "),n("el-form",{staticClass:"form",attrs:{"label-width":"0px",model:t.form}},[n("el-form-item",{attrs:{label:""}},[n("p",{staticClass:"label"},[t._v("留言内容")]),t._v(" "),n("el-input",{attrs:{type:"textarea",rows:10,placeholder:"您的留言将通过邮件自动下发到我的邮箱，如果您有留下相关联系邮箱，我将很快回复您的消息"},model:{value:t.form.content,callback:function(e){t.$set(t.form,"content",e)},expression:"form.content"}})],1),t._v(" "),n("el-form-item",{attrs:{label:""}},[n("el-button",{attrs:{type:"primary"},on:{click:t.save}},[t._v("留言")])],1)],1)],1)}),[],!1,null,"5adb73ce",null);e.default=component.exports;installComponents(component,{BrandNav:n(141).default})}}]);