"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { GiftTheme } from "@/data/gift";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  quantity: number;
};

export type Gift = {
  enabled: boolean;
  message: string;
  from: string;
  theme: GiftTheme;
};

const EMPTY_GIFT: Gift = { enabled: false, message: "", from: "", theme: "emerald" };

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  gift: Gift;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  updateGift: (patch: Partial<Gift>) => void;
  clear: () => void;
};

const CART_KEY = "sunnah-haven-cart";
const GIFT_KEY = "sunnah-haven-gift";
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [gift, setGift] = useState<Gift>(EMPTY_GIFT);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const rawCart = localStorage.getItem(CART_KEY);
      if (rawCart) setItems(JSON.parse(rawCart) as CartItem[]);
      const rawGift = localStorage.getItem(GIFT_KEY);
      if (rawGift) setGift({ ...EMPTY_GIFT, ...(JSON.parse(rawGift) as Partial<Gift>) });
    } catch {
      setItems([]);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
      localStorage.setItem(GIFT_KEY, JSON.stringify(gift));
    } catch {
      return;
    }
  }, [items, gift, loaded]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.slug === item.slug);
        if (existing) {
          return prev.map((i) =>
            i.slug === item.slug ? { ...i, quantity: i.quantity + quantity } : i,
          );
        }
        return [...prev, { ...item, quantity }];
      });
    },
    [],
  );

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) => (i.slug === slug ? { ...i, quantity } : i)),
    );
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const updateGift = useCallback((patch: Partial<Gift>) => {
    setGift((prev) => ({ ...prev, ...patch }));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    setGift(EMPTY_GIFT);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      gift,
      addItem,
      setQuantity,
      removeItem,
      updateGift,
      clear,
    }),
    [items, gift, addItem, setQuantity, removeItem, updateGift, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
