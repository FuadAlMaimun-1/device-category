"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ProductList = ({ products }) => {
  const [search, setSearch] = useState("");

  const filterData = products.filter((product) => {
    if (!search.trim()) {
      return true;
    }

    return (
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.brand.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      {/* Search */}
      <div className="mb-12 text-center">
        <div className="mx-auto mt-4 flex max-w-3xl items-center rounded-full border border-slate-200 bg-white p-2 shadow-[0_10px_40px_rgba(37,99,235,0.10)] transition-all duration-300 focus-within:border-blue-400 focus-within:shadow-[0_15px_45px_rgba(37,99,235,0.15)]">
          {/* Search Icon */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>

          {/* Input */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search for products, brands or categories..."
            className="h-12 min-w-0 flex-1 bg-transparent px-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 sm:text-base"
          />

          {/* Button */}
          <button
            type="button"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-blue-700 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m-6-6 6 6-6 6"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Explore Our Products
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-gray-500">
          Discover the latest computer components and tech products at
          competitive prices.
        </p>
      </div>

      {/* Product Grid */}
      {filterData.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filterData.map((product) => {
            const discount =
              product.previousPrice && product.currentPrice
                ? Math.round(
                    ((product.previousPrice - product.currentPrice) /
                      product.previousPrice) *
                      100,
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
                    <span className="absolute left-4 top-4 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                      -{discount}%
                    </span>
                  )}

                  {product.trend === "down" && (
                    <span className="absolute right-4 top-4 z-10 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      ↓ Price Drop
                    </span>
                  )}

                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Category & Brand */}
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold capitalize text-blue-600">
                      {product.category}
                    </span>

                    <span className="text-xs font-medium text-gray-500">
                      {product.brand}
                    </span>
                  </div>

                  {/* Name */}
                  <h2 className="min-h-14 text-lg font-bold leading-7 text-gray-900 transition-colors group-hover:text-blue-600">
                    {product.name}
                  </h2>

                  {/* Description */}
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="mt-4 flex items-end gap-3">
                    <span className="text-2xl font-extrabold text-gray-900">
                      ৳{product.currentPrice.toLocaleString()}
                    </span>

                    {product.previousPrice && (
                      <span className="mb-1 text-sm text-gray-400 line-through">
                        ৳{product.previousPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Price Trend */}
                  <div className="mt-3 flex items-center justify-between">
                    <span
                      className={`text-sm font-semibold ${
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
                    className="mt-5 flex w-full items-center justify-center rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-600"
                  >
                    View Details
                    <span className="ml-2 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="py-10 text-center text-slate-500">No products found.</p>
      )}
    </>
  );
};

export default ProductList;
