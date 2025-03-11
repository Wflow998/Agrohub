"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  seller: {
    name: string;
    location: string;
  };
  available: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="p-4 pb-0">
        <div>
          <h3 className="font-semibold text-lg truncate">{product.name}</h3>
          <p className="text-sm text-muted-foreground truncate">
            {product.seller.name} • {product.seller.location}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 flex-grow">
        <p className="text-sm line-clamp-2">{product.description}</p>
        <div className="mt-2">
          <p className="text-lg font-bold">
            ${product.price.toFixed(2)}/{product.unit}
          </p>
          <p className="text-xs text-muted-foreground">
            {product.available} {product.unit} available
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={() => onAddToCart && onAddToCart(product)}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
