import axios from "axios";
import MESSAGES from "constants/message";
import { showToastMessage } from "utils/toast-utils";

const URL = "http://localhost:5000/api/";
const SUCCESS_MESSAGE_ARR = [201, 200, 204];

const api = async ({ path, method, params, body }) => {
  try {
    const response = await axios({
      url: path,
      method,
      baseURL: URL,
      params,
      data: body,
      validateStatus: () => true,
    });
    if (!SUCCESS_MESSAGE_ARR.includes(Number(response.status))) {
      throw new Error(response?.data.message ?? MESSAGES.error_message);
    } else {
      return response;
    }
  } catch (err) {
    showToastMessage(err?.message);
    throw new Error(err?.message);
  }
};

export default api;
