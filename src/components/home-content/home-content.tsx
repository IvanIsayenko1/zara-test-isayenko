"use client";

import { FilterBar } from "../filter-bar/filter-bar";
import SmartphoneDetail from "../smartphone-detail/smartphone-detail";
import { SmartphoneList } from "../smartphone-list/smartphone-list";
import { HomeProvider } from "@/context/home-context";

import "./home-content.css";

export default function HomeContent() {
  return (
    <div className="home-content">
      <HomeProvider>
        <FilterBar />
        <SmartphoneList />
        <SmartphoneDetail />
      </HomeProvider>
    </div>
  );
}
