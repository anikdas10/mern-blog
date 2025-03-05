import React, { useEffect, useState } from "react";
import { z } from "zod";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import slugify from "slugify";
import axios from "axios";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/Loading";
import Dropzone from "react-dropzone";

import Editor from "./Editor";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RouteBlog } from "@/helpers/RouteName";

const AddBlog = () => {
const [filePreview,setFilePreview] = useState();
  const [file,setFile] = useState();
  const user = useSelector(state=>state.user)
// console.log(user.user);
const navigate = useNavigate();
     const {
       data: categoryData,
       loading,
     } = useFetch(
       `${getEnv("VITE_API_BASE_URL")}/category/all-category`,
       { credentials: "include" },
       null,
       "data",
       []
     );
    //  console.log(categoryData);

  const formSchema = z.object({
    category: z.string(),
    title: z.string().min(4, "Title must be at least 4 character long."),
    slug: z.string().min(4, "Slug must be at least 4 character long!"),
    blogContent: z.string().min(4, "Blog content must be at least 4 character long!"),
    
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      title: "",
      slug: "",
      blogContent: "",
    },
  });

  const handleEditorData = (event,editor)=>{
    const data = editor.getData();
    form.setValue("blogContent",data)

  }

 const blogTitle = form.watch("title");
  useEffect(() => {
   
    if (blogTitle) {
      const slug = slugify(blogTitle, { lower: true });
      form.setValue("slug", slug);
    }
  },[blogTitle]);

  const onSubmit = async (value) => {
    console.log(value);
    const newValue = {...value,author:user.user._id};
      const formData = new FormData();
      formData.append("file", file);
      formData.append("value", JSON.stringify(newValue));

      try {
        const responses = await axios.post(
          `${getEnv("VITE_API_BASE_URL")}/blog/add`,
          formData
        );
        console.log(responses);

        if (!responses.statusText === "OK") {
          showToast("error", responses.data.message);
          return;
        }
        form.reset();
        setFile();
        setFilePreview();
        navigate(RouteBlog)
        showToast("success", responses.data.message);
      } catch (err) {
        showToast("error", err.message);
      }
  };

   const handleFileSelection = (files) => {
     const file = files[0];
     const preview = URL.createObjectURL(file);
     setFile(file);
     // console.log(preview);
     setFilePreview(preview);
   };

  if(loading)
  {
    return <Loading/>
  }
  return (
    <div className="md:max-w-2xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-5">
      <Card className="pt-5 ">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Blog Title." {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                       
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValues={field.value}>
                          <SelectTrigger className="">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categoryData &&
                              categoryData.map((category) => (
                                <SelectItem
                                  key={category._id}
                                  value={category._id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
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
              <div className="mb-3">
                <span className="mb-2 block">Featured Image</span>
                <Dropzone
                  onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="flex items-center justify-center w-28 h-28 border-2 border-dashed rounded cursor-pointer">
                        <img src={filePreview} alt="" />
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="blogContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Content</FormLabel>
                      <FormControl>
                        <Editor  props={{ initialData: "",onChange:handleEditorData }} />
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
    </div>
  );
};

export default AddBlog;
