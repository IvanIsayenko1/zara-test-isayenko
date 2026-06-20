import "./globals.css";
import Header from "../components/header/header";
import { LoadingProvider } from "@/context/loading-context";
import { ProductsProvider } from "@/context/products-context";

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
            <Header />
            <main>{children}</main>
          </ProductsProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
