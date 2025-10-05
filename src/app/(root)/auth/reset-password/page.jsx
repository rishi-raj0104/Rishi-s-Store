"use client";
import React, { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
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

import { Input } from "@/components/ui/input";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { showToast } from "@/lib/showToast";
import axios from "axios";
import OTPVerification from "@/components/Application/OtpVerfification";
import UpdatePassword from "@/components/Application/UpdatePassword";
import logo from "@/assets/images/logo_white.png";
const ResetPassword = () => {
  const [otpEmail, setOtpEmail] = useState();
  const [emailVerificationLoading, setEmailVerificationLoading] =
    useState(false);
  const [OTPVerificationLoading, setOTPVerificationLoading] = useState();
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const formSchema = zSchema.pick({
    email: true,
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const handleEmailVerification = async (values) => {
    try {
      setEmailVerificationLoading(true);
      const { data: sendOtpResponse } = await axios.post(
        "/api/auth/reset-password/send-otp",
        values
      );
      console.log(sendOtpResponse);
      if (!sendOtpResponse.success) {
        throw new Error(sendOtpResponse.message);
      }
      setOtpEmail(values.email);
      showToast("success", sendOtpResponse.message);
    } catch (error) {
      showToast("error", error.message || "OTP Verification failed");
    } finally {
      setEmailVerificationLoading(false);
    }
  };
  const handleOtpVerification = async (values) => {
    try {
      setOTPVerificationLoading(true);
      const { data: otpResponse } = await axios.post(
        "/api/auth/reset-password/verify-otp",
        values
      );

      if (!otpResponse.success) {
        throw new Error(otpResponse.message);
      }
      //setOtpEmail('');
      showToast("success", otpResponse.message);
      setIsOtpVerified(true);
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
      <CardContent>
        {!otpEmail ? (
          <>
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold">Reset Password</h1>
              <p>Enter your email for password reset.</p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleEmailVerification)}
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

                {/* Submit */}
                <ButtonLoading
                  type="Send Otp"
                  text="Login"
                  className="w-full"
                  loading={emailVerificationLoading}
                ></ButtonLoading>
              </form>
            </Form>
            <div className="text-center mt-5">
              <div className="flex justify-center items-center gap-1">
                <Link href={WEBSITE_LOGIN} className="text-primary underline">
                  Back to Login
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            {!isOtpVerified ? (
              <OTPVerification
                email={otpEmail}
                onSubmit={handleOtpVerification}
                loading={OTPVerificationLoading}
              ></OTPVerification>
            ) : (
              <UpdatePassword email={otpEmail} />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ResetPassword;
