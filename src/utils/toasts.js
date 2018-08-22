import { toast } from "react-semantic-toasts";

export const errorToast = (title, time = 5000) =>
  toast({
    type: "error",
    icon: "meh",
    title: title,
    time: time
  });

export const successToast = (title, time = 5000) =>
  toast({
    type: "success",
    icon: "smile outline",
    title: title,
    time: time
  });
