import { CartProvider } from "@/context/cart-context";
import { LoadingProvider } from "@/context/loading-context";
import { ProductsProvider } from "@/context/products-context";

import Header from "../components/header/header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <LoadingProvider>
          <ProductsProvider>
            <CartProvider>
              <Header />
              <main>{children}</main>
            </CartProvider>
          </ProductsProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
