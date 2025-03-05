import Loading from "@/components/Loading";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getEnv } from "@/helpers/getEnv";
// import { RouteSignIn } from "@/helpers/RouteName";
import { showToast } from "@/helpers/showToast";
import useFetch from "@/hooks/useFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { z } from "zod";
import avatar from "@/assets/user.png"
import { useEffect, useState } from "react";
import { MdOutlineCameraAlt } from "react-icons/md";
import Dropzone from "react-dropzone";
import { setUser } from "@/redux/user/user.slice";

const Profile = () => {
  const [filePreview,setFilePreview] = useState();
  const [file,setFile] = useState();
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user);
    // console.log(user);
    const {
      data: userData,
      loading,
      error,
    } = useFetch(
      `${getEnv("VITE_API_BASE_URL")}/user/get-user/${user?.user?._id}`,{credentials:"include"},null,null,[]
    ); 
    
     const formSchema = z.object({
       name: z.string().min(4, "Name must be at least 4 character long!"),
       email: z.string().email(),
       bio: z.string().min(4, "Bio must be at least 4 character long!"),
       password: z.string(),
     });

        
   const form =
           useForm({
               resolver: zodResolver(formSchema),
               defaultValues: {
                name:"",
                 email: "",
                 bio: "",
                 password:""
               },
   });

   useEffect(() => {
     if (userData?.success) {
       form.reset({
         name: userData.user.name || "",
         email: userData.user.email || "",
         bio: userData.user.bio || "",
         password: "", // Reset password field
       });
     }
   }, [userData, form.reset]); 

   const onSubmit = async (value) => {
               const formData = new FormData();
               formData.append("file",file);
               formData.append("value", JSON.stringify(value));

                try {
                  const responses = await axios.patch(
                    `${getEnv("VITE_API_BASE_URL")}/user/update-user/${userData?.user?._id}`,
                    formData
                  );
                  console.log(responses);

                  if (!responses.statusText === "OK") {
                    showToast("error", responses.data.message);
                    return;
                  }
                 dispatch(setUser(responses.data.user))
                  showToast("success", responses.data.message);
                } catch (err) {
                  console.log(err);
                  showToast("error", err.message);
                }
   };

  //  image handle
  const handleFileSelection = (files)=>{
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file)
    // console.log(preview);
    setFilePreview(preview)

  }


  // error
if(error)
{
  return showToast("error",error.message)
}
if (loading) {
  return <Loading/>
}
  return (
    <Card className="max-w-screen-md mx-auto">
      <CardContent>
        <div className="flex items-center justify-center mt-10">
          <Dropzone
            onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Avatar className="w-28 h-28 relative group">
                  <AvatarImage
                    src={
                      filePreview
                        ? filePreview
                        : userData?.user?.avatar || avatar
                    }
                  />
                  <div className="absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  justify-center items-center bg-black opacity-30 border-2 border-violet-500 rounded-full group-hover:flex hidden cursor-pointer">
                    <MdOutlineCameraAlt color="#7c3aed" />
                  </div>
                </Avatar>
              </div>
            )}
          </Dropzone>
        </div>

        {/* form */}
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          
                          placeholder="Enter your name."
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email address."
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>bio</FormLabel>
                      <FormControl>
                        <Textarea type="text" placeholder="Bio." {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          name="password"
                          placeholder="Enter Your Password."
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-5">
                <Button type="submit" className="w-full bg-violet-600">
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
