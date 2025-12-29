import productFacewash1 from "@/assets/product-facewash-1.jpg";
import productFacewash2 from "@/assets/product-facewash-2.jpg";
import productSerum1 from "@/assets/product-serum-1.jpg";
import productSerum2 from "@/assets/product-serum-2.jpg";
import productCream1 from "@/assets/product-cream-1.jpg";
import productCream2 from "@/assets/product-cream-2.jpg";
import { Product, Order } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Gentle Cleansing Foam",
    description: "A luxuriously soft cleansing foam that removes impurities while maintaining your skin's natural moisture barrier. Infused with aloe vera and green tea extracts.",
    price: 1299,
    category: "facewash",
    stock: 50,
    unit: "150ml",
    images: [productFacewash1],
    concerns: ["oily", "acne"],
  },
  {
    id: "2",
    name: "Hydrating Gel Cleanser",
    description: "A refreshing gel cleanser that deeply purifies pores without stripping essential oils. Perfect for daily use with vitamin E enrichment.",
    price: 999,
    category: "facewash",
    stock: 45,
    unit: "200ml",
    images: [productFacewash2],
    discount: {
      percentage: 15,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    },
    concerns: ["dry", "sensitive"],
  },
  {
    id: "3",
    name: "Vitamin C Brightening Serum",
    description: "A powerful antioxidant serum that brightens, evens skin tone, and protects against environmental stressors. 20% Vitamin C concentration.",
    price: 2499,
    category: "serums",
    stock: 30,
    unit: "30ml",
    images: [productSerum1],
    concerns: ["dry", "combination"],
  },
  {
    id: "4",
    name: "Hyaluronic Acid Serum",
    description: "Deeply hydrating serum with multi-weight hyaluronic acid for plump, dewy skin. Suitable for all skin types.",
    price: 1999,
    category: "serums",
    stock: 40,
    unit: "30ml",
    images: [productSerum2],
    discount: {
      percentage: 10,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    },
    concerns: ["dry", "sensitive", "combination"],
  },
  {
    id: "5",
    name: "Rich Moisturizing Cream",
    description: "A deeply nourishing cream that locks in moisture for 24 hours. Enriched with shea butter and rose extract for soft, supple skin.",
    price: 1799,
    category: "creams",
    stock: 35,
    unit: "50ml",
    images: [productCream1],
    concerns: ["dry", "sensitive"],
  },
  {
    id: "6",
    name: "Overnight Repair Cream",
    description: "An intensive night cream that works while you sleep to repair and rejuvenate. Contains retinol and peptides for anti-aging benefits.",
    price: 2999,
    category: "creams",
    stock: 25,
    unit: "50ml",
    images: [productCream2],
    discount: {
      percentage: 20,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    },
    concerns: ["oily", "acne", "combination"],
  },
];

export const orders: Order[] = [
  {
    id: "ORD001",
    customerId: "1",
    customerName: "Priya Sharma",
    customerEmail: "priya@email.com",
    customerPhone: "+91 98765 43210",
    address: "123 Green Park, New Delhi, 110016",
    products: [
      { product: products[0], quantity: 2 },
      { product: products[2], quantity: 1 },
    ],
    totalAmount: 5097,
    status: "delivered",
    createdAt: "2024-12-20T10:30:00Z",
  },
  {
    id: "ORD002",
    customerId: "2",
    customerName: "Rahul Verma",
    customerEmail: "rahul@email.com",
    customerPhone: "+91 87654 32109",
    address: "456 MG Road, Mumbai, 400001",
    products: [
      { product: products[4], quantity: 1 },
    ],
    totalAmount: 1799,
    status: "processing",
    createdAt: "2024-12-25T14:45:00Z",
  },
  {
    id: "ORD003",
    customerId: "3",
    customerName: "Anita Desai",
    customerEmail: "anita@email.com",
    customerPhone: "+91 76543 21098",
    address: "789 Park Street, Kolkata, 700016",
    products: [
      { product: products[1], quantity: 1 },
      { product: products[3], quantity: 2 },
    ],
    totalAmount: 4597,
    status: "pending",
    createdAt: "2024-12-28T09:15:00Z",
  },
  {
    id: "ORD004",
    customerId: "4",
    customerName: "Vikram Singh",
    customerEmail: "vikram@email.com",
    customerPhone: "+91 65432 10987",
    address: "321 Brigade Road, Bangalore, 560001",
    products: [
      { product: products[5], quantity: 1 },
    ],
    totalAmount: 2399,
    status: "out_for_delivery",
    createdAt: "2024-12-27T16:20:00Z",
  },
];

export const skinConcerns = [
  { id: "dry", name: "Dry Skin", image: "💧" },
  { id: "oily", name: "Oily Skin", image: "✨" },
  { id: "acne", name: "Acne Prone", image: "🌿" },
  { id: "sensitive", name: "Sensitive Skin", image: "🌸" },
  { id: "combination", name: "Combination", image: "⚖️" },
];

export const ingredients = [
  { name: "Aloe Vera", description: "Soothes and hydrates", icon: "🌱" },
  { name: "Green Tea", description: "Antioxidant protection", icon: "🍃" },
  { name: "Lavender", description: "Calms irritation", icon: "💜" },
  { name: "Vitamin C", description: "Brightens skin", icon: "🍊" },
  { name: "Tea Tree", description: "Fights blemishes", icon: "🌿" },
  { name: "Rose Extract", description: "Nourishes deeply", icon: "🌹" },
];

export const howToUseSteps = [
  {
    step: 1,
    title: "Cleanse",
    description: "Start with our gentle cleanser to remove impurities and prep your skin",
  },
  {
    step: 2,
    title: "Treat",
    description: "Apply serum to target specific skin concerns and boost absorption",
  },
  {
    step: 3,
    title: "Moisturize",
    description: "Lock in hydration with our nourishing cream for lasting softness",
  },
];
