"use client";
import UserPanelLayout from "@/components/Application/Website/UserPanelLayout";
import WebsiteBreadcrumb from "@/components/Application/Website/WebsiteBreadcrumb";
import useFetch from "@/hooks/useFetch";

import { WEBSITE_ORDER_DETAILS } from "@/routes/WebsiteRoute";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import zSchema from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Dropzone from "react-dropzone";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import userIcon from "@/assets/images/user.png";
const breadCrumbData = {
  title: "Profile",
  links: [{ label: "Profile" }],
};
import { FaCamera } from "react-icons/fa";
import { showToast } from "@/lib/showToast";
import { useDispatch } from "react-redux";
import { login } from "@/store/reducer/authReducer";
import axios from "axios";
const Profile = () => {
  const dispatch = useDispatch();
  const { data: user } = useFetch("/api/profile/get");
  //console.log("user", user);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState();
  const [file, setFile] = useState();

  const formSchema = zSchema.pick({
    name: true,
    phone: true,
    address: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      phone: "",
    },
  });
  useEffect(() => {
    if (user && user.success) {
      const userData = user.data;
      form.reset({
        name: userData?.name,
        phone: userData?.phone,
        address: userData?.address,
      });

      setPreview(userData?.avatar?.url);
    }
  }, [user]);

  const updateProfile = async (values) => {
    setLoading(true);
    try {
      let formData = new FormData();
      if (file) {
        formData.set("file", file);
      }
      formData.set("name", values.name);
      formData.set("phone", values.phone);
      formData.set("address", values.address);

      const { data: response } = await axios.put(
        "/api/profile/update",
        formData
      );
      if (!response.success) {
        throw new Error(response.message);
      }

      showToast("success", response.message);
      dispatch(login(response.data));
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setPreview(preview);
    setFile(file);
  };

  return (
    <div>
      <WebsiteBreadcrumb props={breadCrumbData} />
      <UserPanelLayout>
        <div className="shadow rounded">
          <div className="p-5 text-xl font-semibold border-b">Profile</div>

          <div className="p-5">
            <Form {...form}>
              <form
                className="grid md:grid-cols-2 grid-cols-1 gap-5 space-y-4"
                onSubmit={form.handleSubmit(updateProfile)}
              >
                <div className="md:col-span-2 col-span-1 flex justify-center items-center">
                  <div className="md:col-span-2 col-span-1 flex justify-center items-center">
                    <Dropzone
                      onDrop={(acceptedFiles) =>
                        handleFileSelection(acceptedFiles)
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <Avatar className="w-28 h-28 relative group border border-gray-100">
                            <AvatarImage
                              src={preview ? preview : userIcon.src}
                            />
                            <div className="absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center border-2 border-violet-500 rounded-full group-hover:flex hidden cursor-pointer bg-black/20">
                              <FaCamera color="#7c3aed" />
                            </div>
                          </Avatar>
                        </div>
                      )}
                    </Dropzone>
                  </div>
                </div>

                <div className="mb-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter Your Name"
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            pattern="\d*"
                            maxLength={10}
                            placeholder="Enter Your Phone Number"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 10);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-3 md:col-span-2 col-span-1">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea
                            type="text"
                            placeholder="Enter Your Address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mb-3 md:col-span-2 col-span-1">
                  <ButtonLoading
                    type="submit"
                    text="Save Changes"
                    className="cursor-pointer"
                    loading={loading}
                  ></ButtonLoading>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </UserPanelLayout>
    </div>
  );
};

export default Profile;
