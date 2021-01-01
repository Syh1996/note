export const state = () => ({
    token:'', //token验证
    nick:'',//用户名
    isLogin:false
  })
  
  export const mutations = {
    setLoginStatus(state,{payload}) {
       state.token = payload.token;
       state.isLogin = true;
       state.nick = payload.nick || '未设置';
    },
    exit(state){
       state.token = '';
       state.isLogin = false;
       state.nick ='';
    }
  }