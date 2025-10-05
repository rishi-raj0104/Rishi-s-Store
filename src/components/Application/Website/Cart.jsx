"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BsCart2 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import imgPlaceholder from "@/assets/images/img-placeholder.webp";
import Image from "next/image";
import { removeFromCart } from "@/store/reducer/cartReducer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WEBSITE_CART, WEBSITE_CHECKOUT } from "@/routes/WebsiteRoute";
import { useEffect, useState } from "react";
const Cart = () => {
  const [open, setOpen] = useState();
  const [subtotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalSellingPrice, setTotalSellingPrice] = useState(0);
  const cart = useSelector((store) => store.cartStore);
  const dispatch = useDispatch();

  useEffect(() => {
    const cartProducts = cart.products;
    const totalAmount = cartProducts.reduce(
      (sum, product) => sum + product.sellingPrice * product.qty,
      0
    );
    const totalMrp = cartProducts.reduce(
      (sum, product) => sum + product.mrp,
      0
    );
    const discount = cartProducts.reduce(
      (sum, product) =>
        sum + (product.mrp - product.sellingPrice) * product.qty,
      0
    );
    setTotalSellingPrice(totalMrp);
    setSubTotal(totalAmount);
    setDiscount(discount);
  }, [cart]);

  return (
    <Sheet open={open} onOpenChane={setOpen}>
      <SheetTrigger className="relative">
        <BsCart2 size={25} className="text-gray-500 hover:text-primary" />
        <span className="absolute bg-red-500 text-white text-xs rounded-full w-4 h-4 flex justify-center items-center -right-2 -top-1">
          {cart.count}
        </span>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[450px] w-full">
        <SheetHeader className="py-2">
          <SheetTitle className="text-2xl">My Cart</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <div className="h-[calc(100vh-40px)] pb-10 ">
          <div className="h-[calc(100%-120px)] overflow-auto px-2">
            {cart.count === 0 && (
              <div className="h-full flex justify-center items-center text-xl font-semibold">
                Your Cart Is Empty.
              </div>
            )}

            {cart.products?.map((product) => (
              <div
                key={product.variantId}
                className="flex justify-between items-center gap-5 mb-4 border-b pb-4"
              >
                <div className="flex gap-5 items-center">
                  <Image
                    src={product?.media || imgPlaceholder.src}
                    height={100}
                    width={100}
                    alt={product.name}
                    className="w-20 h-20 rounded"
                  />
                  <div>
                    <h4 className="text-lg mb-1">{product.name}</h4>
                    <p className="text-gray-500">
                      {product.size}/{product.color}
                    </p>
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    className="text-red-500 underline underline-offset-1 mb-2"
                    onClick={() =>
                      dispatch(
                        removeFromCart({
                          productId: product.productId,
                          variantId: product.variantId,
                        })
                      )
                    }
                  >
                    Remove
                  </button>
                  <p className="font-semibold">
                    {product.qty} X{" "}
                    {product.sellingPrice.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="h-28 border-t pt-5 px-2">
            <h2 className="flex justify-between items-center text-lg font-semibold">
              <span>Subtotal</span>
              <span>
                {totalSellingPrice.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
            </h2>
            <h2 className="flex justify-between items-center text-lg font-semibold">
              <span>Discount</span>
              <span>
                {discount.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
            </h2>
            <h2 className="flex justify-between items-center text-lg font-semibold">
              <span>Total</span>
              <span>
                {subtotal.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
            </h2>
            <div className="flex justify-between mt-3 gap-5 ">
              <Button
                type="button"
                asChild
                variant="secondary"
                className="w-[200px]"
                onClick={() => setOpen(false)}
              >
                <Link href={WEBSITE_CART}>View Cart</Link>
              </Button>
              <Button
                type="button"
                asChild
                className="w-[200px]"
                onClick={() => setOpen(false)}
              >
                {cart.count ? (
                  <Link href={WEBSITE_CHECKOUT}>Checkout</Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => showToast("error", "Your cart is empty!")}
                  >
                    Checkout
                  </button>
                )}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
