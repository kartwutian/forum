export const unit = {
  '1': '亩',
  '2': '㎡',
};

/**
 * api拦截器，未登录，先去登录
 * @param isLogin
 * @param dispatch
 */
export function verifyLogin(isLogin, dispatch, callback) {
  if (isLogin) {
    if (callback) callback();
    return true;
  } else {
    dispatch({
      type: 'login/handleFirstOrderState',
      payload: {
        isShowLogin: true,
      },
    });
    return false;
  }
}

/**
 * 用来判断是否有checked属性为true的标签
 * @param tagArr {array} 存放标签的数组
 * @returns {boolean}
 */
export function hasChecked(tagArr) {
  const len = tagArr.length;
  for (let i = 0; i < len; i += 1) {
    if (tagArr[i].checked) return true;
  }
  return false;
}

/**
 * 增加数据默认值为'--'
 * @param obj
 * @returns {*}
 */
export function fixDefaultData(obj) {
  if (obj === undefined) return {};
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
 * 从全局存储的tags中过滤出所有选中的标签名
 * @param obj
 * @returns {Array}
 */
export function filterCheckedTagNameFormObj(obj) {
  let arr = [];
  const checkedResource = obj.resource.filter(item => item.checked);
  const viewType = checkedResource.length === 1 ? checkedResource[0].type : 'muti'; // 用这个参数来选中的资源类型，单选还是多选等

  switch (viewType) {
    case 'A':
      arr = obj.resource
        .filter(item => item.checked)
        .map(item => ({
          ...item,
          from: 'resource',
        }))
        .concat(
          obj.division
            .filter(item => item.checked)
            .map(item => ({
              ...item,
              from: 'division',
            }))
        );
      break;
    case 'B':
      arr = obj.resource
        .filter(item => item.checked)
        .map(item => ({
          ...item,
          from: 'resource',
        }))
        .concat(
          obj.land
            .filter(item => item.checked)
            .map(item => ({
              ...item,
              from: 'land',
            }))
        )
        .concat(
          obj.division
            .filter(item => item.checked)
            .map(item => ({
              ...item,
              from: 'division',
            }))
        );
      break;
    case 'D':
      arr = obj.resource
        .filter(item => item.checked)
        .map(item => ({
          ...item,
          from: 'resource',
        }))
        .concat(
          obj.vacateStatusMap
            .filter(item => item.checked)
            .map(item => ({
              ...item,
              from: 'vacateStatusMap',
            }))
        )
        .concat(
          obj.division
            .filter(item => item.checked)
            .map(item => ({
              ...item,
              from: 'division',
            }))
        );
      break;
    case 'E':
      arr = obj.resource
        .filter(item => item.checked)
        .map(item => ({
          ...item,
          from: 'resource',
        }))
        .concat(
          obj.division
            .filter(item => item.checked)
            .map(item => ({
              ...item,
              from: 'division',
            }))
        );
      break;
    case 'F':
      arr = obj.resource
        .filter(item => item.checked)
        .map(item => ({
          ...item,
          from: 'resource',
        }))
        .concat(
          obj.storageStrutureMap
            .filter(item => item.checked)
            .map(item => ({
              ...item,
              from: 'storageStrutureMap',
            }))
        )
        .concat(
          obj.storageClassifyMap
            .filter(item => item.checked)
            .map(item => ({
              ...item,
              from: 'storageClassifyMap',
            }))
        )
        .concat(
          obj.division
            .filter(item => item.checked)
            .map(item => ({
              ...item,
              from: 'division',
            }))
        );
      break;
    default:
      arr = obj.resource
        .filter(item => item.checked)
        .map(item => ({
          ...item,
          from: 'resource',
        }))
        .concat(
          obj.division
            .filter(item => item.checked)
            .map(item => ({
              ...item,
              from: 'division',
            }))
        );
      break;
  }

  return arr;
}

export function hasFeatures(queryEventArgs) {
  // console.log(queryEventArgs.result.recordsets[0].features[0] && queryEventArgs.result.recordsets[0].features[0].data.NAME)
  return (
    queryEventArgs.result &&
    queryEventArgs.result &&
    queryEventArgs.result.recordsets[0] &&
    queryEventArgs.result.recordsets[0].features &&
    queryEventArgs.result.recordsets[0].features.length
  );
}
