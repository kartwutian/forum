const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

const model = {
  namespace: 'global',
  state: {
    name: 'hopperhuang',
    menus: [
      {
        name: '首页',
      },
    ],
  },
  effects: {
    *queryMenus(action, { put }) {
      yield delay(100);
      yield put({ 
        type: 'updateMenus',
        payload: {
          menus: [
            {
              name: '首页',
            },
            {
              name: '新手入门',
            },
            {
              name: 'API',
            },
            {
              name: '关于',
            },
            {
              name: '注册',
            },
            {
              name: '登录',
            },
          ],
        }
      });
    },
  },
  reducers: {
    updateMenus(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default model;

