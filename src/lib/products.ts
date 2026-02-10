export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  image: string;
  category: string;
  badge?: string;
  rating: number;
  reviews: number;
  features: string[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "prod_wireless_headphones",
    name: "Nova Pro Wireless Headphones",
    description:
      "Premium noise-canceling wireless headphones with 40-hour battery life, spatial audio, and ultra-comfortable memory foam ear cushions. Perfect for music lovers and remote workers.",
    price: 29999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    category: "Electronics",
    badge: "Best Seller",
    rating: 4.8,
    reviews: 2847,
    features: [
      "Active Noise Cancellation",
      "40-Hour Battery Life",
      "Spatial Audio Support",
      "Bluetooth 5.3",
      "USB-C Fast Charging",
      "Foldable Design",
    ],
    inStock: true,
  },
  {
    id: "prod_smart_watch",
    name: "Pulse Ultra Smart Watch",
    description:
      "Advanced health monitoring smartwatch with ECG, blood oxygen tracking, GPS, and a stunning AMOLED display. Stay connected and track your fitness goals effortlessly.",
    price: 39999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    category: "Wearables",
    badge: "New Arrival",
    rating: 4.6,
    reviews: 1523,
    features: [
      "ECG & Heart Rate Monitor",
      "Blood Oxygen Tracking",
      "Built-in GPS",
      "5ATM Water Resistant",
      "7-Day Battery Life",
      "Always-On Display",
    ],
    inStock: true,
  },
  {
    id: "prod_mechanical_keyboard",
    name: "TypeForce RGB Mechanical Keyboard",
    description:
      "Hot-swappable mechanical keyboard with per-key RGB lighting, gasket-mount design, and premium PBT keycaps. The ultimate typing experience for enthusiasts.",
    price: 17999,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
    category: "Accessories",
    rating: 4.9,
    reviews: 3201,
    features: [
      "Hot-Swappable Switches",
      "Per-Key RGB Lighting",
      "Gasket-Mount Design",
      "PBT Keycaps",
      "USB-C Connection",
      "Programmable Layers",
    ],
    inStock: true,
  },
  {
    id: "prod_laptop_stand",
    name: "ErgoLift Pro Laptop Stand",
    description:
      "Adjustable aluminum laptop stand with integrated USB hub, cable management, and ventilation design. Elevate your workspace ergonomics.",
    price: 8999,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
    category: "Accessories",
    badge: "Popular",
    rating: 4.7,
    reviews: 984,
    features: [
      "Adjustable Height & Angle",
      "Built-in USB Hub",
      "Cable Management",
      "Ventilation Design",
      "Supports up to 17\"",
      "Non-Slip Base",
    ],
    inStock: true,
  },
  {
    id: "prod_wireless_charger",
    name: "ChargePad 3-in-1 Wireless Charger",
    description:
      "Sleek 3-in-1 wireless charging station for your phone, earbuds, and smartwatch. Qi2 compatible with up to 15W fast charging.",
    price: 5999,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80",
    category: "Electronics",
    rating: 4.5,
    reviews: 756,
    features: [
      "3-in-1 Charging",
      "Qi2 Compatible",
      "15W Fast Charging",
      "LED Indicator",
      "Compact Design",
      "Over-Charge Protection",
    ],
    inStock: true,
  },
  {
    id: "prod_backpack",
    name: "Urban Carry Tech Backpack",
    description:
      "Water-resistant tech backpack with padded laptop compartment, anti-theft pocket, and USB charging port. Designed for the modern commuter.",
    price: 12999,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    category: "Lifestyle",
    badge: "Editor's Choice",
    rating: 4.7,
    reviews: 2156,
    features: [
      "Water-Resistant Material",
      "Padded Laptop Compartment",
      "Anti-Theft Pocket",
      "USB Charging Port",
      "Ergonomic Straps",
      "30L Capacity",
    ],
    inStock: true,
  },
];
