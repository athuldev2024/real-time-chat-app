import axios from "axios";
import { ERROR_MESSAGE } from "constants/message";
import { toast } from "react-toastify";

const URL = "http://localhost:5000/api/";
const SUCCESS_MESSAGE_ARR = [201, 200, 204];

const showToastMessage = () => {
  toast.error("An error occured while calling API request!!", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

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
        showToastMessage();
        reject(err);
      });
  });
}

export default api;
