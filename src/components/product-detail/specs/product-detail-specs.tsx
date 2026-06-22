import { ProductDetail } from "@/types/product";

import "./product-detail-specs.css";

export default function ProductDetailSpecs({ product }: { product: ProductDetail }) {
  return (
    <div className="product-detail-specs">
      <div className="product-detail-specs__title">SPECIFICATIONS</div>
      <div className="product-detail-specs__specs">
        <ProductDetailSpec title="brand" value={product.brand} />
        <ProductDetailSpec title="name" value={product.name} />
        <ProductDetailSpec title="description" value={product.description} />
        <ProductDetailSpec title="screen" value={product.specs.screen} />
        <ProductDetailSpec title="resolution" value={product.specs.resolution} />
        <ProductDetailSpec title="processor" value={product.specs.processor} />
        <ProductDetailSpec title="main camera" value={product.specs.mainCamera} />
        <ProductDetailSpec title="selfie camera" value={product.specs.selfieCamera} />
        <ProductDetailSpec title="battery" value={product.specs.battery} />
        <ProductDetailSpec title="os" value={product.specs.os} />
        <ProductDetailSpec title="screen refresh rate" value={product.specs.screenRefreshRate} />
      </div>
    </div>
  );
}

function ProductDetailSpec({ title, value }: { title: string; value: string }) {
  return (
    <div className="product-detail-specs__spec">
      <div className="product-detail-specs__spec__title">{title}</div>
      <div className="product-detail-specs__spec__value">{value}</div>
    </div>
  );
}
