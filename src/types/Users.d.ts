export interface User {
  _id?: string;
  name: string;
  email: string;
  contact: string;
  profileImage: string;
  address: {
    address: string;
    district: string;
    state: string;
    pincode: string;
  };
  password: string;
}

export interface Manufacturer extends User {
  suppliers: Supplier[];
}

export interface Transporter extends User {}
export interface Supplier extends User {
  transporter: Transporter[];
  manufacturer: Manufacturer;
}

export interface Product {
  _id?: string;
  name: string;
  description: string;
  stock: number;
  category: string;
  price: number;
  imageUrl: string;
  manufacturerId?: Manufacturer;
  supplierId?: Supplier;
  transporter?: Transporter;
}
