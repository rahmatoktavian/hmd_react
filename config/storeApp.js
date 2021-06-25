import { createStore } from 'redux'

const defaultState = {
  isLogin: false,
  user_type: '',
  nim: '',
  petugas_id: '',
};

//rejuicer
const storeApp = (state = defaultState, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {...state,
          isLogin: action.payload.isLogin,
          user_type: action.payload.user_type,
          nim: action.payload.nim,
          petugas_id: action.payload.petugas_id,
        };
  }
};

export default createStore(storeApp);
