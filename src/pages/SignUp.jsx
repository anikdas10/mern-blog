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
import { data, Link } from "react-router-dom";
import { RouteSignIn} from "@/helpers/RouteName";
const SignUp = () => {

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
    
         const onSubmit = (value)=>{
            console.log(value);
         }
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Card className="w-sm p-4">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-center mb-5">
            Create Your Account
          </h1>
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
                        <Input placeholder="Enter your password." {...field} />
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
                        <Input placeholder="Confirm Password." {...field} />
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