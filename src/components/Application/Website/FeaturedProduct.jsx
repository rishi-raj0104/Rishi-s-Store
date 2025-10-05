// import axios from "axios";
// import Link from "next/link";
// import React from "react";
// import { IoIosArrowRoundForward } from "react-icons/io";
// import ProductBox from "./ProductBox";

// const FeaturedProduct = async () => {
//   let productData = null;
//   try {
//     const { data } = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/get-featured-product`
//     );
//     productData = data;
//   } catch (error) {
//     console.log(error);
//   }
//   //console.log("productData", productData);
//   if (!productData) {
//     return null;
//   }
//   return (
//     <section className="lg:px-32 px-4 sm:py-10">
//       <div className="flex justify-between items-center mb-5">
//         <h2 className="sm:text-4xl text-2xl font-semibold">
//           Featured Products
//         </h2>
//         <Link
//           href="#"
//           className="flex items-center gap-2 underline underline-offset-4 hover:text-primary"
//         >
//           View All
//           <IoIosArrowRoundForward />
//         </Link>
//       </div>
//       <div className="grid md:grid-cols-4 grid-cols-2 sm:gap-10 gap-2">
//         {!productData.success && (
//           <div className="text-center py-5">Data Not Found.</div>
//         )}
//         {productData.success &&
//           productData.data.map((product) => (
//             <ProductBox key={product._id} product={product} />
//           ))}
//       </div>
//     </section>
//   );
// };

// export default FeaturedProduct;
import axios from "axios";
import Link from "next/link";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import ProductBox from "./ProductBox";
import { WEBSITE_SHOP } from "@/routes/WebsiteRoute";

const FeaturedProduct = async () => {
  let productData = null;
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/get-featured-product`
    );
    productData = data;
  } catch (error) {
    console.log(error);
  }

  if (!productData) {
    return null;
  }

  return (
    <section className="lg:px-32 px-4 sm:py-10 py-6 bg-gradient-to-b from-white via-gray-50 to-white rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
        <h2 className="sm:text-4xl text-2xl font-semibold tracking-tight text-gray-900">
          Featured Products
        </h2>
        <Link
          href={WEBSITE_SHOP}
          className="flex items-center gap-1 sm:gap-2 text-gray-700 font-medium hover:text-primary transition-colors duration-200 underline underline-offset-4"
        >
          View All
          <IoIosArrowRoundForward className="text-2xl" />
        </Link>
      </div>

      <div className="grid md:grid-cols-4 grid-cols-2 sm:gap-5 gap-3 sm:mt-4">
        {!productData.success && (
          <div className="col-span-full text-center text-gray-500 py-5 text-lg font-medium">
            No Products Found
          </div>
        )}

        {productData.success &&
          productData.data.map((product) => (
            <div
              key={product._id}
              className="hover:-translate-y-1 transition-transform duration-300"
            >
              <ProductBox product={product} />
            </div>
          ))}
      </div>
    </section>
  );
};

export default FeaturedProduct;
