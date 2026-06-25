import { NextResponse } from "next/server";

import { fetchProducts } from "@/services/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") ?? "";
  const limit = Number(searchParams.get("limit") ?? 20);

  const products = await fetchProducts({
    search,
    limit: Number.isFinite(limit) ? limit : 20,
  });

  return NextResponse.json(products);
}
