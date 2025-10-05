"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import zSchema from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import {
  USER_DASHBOARD,
  WEBSITE_LOGIN,
  WEBSITE_REGISTER,
  WEBSITE_RESETPASSWORD,
} from "@/routes/WebsiteRoute";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { showToast } from "@/lib/showToast";
import axios from "axios";
import OTPVerification from "@/components/Application/OtpVerfification";
import { useDispatch } from "react-redux";
import { login } from "@/store/reducer/authReducer";
import { useRouter, useSearchParams } from "next/navigation";
import { ADMIN_DASHBOARD } from "@/routes/AdminPanelRoutes";
import logo from "@/assets/images/logo_white.png";
const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(false);
  const [otpEmail, setOtpEmail] = useState();
  const [OTPVerificationLoading, setOTPVerificationLoading] = useState();

  const FormSchema = zSchema.pick({
    email: true,
    password: true,
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = async (values) => {
    //console.log("Login data: ", values);
    try {
      setLoading(true);
      const { data: registerResponse } = await axios.post(
        "/api/auth/login",
        values
      );

      if (!registerResponse.success) {
        throw new Error(registerResponse.message);
      }
      setOtpEmail(values.email);
      form.reset();
      showToast("success", registerResponse.message);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (values) => {
    try {
      setOTPVerificationLoading(true);
      const { data: otpResponse } = await axios.post(
        "/api/auth/verify-otp",
        values
      );

      if (!otpResponse.success) {
        throw new Error(otpResponse.message);
      }
      setOtpEmail("");
      showToast("success", otpResponse.message);
      //window.location.href = "/dashboard";
      dispatch(login(otpResponse.data));
      if (searchParams.has("callback")) {
        router.push(searchParams.get("callback"));
      } else {
        otpResponse.data.role === "admin"
          ? router.push(ADMIN_DASHBOARD)
          : router.push(USER_DASHBOARD);
      }
    } catch (error) {
      showToast("error", error.message || "OTP Verification failed");
    } finally {
      setOTPVerificationLoading(false);
    }
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex justify-center">
          <Image
            src={logo}
            width={logo.width}
            height={logo.height}
            alt="logo"
            className="max-w-[150px]"
          />
        </div>
      </CardHeader>
      {!otpEmail ? (
        <CardContent>
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold">Login to Your Account</h1>
            <p>Log in to your account by filling out the form below.</p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLoginSubmit)}
              className="space-y-4"
            >
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={isTypePassword ? "text" : "password"}
                          placeholder="************"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                          onClick={() => setIsTypePassword((prev) => !prev)}
                        >
                          {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <ButtonLoading
                type="submit"
                text="Login"
                className="w-full"
                loading={loading}
              ></ButtonLoading>
            </form>
          </Form>

          {/* Register & Forgot Password Links */}
          <div className="text-center mt-5">
            <div className="flex justify-center items-center gap-1">
              <p>Don't have account?</p>
              <Link href={WEBSITE_REGISTER} className="text-primary underline">
                Create account
              </Link>
            </div>
            <div className="mt-3">
              <Link
                href={WEBSITE_RESETPASSWORD}
                className="text-primary underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </CardContent>
      ) : (
        <CardContent>
          <OTPVerification
            email={otpEmail}
            onSubmit={handleOtpVerification}
            loading={OTPVerificationLoading}
          ></OTPVerification>
        </CardContent>
      )}
    </Card>
  );
};

export default Login;
