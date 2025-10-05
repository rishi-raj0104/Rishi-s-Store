import GlobalProvider from "@/components/Application/GlobalProvider";
import "./globals.css";
import { Assistant } from "next/font/google";
import { ToastContainer } from "react-toastify";
const assistant = Assistant({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Rishi's Store",
  description:
    "Rishi's Store offers a wide range of quality products at affordable prices. Fast delivery and excellent customer support.",
  keywords: [
    "online store",
    "shopping",
    "products",
    "Rishi's Store",
    "ecommerce",
  ],
  authors: [{ name: "Rishi Raj" }],
  icons: "favicon.png",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <body className={`${assistant.className} antialiased`}>
        <GlobalProvider>
          <ToastContainer />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
