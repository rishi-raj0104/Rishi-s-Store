import React from "react";
import Image from "next/image";
import loadingSvg from "@/assets/images/loading_new.svg";
const Loading = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-start mt-12">
      <Image src={loadingSvg} width={80} height={80} alt="Loading" />
    </div>
  );
};

export default Loading;
