import "./globals.css";
import Header from "../components/header/header";
import { LoadingProvider } from "@/context/loading-context";
import { ProductsProvider } from "@/context/products-context";
import { CartProvider } from "@/context/cart-context";

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
