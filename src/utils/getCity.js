// 公用封装方法
import common from '../https/index'

let getProvince = () => {
  let options = [];
  return new Promise((resolve, reject) => {
    common.$ajax('manage/getProvinceList', {}, 'get').then(res => {
      (res.data.value || []).filter((province, i) => {
        options.push({ value: province, label: province, children: [] });
      });

      resolve(options);
    });
  });
};

let getCity = (options, province) => {
  if (province) {
    return new Promise((resolve, reject) => {
      common.$ajax('manage/getCityList', {
        province: province
      }, 'get', true).then(res => {
        let children = [];
        (res.data.value || []).filter(city => {
          children.push({ value: city, label: city });
        });

        options.filter((item, i) => {
          if (item.label == province) options[i].children = children;
        });

        resolve(options);
      });
    });
  }
};

export { getProvince, getCity }
