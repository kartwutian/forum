export const DOMAIN = 'http://61.174.255.225:8090';

// 默认遍历搜索的图层
export const DATA_TYPE_TO_URL__SEARCH = {
  A: {
    name: 'industrial@resources',
    // url: DOMAIN + '/iserver/services/map-ywmap-ws/rest/maps/industrial@ywmap-ws', // 产业园
    url: DOMAIN + '/iserver/services/map-resources/rest/maps/industrial@resources', // 产业园 新
  },
  B: {
    name: 'massif@resources',
    // url: DOMAIN + '/iserver/services/map-ywmap-ws/rest/maps/massif@ywmap-ws', // 地块
    url: DOMAIN + '/iserver/services/map-resources/rest/maps/massif@resources', // 地块 新
  },
  C: {
    name: 'organic@resources',
    // url: DOMAIN + '/iserver/services/map-ywmap-ws/rest/maps/organic@ywmap-ws', // 工业有机更新
    url: DOMAIN + '/iserver/services/map-resources/rest/maps/organic@resources', // 工业有机更新 新
  },
  D: {
    name: 'vacate@resources',
    // url: DOMAIN + '/iserver/services/map-ywmap-ws/rest/maps/vacate@ywmap-ws', // D类企业腾退
    url: DOMAIN + '/iserver/services/map-resources/rest/maps/vacate@resources', // D类企业腾退 新
  },
  E: {
    name: 'building@resources',
    // url: DOMAIN + '/iserver/services/map-ywmap-ws/rest/maps/building@ywmap-ws', // 楼宇
    url: DOMAIN + '/iserver/services/map-resources/rest/maps/building@resources', // 楼宇 新
  },
  F: {
    name: 'storage@resources',
    // url: DOMAIN + '/iserver/services/map-ywmap-ws/rest/maps/storage@ywmap-ws', // 仓储
    url: DOMAIN + '/iserver/services/map-resources/rest/maps/storage@resources', // 仓储 新
  },
};
// 做类型映射
export const DATA_TYPE_TO_URL = Object.assign({},DATA_TYPE_TO_URL__SEARCH, {
  G: {
    name: 'project@ywmap-ws',
    url: DOMAIN + '/iserver/services/map-ywmap-ws/rest/maps/project@ywmap-ws', // 项目资料
  },
  H: {
    name: 'company@ywmap-ws',
    url: DOMAIN + '/iserver/services/map-ywmap-ws/rest/maps/company@ywmap-ws', // 入驻企业
  },
  quHua: {
    // 蓝色填充, 白色边界
    name: 'Export_Output_2_1@xzqh',
    url: DOMAIN + '/iserver/services/map-yw_map/rest/maps/Export_Output_2_1@xzqh', // 区划图层
  },
  quHua1: {
    // 黑色边界
    name: 'Export_Output_2_1@xzqh1',
    url: DOMAIN + '/iserver/services/map-yw_map/rest/maps/Export_Output_2_1@xzqh1', // 区划图层1
  },
  huanBao: {
    name: 'Export_Output@yiwu-tcj-huanbao',
    url:
      DOMAIN + '/iserver/services/map-yiwu-tcj-huanbao/rest/maps/Export_Output@yiwu-tcj-huanbao', // 环保图层
  },
  ywvector: {
    name: 'ywvector',
    url:
      DOMAIN + '/iserver/services/map-wmts-ywvector/rest/maps/ywvector', // 义乌平面图层
  },
  ywvectoranno: {
    name: 'ywvectoranno',
    url:
      DOMAIN + '/iserver/services/map-wmts-ywvectoranno/rest/maps/ywvectoranno', // 义乌平面标注图层
  },
  ywimg: {
    name: 'ywimg',
    url:
      DOMAIN + '/iserver/services/map-wmts-ywimg/rest/maps/ywimg', // 义乌影像图层
  },
  ywimganno: {
    name: 'ywimganno',
    url:
      DOMAIN + '/iserver/services/map-wmts-ywimganno/rest/maps/ywimganno', // 义乌影像标注图层
  },

});

