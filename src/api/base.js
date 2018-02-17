import Axios from "axios";
import { Tip } from "src/common";

import { baseURL } from "src/config";

/**
 * 请求拦截器
 * */
// Axios.interceptors.request.use(
//   config => {
//     //在发送请求之前做某事
//     // console.log("这里是拦截器");
//     // console.log("config", config);
//     return Storage.get("Token")
//       .then(data => {
//         if (data) {
//           config.headers["token"] = data;
//         }
//         config.headers["Content-Type"] = "application/json";
//         config.headers["timestamp"] = Date.parse(new Date());
//         config.headers["version"] = "1.0.0";
//         return config;
//       })
//       .catch(e => {
//         config.headers["Content-Type"] = "application/json";
//         config.headers["timestamp"] = Date.parse(new Date());
//         config.headers["version"] = "1.0.0";
//         return config;
//       });
//   },
//   error => {
//     //请求错误时做些事
//     return Promise.reject(error);
//   }
// );

const requestWrapper = (url, param = {}) => {
  return Axios.request({
    baseURL: baseURL,
    url,
    method: "post",
    timeout: 5000,
    data: param
  });
};
const post = (
  url,
  params = {},
  { loading = true, handleCatch = true } = {}
) => {
  loading && Tip.loading();
  return requestWrapper(url, params)
    .then(res => {
      const { data } = res;
      loading && Tip.dismiss();
      if (String(data).length === 6) {
        return Promise.resolve(data);
      }

      if (data.rCode > 0) {
        return Promise.resolve(data);
      } else {
        Tip.fail(`error:${data.message}`);
        return Promise.reject(data.message);
      }
    })
    .catch(e => {
      loading && Tip.dismiss();
      if (handleCatch) {
        Tip.fail(`error:${e}`);
      }
      return Promise.reject(e);
    });
};
export { post };
