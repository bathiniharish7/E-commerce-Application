import { toast, Bounce ,Slide} from 'react-toastify';

export const notifySuccess = (message) => {
    toast.info(message, {
        position:"bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Slide,
    });
};

export const notifyError = (message) => {
    toast.error(message, {
        position:"bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
    });
};