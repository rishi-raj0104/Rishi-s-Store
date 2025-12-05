"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WEBSITE_HOME } from "@/routes/WebsiteRoute";
import { use } from "react";
import verifiedSImg from "@/assets/images/verified.gif";
import verifiedImgFail from "@/assets/images/verification-failed.gif";

const verifiedImg = {
  src: verifiedSImg,
  height: 120,
};

const verificationFailedImg = {
  src: verifiedImgFail,
  height: 100,
};

const EmailVerification = ({ params }) => {
  const { token } = use(params);
  const [isVerified, setIsVerified] = useState(null);

  useEffect(() => {
    const verify = async () => {
      try {
        const { data: verificationResponse } = await axios.post(
          "/api/auth/verify-email",
          { token }
        );
        if (verificationResponse.success) {
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      } catch (err) {
        setIsVerified(false);
      }
    };

    verify();
  }, [token]);

  return (
    <Card className="w-[400px] mx-auto mt-10">
      <CardContent className="p-6">
        {isVerified === null ? (
          <p className="text-center">Verifying your email...</p>
        ) : isVerified ? (
          <div>
            <div className="flex justify-center items-center">
              <Image
                src={verifiedImg.src}
                height={verifiedImg.height}
                width={verifiedImg.height}
                alt="Verified"
                priority
              />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-green-500 my-5">
                Email verification success!
              </h1>
              <Button asChild>
                <Link href={WEBSITE_HOME}>Continue Shopping</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="flex justify-center items-center">
              <Image
                src={verificationFailedImg.src}
                height={verificationFailedImg.height}
                width={verificationFailedImg.height}
                alt="Failed"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold text-red-500 my-5">
              Email verification failed.
            </h1>
            <Button asChild>
              <Link href={WEBSITE_HOME}>Go Back</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailVerification;
