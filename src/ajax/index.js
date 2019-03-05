import Axios from "axios"
import Qs from 'qs'
import { deleteNullProperty } from '@/utils/filter'
import { Loading } from 'element-ui'
import { Message } from 'element-ui'

Axios.defaults.withCredentials = true; //让ajax携带cookie

// Axios.defaults.baseURL = baseUrls;

let loadingInstance;

export default {
  $ajax(apiUrl, data, type, hideLoading) {
    // data = deleteNullProperty(data);
    if (!hideLoading) {
      loadingInstance = Loading.service({
        text: '拼命加载中...',
        background: 'rgba(0, 0, 0, 0.8)'
      });
    }

    return new Promise((resolve, reject) => {
      let config = {
        method: type || 'get',
        url: apiUrl,
        timeout: 600000
      };
      if (type == 'get') {
        data.t = new Date().getTime();
        config.params = data;
      }
      if (type == 'post') config.data = data;
      Axios(config).then(res => {
        setTimeout(() => {
          !hideLoading && loadingInstance.close();
        }, 200);

        if (res.data && res.data.code == '0') {
          resolve(res);
        } else {
          if (res.data.code == 30000) {
            console.log('=== ajax error ===');
            // return window.location.href = locationUrl;
          }
          Message.error({ message: res.data.msg });
        }
      }).catch(error => {
        setTimeout(() => {
          !hideLoading && loadingInstance.close();
        }, 200);
        Message.error({ message: res.data.msg });
      });
    });
  }
}