export const REST_LAYERS = [
  {
    layer: 'ywvector',
    name: '义乌平面图层',
    url: DATA_TYPE_TO_URL.ywvector.url,
    type: 'base',
    init: true,
  },
  {
    layer: 'ywvectoranno',
    name: '义乌平面标注图层',
    type: 'base',
    url: DATA_TYPE_TO_URL.ywvectoranno.url,
    init: true,
  },
  {
    layer: 'ywimg',
    name: '义乌影像图层',
    type: 'base',
    url: DATA_TYPE_TO_URL.ywimg.url,
  },
  {
    layer: 'ywimganno',
    name: '义乌影像标注图层',
    type: 'base',
    url: DATA_TYPE_TO_URL.ywimganno.url,
  },
  {
    layer: 'huanbao',
    name: '环保图层',
    type: 'limit',
    url: DATA_TYPE_TO_URL.huanBao.url,
    opacity: 0.6,
  },
  {
    layer: 'dikuai',
    name: '地块',
    type: 'resource',
    url: DATA_TYPE_TO_URL.B.url,
  },
  {
    layer: 'chanyeyuan',
    name: '产业园',
    type: 'resource',
    url: DATA_TYPE_TO_URL.A.url,
  },
  {
    layer: 'gongye',
    name: '工业有机更新',
    type: 'resource',
    url: DATA_TYPE_TO_URL.C.url,
  },
  {
    layer: 'dlei',
    name: 'D类企业腾退',
    type: 'resource',
    url: DATA_TYPE_TO_URL.D.url,
  },
  {
    layer: 'louyu',
    name: '楼宇',
    type: 'resource',
    url: DATA_TYPE_TO_URL.E.url,
  },
  {
    layer: 'cangchu',
    name: '仓储',
    type: 'resource',
    url: DATA_TYPE_TO_URL.F.url,
  },
  {
    layer: 'xiangmuziliao',
    name: '项目资料',
    type: 'resource',
    url: DATA_TYPE_TO_URL.G.url,
  },
  {
    layer: 'qiye',
    name: '入驻企业',
    type: 'resource',
    url: DATA_TYPE_TO_URL.H.url,
  },
  {
    layer: 'quhua',
    name: '区划',
    type: 'quhua',
    url: DATA_TYPE_TO_URL.quHua.url,
    opacity: 1,
  },
  {
    layer: 'quhua1',
    name: '区划1',
    type: 'quhua',
    url: DATA_TYPE_TO_URL.quHua1.url,
    opacity: 0.5,
  },
];


/**
 * 增加数据默认值为'--'
 * @param obj
 * @returns {*}
 */
export function fixDefaultData(obj) {
  const data = obj;
  for (const key in data) {
    if (data[key] === undefined || data[key] === null || data[key] === '') {
      data[key] = '--';
    }
  }
  return data;
}

/**
 * 把数据按dataType类型区分
 * @param arr
 * @param attribute
 * @returns {{}}
 */
export function exchangeDataByType(arr, attribute = 'dataType') {
  const len = arr.length;
  const json = {};
  for (let i = 0; i < len; i += 1) {
    if (json[arr[i][attribute]]) {
      json[arr[i][attribute]].push({ smid: arr[i].smid });
    } else {
      json[arr[i][attribute]] = [{ smid: arr[i].smid }];
    }
  }
  return json;
}

/**
 * 获取列表markers查询的参数
 * @param smidObj
 * @param callback
 */
export function getParamsBySmidObj (smidObj, callback) {
  // console.log(smidObj)
  for (const key in smidObj) {
    let attributeFilter = 'ID = '; // 用来拼接sql查询语句
    const len = smidObj[key].length;
    for (let i = 0; i < len; i += 1) {
      if (i === len - 1) {
        attributeFilter += smidObj[key][i].smid;
      } else {
        attributeFilter += smidObj[key][i].smid + ' or ID = ';
      }
    }
    if(callback) callback({
      name: DATA_TYPE_TO_URL[key].name,
      url: DATA_TYPE_TO_URL[key].url,
      attributeFilter,
    });
  }
};

export function getParamsBySmidObjForDetail(smidObj, callback) {
  if(callback) callback({
    name: DATA_TYPE_TO_URL[smidObj.type].name,
    url: DATA_TYPE_TO_URL[smidObj.type].url,
    attributeFilter: `ID = ${smidObj.smid}`,
  });
};

export function getMarkersParams(features) {
  return features.map(item => ({
    name: item.properties.NAME,
    type: item.properties.DataType,
    smid: item.properties.ID,
    center: [(Number(item.properties.SmSdriN) + Number(item.properties.SmSdriS))/2, (Number(item.properties.SmSdriE) + Number(item.properties.SmSdriW))/2],
    viewPos: [(Number(item.properties.SmSdriN) + Number(item.properties.SmSdriS))/2 - 0.002*3, (Number(item.properties.SmSdriE) + Number(item.properties.SmSdriW))/2], // 视图位置
    geometry: item, // 用于后续地理位置查询（查询出环保type），注意整个item才是地理位置信息
  }))
}

