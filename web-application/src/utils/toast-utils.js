import { toast } from "react-toastify";

export const showToastMessage = (message) => {
  toast.error(message ?? "Unknown error occured while calling API request!!", {
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
