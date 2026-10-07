import Image from "next/image";
import baseUrl from "../../services/baseUrl";

const getProduct = async (slug) => {
  const res = await fetch(`${baseUrl}api/products/${slug}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  return res.json();
};

const ProductDetailsPage = async ({ params }) => {
  const { slug } = await params;

  const product = await getProduct(slug);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="cursor-pointer transition hover:text-blue-600">
            Home
          </span>

          <span>/</span>

          <span className="capitalize">Products</span>

          <span>/</span>

          <span className="font-medium text-slate-900">{slug}</span>
        </div>
      </div>

      {/* Product Details */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-2">
            {/* Product Image Area */}
            <div className="relative flex min-h-[450px] items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-100 p-10">
              {/* Badge */}
              <span className="absolute left-6 top-6 rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
                ✓ In Stock
              </span>

              {/* Decorative Circle */}
              <div className="absolute h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />

              {/* Placeholder Product */}
              <div className="relative flex h-72 w-72 items-center justify-center rounded-3xl border border-white bg-white/80 shadow-xl backdrop-blur">
                <div className="text-center">
               

                  <Image
                    src={product?.image}
                    alt={product?.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="p-8 lg:p-12">
              {/* Category */}
              <div className="mb-5 flex items-center gap-3">
                <span className="rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold capitalize text-blue-600">
                  Technology
                </span>

                <span className="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-600">
                  Premium
                </span>
              </div>

              {/* Product Name */}
              <h1 className="break-words text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                {slug
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </h1>

              {/* Rating */}
              <div className="mt-5 flex items-center gap-3">
                <div className="flex items-center gap-1 text-yellow-500">
                  ★ ★ ★ ★ ★
                </div>

                <span className="text-sm text-slate-500">4.8 / 5</span>
              </div>

              {/* Description */}
              <p className="mt-6 max-w-xl leading-7 text-slate-500">
                Experience powerful performance and reliable technology designed
                for demanding workloads. This product delivers excellent
                performance for both everyday tasks and professional
                applications.
              </p>

              {/* Price */}
              <div className="mt-8 rounded-2xl bg-slate-50 p-6">
                <p className="text-sm font-medium text-slate-500">
                  Current Price
                </p>

                <div className="mt-2 flex items-end gap-3">
                  <span className="text-4xl font-black text-slate-900">
                    ৳55,000
                  </span>

                  <span className="mb-1 text-lg text-slate-400 line-through">
                    ৳52,000
                  </span>
                </div>

                {/* Price Trend */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-600">
                    ↑ 5.8%
                  </span>

                  <span className="text-sm text-slate-500">
                    Price increased
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button className="flex flex-1 items-center justify-center rounded-xl bg-blue-600 px-6 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700">
                  Buy Now
                  <span className="ml-2">↗</span>
                </button>

                <button className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-4 font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-600">
                  ♡ Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-7">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Technical Details
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Specifications
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm text-slate-400">Cores</p>

              <p className="mt-2 text-lg font-bold text-slate-900">16 Cores</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm text-slate-400">Threads</p>

              <p className="mt-2 text-lg font-bold text-slate-900">
                32 Threads
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm text-slate-400">Base Clock</p>

              <p className="mt-2 text-lg font-bold text-slate-900">4.5 GHz</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm text-slate-400">Boost Clock</p>

              <p className="mt-2 text-lg font-bold text-slate-900">5.7 GHz</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm text-slate-400">Socket</p>

              <p className="mt-2 text-lg font-bold text-slate-900">AM5</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm text-slate-400">TDP</p>

              <p className="mt-2 text-lg font-bold text-slate-900">170W</p>
            </div>
          </div>
        </div>
      </section>

      {/* Store Comparison */}
    </main>
  );
};

export default ProductDetailsPage;
