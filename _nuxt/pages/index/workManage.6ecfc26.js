(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{383:function(e,t,r){var content=r(435);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(15).default)("d7de5076",content,!0,{sourceMap:!1})},434:function(e,t,r){"use strict";var n=r(383);r.n(n).a},435:function(e,t,r){(t=r(14)(!1)).push([e.i,".handle-group[data-v-eb5a909c]{text-align:right;margin-top:20px}.company-logo[data-v-eb5a909c]{display:inline-block;width:80px}.dialog-form[data-v-eb5a909c] .avatar-uploader .el-upload{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden}.dialog-form[data-v-eb5a909c] .avatar-uploader .el-upload:hover{border-color:#409eff}.dialog-form[data-v-eb5a909c] .avatar-uploader-icon{font-size:28px;color:#8c939d;width:100px;height:100px;line-height:100px;text-align:center}.dialog-form[data-v-eb5a909c] .avatar{width:100px;height:100px;display:block}",""]),e.exports=t},437:function(e,t,r){"use strict";r.r(t);r(39);var n=r(2),o=r(97),l=r(140),c={name:"addVideo",middleware:"index",asyncData:function(){return Object(n.a)(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.a)(l.n);case 2:return t=e.sent,e.abrupt("return",{tableData:t.data.list});case 4:case"end":return e.stop()}}),e)})))()},data:function(){return{form:{companyName:"",time:"",desc:"",mp4url:""},imageUrl:"",dialogFormVisible:!1,tableData:[]}},methods:{handleUploadSuccess:function(e,t){var r=this,n=new FileReader;n.readAsDataURL(t.raw),n.onload=function(){r.imageUrl=this.result}},getTableData:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(o.a)(l.n);case 2:r=t.sent,e.tableData=r.data.list;case 4:case"end":return t.stop()}}),t)})))()},save:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n,time,desc,c,m,d,f,v,code,h;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=e.form,n=r.companyName,time=r.time,desc=r.desc,c=r.mp4url,m=e.imageUrl){t.next=5;break}return e.$message.warning("公司LOGO不能为空"),t.abrupt("return");case 5:if(n){t.next=8;break}return e.$message.warning("公司名称不能为空"),t.abrupt("return");case 8:if(time){t.next=11;break}return e.$message.warning("在职时间不能为空"),t.abrupt("return");case 11:if(desc){t.next=14;break}return e.$message.warning("描述不能为空"),t.abrupt("return");case 14:return d={company_name:n,join_time:time,desc:desc,mp4:c,company_logo:m},t.next=17,Object(o.c)(l.e,d);case 17:f=t.sent,v=f.data,code=v.code,h=v.msg,200===code?(e.$message.success(h),e.clear(),e.dialogFormVisible=!1,e.getTableData()):e.$message.error(h);case 20:case"end":return t.stop()}}),t)})))()},clear:function(){this.form={companyName:"",time:"",desc:"",mp4url:""},this.imageUrl="";try{this.$refs.upload.clearFiles()}catch(e){}},delItem:function(e){var t=this;this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(n.a)(regeneratorRuntime.mark((function r(){var n,c,code,m;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Object(o.c)(l.i,{id:e});case 2:n=r.sent,c=n.data,code=c.code,m=c.msg,200===code?(t.$message.success(m),t.getTableData()):t.$message.error(m);case 5:case"end":return r.stop()}}),r)})))).catch((function(e){t.$message({type:"info",message:"已取消删除"})}))}}},m=(r(434),r(22)),component=Object(m.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"work-manage"},[r("BrandNav",{attrs:{list:["首页","职业生涯管理"]}}),e._v(" "),r("div",{staticClass:"handle-group"},[r("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.clear(),e.dialogFormVisible=!0}}},[e._v("新增")])],1),e._v(" "),r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData}},[r("el-table-column",{attrs:{label:"公司LOGO"},scopedSlots:e._u([{key:"default",fn:function(e){return[r("img",{staticClass:"company-logo",attrs:{src:e.row.company_logo,alt:e.row.company_name}})]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"company_name",label:"公司名称"}}),e._v(" "),r("el-table-column",{attrs:{prop:"join_time",label:"在职时间"}}),e._v(" "),r("el-table-column",{attrs:{label:"视频地址"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.mp4_url?r("a",{attrs:{href:t.row.mp4_url,target:"_blank"}},[e._v("查看视频")]):e._e()]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"操作",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(r){return e.delItem(t.row.id)}}},[e._v("删除")])]}}])})],1),e._v(" "),r("el-dialog",{staticClass:"dialog-form",attrs:{title:"笔记修改",visible:e.dialogFormVisible,width:"700px"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[r("el-form",{ref:"form",staticClass:"form",attrs:{model:e.form,"label-width":"120px"}},[r("el-form-item",{attrs:{label:"公司LOGO"}},[r("el-upload",{ref:"upload",staticClass:"avatar-uploader",attrs:{"on-success":e.handleUploadSuccess,action:"https://shaoyuhong.cn/grzx/findTellmeList.php"}},[e.imageUrl?r("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),r("el-form-item",{attrs:{label:"公司名称"}},[r("el-input",{model:{value:e.form.companyName,callback:function(t){e.$set(e.form,"companyName",t)},expression:"form.companyName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"在职时间"}},[r("el-input",{model:{value:e.form.time,callback:function(t){e.$set(e.form,"time",t)},expression:"form.time"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"职业描述"}},[r("el-input",{attrs:{type:"textarea",rows:"4"},model:{value:e.form.desc,callback:function(t){e.$set(e.form,"desc",t)},expression:"form.desc"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"视频地址"}},[r("el-input",{model:{value:e.form.mp4url,callback:function(t){e.$set(e.form,"mp4url",t)},expression:"form.mp4url"}})],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("确 定")])],1)],1)],1)}),[],!1,null,"eb5a909c",null);t.default=component.exports;installComponents(component,{BrandNav:r(141).default})}}]);