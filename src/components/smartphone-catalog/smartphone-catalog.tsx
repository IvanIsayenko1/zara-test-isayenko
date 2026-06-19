"use client";

import { useEffect } from "react";
import { FilterBar } from "../filter-bar/filter-bar";
import SmartphoneDetail from "../smartphone-detail/smartphone-detail";
import { SmartphoneList } from "../smartphone-list/smartphone-list";

import "./smartphone-catalog.css";
import { useLoading } from "@/context/loading-context";
import { useProducts } from "@/context/products-context";
import { fetchProducts } from "@/services/products";

export default function SmartphoneCatalog() {
  const { setProducts, products } = useProducts();
  const { setLoadingProgress, loadingProgress } = useLoading();
  const isProductsLoaded = products.length > 0 && loadingProgress === 0;

  useEffect(() => {
    setLoadingProgress(50);
    fetchProducts()
      .then((fetchedProducts) => {
        setProducts(fetchedProducts);
      })
      .finally(() => {
        setLoadingProgress(100);
      });
  }, [setProducts, setLoadingProgress]);

  return (
    <div className={`smartphone-catalog ${isProductsLoaded ? "smartphone-catalog--open" : ""}`}>
      {isProductsLoaded && (
        <>
          <FilterBar />
          <SmartphoneList />
          <SmartphoneDetail />
        </>
      )}
    </div>
  );
}
