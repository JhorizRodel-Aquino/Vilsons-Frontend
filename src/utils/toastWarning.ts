import toast from "react-hot-toast";

export const toastWarning = (msg: string) =>
  toast(msg, {
    icon: '⚠️',
    style: {
    //   border: '1px solid #facc15',
      background: '#fef3c7',
      color: '#92400e',
    },
  });