"use client";
import { Product } from "@/types/Users";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Cart {
  productId: Product;
  quantity: number;
}

const UserPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [cart, setCart] = useState<Cart[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/user/products");
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const addToCart = (product: Product) => {
    if (
      cart.length > 0 &&
      cart[0].productId.manufacturerId?._id !== product.manufacturerId?._id
    ) {
      toast.error("You can only add one type manufacturer product at a time.");
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.productId._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item.productId._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { productId: product, quantity: 1 }];
      }
    });
  };

  const buyNow = (cart: Cart[]) => {
    const res = axios.post("/api/user/place-order", { cart });
    toast.promise(res, {
      loading: "Placing your order...",
      success: "Order Placed Successfully.",
      error: "Something went wrong!!",
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory = category ? product.category === category : true;
      return matchesSearch && matchesCategory;
    });

    setFilteredProducts(filtered);
  }, [search, category, products]);

  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-center uppercase">
        Browse Products
      </h1>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name"
          className="input input-bordered input-primary w-full max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select select-primary w-full max-w-xs"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Vegetable">Vegetable</option>
          <option value="Fruit">Fruit</option>
          <option value="Grain">Grain</option>
          <option value="Dairy">Dairy</option>
          <option value="Meat">Meat</option>
          <option value="Beverage">Beverage</option>
          <option value="Snack">Snack</option>
          <option value="Condiment">Condiment</option>
          <option value="Seafood">Seafood</option>
          <option value="Herb">Herb</option>
          <option value="Spice">Spice</option>
          <option value="Nut">Nut</option>
          <option value="Seed">Seed</option>
          <option value="Mushroom">Mushroom</option>
          <option value="Flower">Flower</option>
          <option value="Root">Root</option>
        </select>
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-base-content/50 mt-6">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition"
            >
              <figure className="h-52 bg-base-200">
                <img
                  src={product.imageUrl || "/placeholder.jpg"}
                  alt={product.name}
                  className="object-contain h-full p-4"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title justify-between">
                  {product.name}
                  <div className="badge badge-secondary">
                    {product.category}
                  </div>
                </h2>
                <p className="text-sm text-base-content/70">
                  {product.description}
                </p>
                <p className="text-sm text-base-content">
                  By:{" "}
                  <span className="font-semibold">
                    {product.manufacturerId?.name || "N/A"}
                  </span>
                </p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-xl font-bold text-primary">
                    ₹{product.price}
                  </span>
                  <span className="text-sm text-base-content/50">
                    Stock: {product.stock}
                  </span>
                </div>
                <div className="card-actions mt-4 justify-between">
                  <button
                    className="btn btn-outline"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => buyNow(cart)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold mb-2">🛒 Cart Summary</h2>
          <p className="text-base text-base-content mb-4">
            You have added <strong>{cart[0].productId.name}</strong> with
            quantity <strong>{cart[0].quantity}</strong>.
          </p>

          <div className="overflow-x-auto w-full">
            <table className="table table-zebra w-full max-w-4xl mx-auto">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Price (₹)</th>
                  <th>Subtotal (₹)</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={item.productId._id}>
                    <td>{index + 1}</td>
                    <td>{item.productId.name}</td>
                    <td>{item.productId.category}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.productId.price}</td>
                    <td>₹{item.productId.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={5} className="text-right">
                    Total
                  </th>
                  <th>
                    ₹
                    {cart.reduce(
                      (total, item) =>
                        total + item.productId.price * item.quantity,
                      0
                    )}
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>

          <button
            className="btn btn-success mt-6"
            onClick={() => {
              buyNow(cart);
            }}
          >
            🛍️ Buy Now
          </button>
        </div>
      )}
    </>
  );
};

export default UserPage;
