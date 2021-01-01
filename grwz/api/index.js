// 服务 器
const host = "https://www.shaoyuhong.cn/grzx";

//const host = 'http://localhost';
// 获取今日历史事件
const getTodayEvent = '/getTodayEvent.php';

//给我留言
const sendTellme = '/createTellmeItem.php';

//获取最新留言
const getTellmeList = '/findTellmeList.php';

//获取所有分类
const getTypeList = '/findTypeList.php';

//添加笔记
const sendNoteItem = "/createNoteItem.php";

//获取所有笔记
const getNoteList = "/findNoteList.php";

//获取某个笔记的详情
const getNoteItemDetails = '/findNoteItemDetails.php';


//文章评论
const commentSave = '/createCommentItem.php';

//查询文章所有评论
const findCommentItem = '/findCommentList.php';

//增加点击数
const addClickNumber = '/addNoteItemWatch.php';

//查询点击数排行
const findClickDesc = '/findClickDesc.php';

//删除分类
const delType = '/delTypeItem.php';

//新增分类
const createType = '/createTypeItem.php';

// 新增行走路途
const addVideo = '/createWay.php';

//查询所有行走路途
const findVideo = '/findWayList.php';

//根据 note_id查询详情
const findNoteDetails = '/findNoteDetails.php';

//根据 note_id 更新详情
const updateNoteDetails = '/updateNoteDetails.php';

//根据 note_id 删除笔记
const delNoteItem = '/delNoteItem.php';

//根据 id 删除视频
const delWayItem = '/delWayItem.php';


//添加工作经历
const createWorkItem = '/createWorkItem.php';

//查询工作经历
const findWorkList = '/findWorkList.php';

//删除工作经历
const delWorkItem = '/delWorkItem.php';

//登录 
const loginApi = '/login.php';

const getCurrentDetails = '/getCurrentDetails.php';

//获取详情页title desc
const getNoteSeo = '/findNoteSeo.php';

//收录seo 调百度
const sendURLtoBaiduSeo = '/sendBaiduSeo.php';
export { 
    host,
    getTodayEvent,
    sendTellme,
    getTellmeList,
    getTypeList,
    sendNoteItem,
    getNoteList,
    getNoteItemDetails,
    commentSave,
    findCommentItem,
    addClickNumber,
    findClickDesc,
    delType,
    createType,
    addVideo,
    findVideo,
    findNoteDetails,
    updateNoteDetails,
    delNoteItem,
    delWayItem,
    createWorkItem,
    findWorkList,
    delWorkItem,
    loginApi,
    getCurrentDetails,
    getNoteSeo,
    sendURLtoBaiduSeo
}