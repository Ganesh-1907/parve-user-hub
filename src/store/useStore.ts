import { Product, CartItem, WishlistItem } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

interface AuthStore {
  isLoggedIn: boolean;
  user: { name: string; email: string; phone: string; address: string } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  signup: (name: string, email: string, phone: string, address: string, password: string) => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.product.id === product.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { items: [...state.items, { product, quantity }] };
        });
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce((acc, item) => {
          const price = item.product.discount
            ? item.product.price * (1 - item.product.discount.percentage / 100)
            : item.product.price;
          return acc + price * item.quantity;
        }, 0),
    }),
    { name: "parve-cart" }
  )
);

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (productId) => {
        set((state) => ({
          items: [...state.items, { productId, addedAt: new Date().toISOString() }],
        }));
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },
      isInWishlist: (productId) => get().items.some((item) => item.productId === productId),
    }),
    { name: "parve-wishlist" }
  )
);

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      user: null,
      login: (email, password) => {
        // Mock login - in production this would call an API
        if (email && password) {
          set({
            isLoggedIn: true,
            user: {
              name: "Demo User",
              email,
              phone: "+91 98765 43210",
              address: "123 Green Park, New Delhi, 110016",
            },
          });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ isLoggedIn: false, user: null });
      },
      signup: (name, email, phone, address, password) => {
        if (name && email && phone && address && password) {
          set({
            isLoggedIn: true,
            user: { name, email, phone, address },
          });
          return true;
        }
        return false;
      },
    }),
    { name: "parve-auth" }
  )
);
