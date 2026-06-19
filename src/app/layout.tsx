import "./globals.css";
import Header from "../components/header/header";
import { LoadingProvider } from "@/context/loading-context";
import { ProductsProvider } from "@/context/products-context";
import { SmartphoneDetailProvider } from "@/context/smartphone-detail-context";

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
            <SmartphoneDetailProvider>
              <Header />
              <main>{children}</main>
            </SmartphoneDetailProvider>
          </ProductsProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
