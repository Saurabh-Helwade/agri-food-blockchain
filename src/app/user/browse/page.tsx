"use client";
import { Product } from "@/types/Users";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";  // <-- import useRouter

interface Cart {
  productId: Product;
  quantity: number;
}

const saveCartToStorage = (cart: Cart[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const loadCartFromStorage = (): Cart[] => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

const UserPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [cart, setCart] = useState<Cart[]>([]);
  const router = useRouter();  // <-- instantiate router

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/user/products");
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const updateCart = (updatedCart: Cart[]) => {
    setCart(updatedCart);
    saveCartToStorage(updatedCart);
  };

  const addToCart = (product: Product) => {
    const existing = cart.find((item) => item.productId._id === product._id);
    if (
      cart.length > 0 &&
      cart[0].productId.manufacturerId?._id !== product.manufacturerId?._id
    ) {
      toast.error("You can only add one manufacturer's products at a time.");
      return;
    }

    const updatedCart = existing
      ? cart.map((item) =>
          item.productId._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { productId: product, quantity: 1 }];

    updateCart(updatedCart);
    toast.success("Added to cart");
  };

  const incrementQuantity = (productId: string) => {
    const updatedCart = cart.map((item) =>
      item.productId._id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    updateCart(updatedCart);
  };

  const decrementQuantity = (productId: string) => {
    const updatedCart = cart
      .map((item) =>
        item.productId._id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(updatedCart);
  };

  const buyNow = async (product: Product) => {
    const resPromise = axios.post("/api/user/place-order", {
      cart: [{ productId: product, quantity: 1 }],
    });

    toast.promise(resPromise, {
      loading: "Placing your order...",
      success: "Order placed successfully!",
      error: "Something went wrong.",
    });

    try {
      await resPromise;
      router.push("/user/orders");  // <-- redirect after success
    } catch {
      // error handled by toast.promise
    }
  };

  useEffect(() => {
    fetchProducts();
    setCart(loadCartFromStorage());
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

      {/* Filter + Cart Row */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 flex-wrap">
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
          {[
            "Vegetable",
            "Fruit",
            "Grain",
            "Nut",
            "Seed",
            "Mushroom",
            "Flower",
            "Root",
          ].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <Link href="/user/cart">
          <button className="btn btn-primary">
            🛒 Go to Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </button>
        </Link>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-base-content/50 mt-6">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const cartItem = cart.find(
              (item) => item.productId._id === product._id
            );

            return (
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
                    <div className="badge badge-secondary">{product.category}</div>
                  </h2>
                  <p className="text-sm text-base-content/70">{product.description}</p>
                  <p className="text-sm text-base-content">
                    By:{" "}
                    <span className="font-semibold">
                      {product.manufacturerId?.name || "N/A"}
                    </span>
                  </p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-lg font-bold text-primary">
                      ₹{product.price}
                    </span>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => buyNow(product)}
                    >
                      Buy Now
                    </button>
                  </div>

                  {/* Add to cart or quantity counter */}
                  {!cartItem ? (
                    <button
                      className="btn btn-primary mt-2"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex gap-2 mt-2 justify-center items-center">
                      <button
                        className="btn btn-sm"
                        onClick={() => decrementQuantity(product._id)}
                      >
                        -
                      </button>
                      <span>{cartItem.quantity}</span>
                      <button
                        className="btn btn-sm"
                        onClick={() => incrementQuantity(product._id)}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default UserPage;
