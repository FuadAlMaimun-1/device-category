import baseUrl from "../services/baseUrl";
import ProductCard from "./ProductCard";

const getProducts = async () => {
  const res = await fetch(`${baseUrl}api/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data;
};

const HomePage = async () => {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <ProductCard products={products} />
      </div>
    </main>
  );
};

export default HomePage;