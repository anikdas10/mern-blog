import React, { useEffect } from 'react';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import slugify from 'slugify';
import axios from 'axios';
import { getEnv } from '@/helpers/getEnv';
import { showToast } from '@/helpers/showToast';


const AddCategory = () => {
    const formSchema = z.object({
      name: z.string().min(4,"Name must be at least 4 character long."),
      slug: z
        .string()
        .min(4, "Slug must be at least 4 character long!"),
    });

    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        slug: "",
      },
    });


    useEffect(()=>{
        const categoryName = form.watch("name");
        if(categoryName){
            const slug = slugify(categoryName,{lower:true})
            form.setValue("slug",slug)
        }
    })

    const onSubmit = async (value) => {
    //   console.log(value);

       try {
         const responses = await axios.post(
           `${getEnv("VITE_API_BASE_URL")}/category/add`,
           value
         );
        //  console.log(responses);

         if (!responses.statusText === "OK") {
           showToast("error", responses.data.message);
           return;
          }
          form.reset();
         showToast("success", responses.data.message);
       } catch (err) {
        //  console.log(err);
         showToast("error", err.message);
       }
    
    };

    return (
     
        <Card className="pt-5 max-w-md mx-auto">
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="slug." {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-5">
                  <Button type="submit" className="w-full bg-violet-600">
                    Add
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      
    );
};

export default AddCategory;