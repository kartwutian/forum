const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));
const { routes } = require('../config/config');
const model = {
  namespace: 'global',
  state: {
    logoUrl: 'https://cdn.yuque.com/yuque/0/2018/png/140704/1529994215791-avatar/923570e5-4218-47c7-974a-ed7dccd96d80.png',
    appName: '晓风残月',
    menus: [
      {
        id: 1,
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
              id: 1,
              name: '首页',
              path: routes['index'],
            },
            {
              id: 7,
              name: '新手入门',
              path: routes['get_start'],
            },
            {
              id: 2,
              name: 'API',
              path: routes['api'],
            },
            {
              id: 3,
              name: '关于',
              path: routes['about'],
            },
            {
              id: 4,
              name: '注册',
              path: routes['register'],
            },
            {
              id: 5,
              name: '登录',
              path: routes['login'],
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

