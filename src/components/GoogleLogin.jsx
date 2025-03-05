import { signInWithPopup } from "firebase/auth";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "@/helpers/firebase";
import axios from "axios";
import { showToast } from "@/helpers/showToast";
import { useNavigate } from "react-router-dom";
import { getEnv } from "@/helpers/getEnv";
import { RouteIndex } from "@/helpers/RouteName";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";

const GoogleLogin = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate();

    const handleLogin = async()=>{
        
         try {
            const { user } = await signInWithPopup(auth, provider);
            if(user)
            {
                const value = {
                    name:user.displayName,
                    email:user.email,
                    avatar:user.photoURL
                }
                 const responses = await axios.post(
                   `${getEnv("VITE_API_BASE_URL")}/auth/google-login`,
                   value
                 );
                 console.log(responses);
                 if (!responses.statusText === "OK") {
                   showToast("error", responses.data.message);
                   return;
                 }
                  dispatch(setUser(responses.data.user))
                 navigate(RouteIndex);
                 showToast("success", responses.data.message);
            }

         } catch (err) {
           console.log(err);
           showToast("error", err.message);
         }


    }
    return (
      <Button className="bg-violet-500 w-full" onClick={handleLogin}>
        <FcGoogle />
        Continue With Google
      </Button>
    );
};

export default GoogleLogin;