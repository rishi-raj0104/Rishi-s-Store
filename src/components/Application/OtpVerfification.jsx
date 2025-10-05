"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zSchema from "@/lib/zodSchema";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import ButtonLoading from "./ButtonLoading";
import { showToast } from "@/lib/showToast";
const OTPVerification = ({ email, onSubmit, loading }) => {
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const formSchema = zSchema.pick({
    otp: true,
    email: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      email: email,
    },
  });

  const handleOtpVerification = async (values) => {
    onSubmit(values);
  };

  const ResendOtp = async () => {
    try {
      setIsResendingOtp(true);
      const { data: registerResponse } = await axios.post(
        "/api/auth/resend-otp",
        {email}
      );

      if (!registerResponse.success) {
        throw new Error(registerResponse.message);
      }

      showToast("success", registerResponse.message);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setIsResendingOtp(false);
    }
  };
  return (
    <div>
      <Form {...form}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">
            Please complete verification
          </h1>
          {/* The class name for the <p> tag appears incomplete in the image. */}
          <p className="text-md">
            We have sent an One-time Password (OTP) to your registered email
            address. The OTP is valid for 10 minutes only.
          </p>
        </div>
        <form onSubmit={form.handleSubmit(handleOtpVerification)}>
          <div className="mb-5 mt-5 flex justify-center ">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="font-semibold">
                    One-time Password (OTP)
                  </FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot className="text-xl size-10" index={0} />
                        <InputOTPSlot className="text-xl size-10" index={1} />
                        <InputOTPSlot className="text-xl size-10" index={2} />
                        <InputOTPSlot className="text-xl size-10" index={3} />
                        <InputOTPSlot className="text-xl size-10" index={4} />
                        <InputOTPSlot className="text-xl size-10" index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-3">
            <ButtonLoading
              loading={loading}
              type="submit"
              text="verify"
              className="w-full cursor-pointer"
            ></ButtonLoading>

            <div className="text-center mt-5">
              {!isResendingOtp ? (
                <button
                  onClick={ResendOtp}
                  type="button"
                  className="text-blue-500 cursor-pointer hover:underline"
                >
                  Resend OTP
                </button>
              ) : (
                <span className="text-md">Resending</span>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OTPVerification;
