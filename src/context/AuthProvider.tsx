import { Manufacturer, Supplier, Transporter, User } from "@/types/Users";
import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: User | Manufacturer | Supplier | Transporter | null;
  setUser: (user: User | Manufacturer | Supplier | Transporter | null) => void;
}

const UserContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<
    User | Manufacturer | Supplier | Transporter | null
  >(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
