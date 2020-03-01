const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));
const { routes } = require("../config/config");
const model = {
  namespace: "global",
  state: {
    logoUrl:
      "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3256100974,305075936&fm=26&gp=0.jpg",
    appName: "晓风残月",
    menus: [
      {
        id: 1,
        name: "首页"
      }
    ],
    screen: "large"
  },
  effects: {
    *queryMenus(action, { put }) {
      yield delay(100);
      yield put({
        type: "updateMenus",
        payload: {
          menus: [
            {
              id: 1,
              name: "首页",
              path: routes["index"]
            },
            {
              id: 7,
              name: "新手入门",
              path: routes["get_start"]
            },
            {
              id: 2,
              name: "API",
              path: routes["api"]
            },
            {
              id: 3,
              name: "关于",
              path: routes["about"]
            },
            {
              id: 4,
              name: "注册",
              path: routes["register"]
            },
            {
              id: 5,
              name: "登录",
              path: routes["login"]
            }
          ]
        }
      });
    }
  },
  reducers: {
    updateMenus(state, { payload }) {
      return { ...state, ...payload };
    },
    updateState(state, { payload }) {
      console.log(payload);
      return { ...state, ...payload };
    }
  }
};

export default model;
