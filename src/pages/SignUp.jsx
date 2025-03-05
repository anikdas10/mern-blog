import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { data, Link, Navigate, useNavigate } from "react-router-dom";
import { RouteSignIn} from "@/helpers/RouteName";
import { getEnv } from '@/helpers/getEnv';
import axios from 'axios';
import { showToast } from '@/helpers/showToast';
import GoogleLogin from '@/components/GoogleLogin';


const SignUp = () => {
  // console.log(getEnv("VITE_API_BASE_URL"));

  const navigate = useNavigate();
    const formSchema = z.object({
      name: z.string().min(4, "Name must be at least 4 character long!"),
      email: z.string().email(),
      password: z
        .string()
        .min(6, "Password must be at least 6 character long!"),
      confirmPassword: z.string().refine(data=>data.password === data.confirmPassword,"Password and Confirm Password should be same."),
    });
    
     const form =
       useForm({
           resolver: zodResolver(formSchema),
           defaultValues: {
             email: "",
             password:""
           },
         });
    
         const onSubmit = async (value)=>{
           try{
              const responses = await axios.post(
                `${getEnv("VITE_API_BASE_URL")}/auth/register`,
                value
              );
              console.log(responses);

              if (!responses.statusText==="OK") {
                showToast("error", responses.data.message);
                return;
              }
            navigate(RouteSignIn)
            showToast("success",responses.data.message)

           }
           catch(err){
            console.log(err);
            showToast("error",err.message)
           }
         }
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Card className="w-sm p-4">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-center mb-5">
            Create Your Account
          </h1>
          <div>
            <GoogleLogin />
            <div className="border-2 my-5 flex items-center justify-center">
              <span className="absolute bg-white px-1">Or</span>
            </div>
          </div>
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
                        <Input placeholder="Enter your name." {...field} />
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password."
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
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm Password."
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
                  Sign Up
                </Button>
              </div>
              <div className="text-sm flex items-center justify-center gap-2">
                <p>Already have an account?</p>
                <Link
                  className="font-bold text-violet-700 hover:underline"
                  to={RouteSignIn}
                >
                  Sign In
                </Link>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    );
};

export default SignUp;