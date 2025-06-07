"use client";
import { Product, Supplier } from "@/types/Users";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManufacturerProductPage = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    stock: 0,
    category: "",
    supplier: "",
  });
  const fetchSuppliers = async () => {
    try {
      const res = await axios.get("/api/manufacturer/suppliers/hired");
      setSuppliers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleProductImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    folderName: string,
    imageName: string,
    path: string
  ) => {
    if (!products.name) {
      toast.error("Please enter product name before uploading image");
      return;
    }
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB");
        return;
      }
      const imageResponse = axios.postForm("/api/helper/upload-img", {
        file,
        name: imageName,
        folderName: folderName,
      });
      console.log(imageResponse);
      toast.promise(imageResponse, {
        loading: "Uploading Image...",
        success: (data: AxiosResponse) => {
          setProducts({
            ...products,
            [path]: data.data.path,
          });
          return "Image Uploaded Successfully";
        },
        error: (err: unknown) => `This just happened: ${err}`,
      });
    }
  };

  const handleAddProduct = async () => {
    if (
      !products.name ||
      !products.description ||
      !products.price ||
      !products.stock ||
      !products.category ||
      !products.supplier
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const res = axios.post("/api/manufacturer/products/addNewProduct", {
        products,
      });
      toast.promise(res, {
        loading: "Adding Product...",
        success: "Product Added Successfully",
        error: "Error adding product",
      });
    } catch (error) {
      toast.error("Error adding product");
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-center uppercase">
        Add New Product
      </h1>
      <div className="grid px-4 py-8 mx-auto lg:grid-cols-12">
        <div className="px-10 lg:col-span-7">
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">
              Product Name <span className="text-error">*</span>
            </legend>
            <input
              type="text"
              className="input input-primary w-full"
              placeholder="Enter Product Name"
              value={products.name}
              onChange={(e) =>
                setProducts({ ...products, name: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">
              Product Description <span className="text-error">*</span>
            </legend>
            <textarea
              className="textarea textarea-primary w-full h-32"
              placeholder="Enter Product Description"
              value={products.description}
              onChange={(e) =>
                setProducts({ ...products, description: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">
              Product Price (INR) <span className="text-error">*</span>
            </legend>
            <input
              type="number"
              className="input input-primary w-full"
              placeholder="Enter Product Price"
              value={products.price}
              onChange={(e) =>
                setProducts({ ...products, price: parseInt(e.target.value) })
              }
            />
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">
              Product Stock <span className="text-error">*</span>
            </legend>
            <input
              type="number"
              className="input input-primary w-full"
              placeholder="Enter Product Stock"
              value={products.stock}
              onChange={(e) =>
                setProducts({ ...products, stock: parseInt(e.target.value) })
              }
            />
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">
              Product Category <span className="text-error">*</span>
            </legend>
            <input
              type="text"
              className="input input-primary w-full"
              placeholder="Enter Product Category"
              value={products.category}
              onChange={(e) =>
                setProducts({ ...products, category: e.target.value })
              }
              list="categories"
            />
            <datalist id="categories">
              <option value="Vegetable" />
              <option value="Fruit" />
              <option value="Grain" />
              <option value="Dairy" />
              <option value="Spice" />
              <option value="Nut" />
              <option value="Flower" />
            </datalist>
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">
              Product Image <span className="text-error">*</span>
            </legend>
            <input
              type="file"
              className="file-input file-input-primary w-full"
              onChange={(e) => {
                handleProductImage(e, "products", products.name, "imageUrl");
              }}
            />
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">
              Supplier <span className="text-error">*</span>
            </legend>
            <select
              className="select select-primary w-full"
              value={products.supplier?._id}
              onChange={(e) =>
                setProducts({ ...products, supplier: e.target.value })
              }
            >
              <option value="" defaultChecked>
                Select Supplier
              </option>
              {suppliers.map((supplier) => (
                <option key={supplier._id} value={supplier._id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </fieldset>
          <div className="flex justify-center mt-8">
            <button
              className="btn btn-primary w-full"
              onClick={handleAddProduct}
            >
              Add Product
            </button>
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src="/pic.png" alt="Car Image" />
        </div>
      </div>
    </>
  );
};

export default ManufacturerProductPage;
