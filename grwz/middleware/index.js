export default function ({store,route,redirect  }) {
    if(!store.state.isLogin){
       redirect('/');
    }
  }