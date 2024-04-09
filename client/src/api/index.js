import axios from "axios";
import { ERROR_MESSAGE } from "constants/message";
import { showToastMessage } from "utils/toast-utils";

const URL = "http://localhost:5000/api/";
const SUCCESS_MESSAGE_ARR = [201, 200, 204];

function api({ path, method, params, body }) {
  return new Promise(function (resolve, reject) {
    axios({
      url: path,
      method,
      baseURL: URL,
      params,
      data: body,
    })
      .then(function (response) {
        if (!SUCCESS_MESSAGE_ARR.includes(Number(response.status))) {
          throw new Error(ERROR_MESSAGE);
        } else {
          resolve(response);
        }
      })
      .catch(function (err) {
        showToastMessage(err?.message);
        reject(err);
      });
  });
}

export default api;
