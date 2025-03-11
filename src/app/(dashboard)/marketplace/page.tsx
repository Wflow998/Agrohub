import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Product, ProductCard } from "@/components/marketplace/product-card";
import { ProductFilters } from "@/components/marketplace/product-filters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function MarketplacePage() {
  // Mock products data
  const products: Product[] = [
    {
      id: "1",
      name: "Organic Tomatoes",
      description:
        "Fresh, locally grown organic tomatoes. Perfect for salads and cooking.",
      price: 2.99,
      unit: "kg",
      image:
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80",
      seller: {
        name: "Green Valley Farm",
        location: "Nairobi Region",
      },
      available: 50,
    },
    {
      id: "2",
      name: "Fresh Maize",
      description:
        "Sweet corn harvested this week. Great for roasting or boiling.",
      price: 1.49,
      unit: "kg",
      image:
        "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=80",
      seller: {
        name: "Sunrise Farms",
        location: "Central Region",
      },
      available: 100,
    },
    {
      id: "3",
      name: "Organic Kale",
      description:
        "Nutrient-rich kale grown without pesticides. Great for smoothies and salads.",
      price: 3.29,
      unit: "bunch",
      image:
        "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?w=800&q=80",
      seller: {
        name: "Healthy Greens",
        location: "Western Region",
      },
      available: 30,
    },
    {
      id: "4",
      name: "Free-Range Eggs",
      description:
        "Farm fresh eggs from free-range chickens. Rich in flavor and nutrition.",
      price: 4.99,
      unit: "dozen",
      image:
        "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=800&q=80",
      seller: {
        name: "Happy Hen Farm",
        location: "Eastern Region",
      },
      available: 20,
    },
    {
      id: "5",
      name: "Raw Honey",
      description:
        "Pure, unfiltered honey from local beekeepers. Perfect natural sweetener.",
      price: 8.99,
      unit: "jar",
      image:
        "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=800&q=80",
      seller: {
        name: "Bee Haven",
        location: "Central Region",
      },
      available: 15,
    },
    {
      id: "6",
      name: "Fresh Avocados",
      description: "Creamy, ripe avocados. Perfect for guacamole or on toast.",
      price: 5.49,
      unit: "kg",
      image:
        "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80",
      seller: {
        name: "Green Hills Farm",
        location: "Coastal Region",
      },
      available: 40,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground">
            Browse and purchase agricultural products
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products, sellers..."
              className="pl-8"
            />
          </div>
          <Button>Search</Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="hidden md:block">
            <ProductFilters />
          </div>
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
