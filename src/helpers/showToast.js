import { toast } from "react-toastify";

export const showToast = (type,message)=>{
    const config = {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    };
    if(type === "success"){
        toast.success(message,config)
    }
    else if(type === "error")
    {
        toast.error(message,config)
    }
    
    else if (type === "info") {
      toast.error(message, config);
    }
    else {
      toast.error(message, config);
    }

}