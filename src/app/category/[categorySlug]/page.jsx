import React from "react";
import baseUrl from "../../services/baseUrl";
import Link from "next/link";
import Image from "next/image";

const getCategoryProducts = async (categorySlug) => {
  const res = await fetch(
    `${baseUrl}api/products?category=${categorySlug}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch category products");
  }

  const data = await res.json();

  return data;
};

const Page = async ({ params }) => {
  const { categorySlug } = await params;

  const categoryProduct = await getCategoryProducts(categorySlug);

  console.log("Category Slug:", categorySlug);
  console.log("Category Product:", categoryProduct);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Container */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link
            href="/"
            className="transition hover:text-blue-600"
          >
            Home
          </Link>

          <span>→</span>

          <span className="font-medium capitalize text-gray-900">
            {categorySlug}
          </span>
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-blue-600">
              Product Category
            </p>

            <h1 className="text-3xl font-bold capitalize text-gray-900 sm:text-4xl">
              {categorySlug}
            </h1>

            <p className="mt-2 text-gray-500">
              Explore the best {categorySlug} products at the best prices.
            </p>
          </div>

          <div className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm ring-1 ring-gray-200">
            {categoryProduct.length} Products
          </div>
        </div>

        {/* Products */}
        {categoryProduct.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryProduct.map((product) => {
              const discount =
                product.previousPrice && product.currentPrice
                  ? Math.round(
                      ((product.previousPrice - product.currentPrice) /
                        product.previousPrice) *
                        100
                    )
                  : 0;

              return (
                <div
                  key={product._id}
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gray-50 p-5">
                    {discount > 0 && (
                      <span className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                        -{discount}%
                      </span>
                    )}

                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Brand */}
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
                      {product.brand}
                    </p>

                    {/* Product name */}
                    <h2 className="line-clamp-2 min-h-12 text-lg font-semibold text-gray-900">
                      {product.name}
                    </h2>

                    {/* Description */}
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                      {product.description}
                    </p>

                    {/* Price */}
                    <div className="mt-4 flex items-center gap-3">
                      <span className="text-2xl font-bold text-gray-900">
                        ৳{product.currentPrice.toLocaleString()}
                      </span>

                      {product.previousPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ৳{product.previousPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Trend */}
                    <div className="mt-3 flex items-center justify-between">
                      <span
                        className={`text-sm font-medium ${
                          product.trend === "down"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {product.trend === "down"
                          ? `↓ ${Math.abs(product.trendPercent)}%`
                          : `↑ ${Math.abs(product.trendPercent)}%`}
                      </span>

                      <span className="text-xs text-gray-400">
                        {product.unit}
                      </span>
                    </div>

                    {/* Button */}
                    <Link
                      href={`/product/${product.slug}`}
                      className="mt-5 block rounded-xl bg-gray-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-600"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty state */
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl">
              📦
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              No products found
            </h2>

            <p className="mt-2 text-gray-500">
              There are no products available in this category yet.
            </p>

            <Link
              href="/"
              className="mt-6 inline-block rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;