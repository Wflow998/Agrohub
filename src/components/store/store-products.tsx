"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Search,
  Filter,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductForm } from "./product-form";

export function StoreProducts() {
  // Mock products data
  const products = [
    {
      id: "1",
      name: "Organic Tomatoes",
      category: "Vegetables",
      price: "$2.99",
      stock: 500,
      unit: "kg",
      image:
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80",
      status: "active",
      sales: 120,
    },
    {
      id: "2",
      name: "Fresh Maize",
      category: "Grains",
      price: "$1.49",
      stock: 1200,
      unit: "kg",
      image:
        "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=80",
      status: "active",
      sales: 350,
    },
    {
      id: "3",
      name: "Organic Kale",
      category: "Vegetables",
      price: "$3.29",
      stock: 300,
      unit: "kg",
      image:
        "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?w=800&q=80",
      status: "active",
      sales: 80,
    },
    {
      id: "4",
      name: "Free-Range Eggs",
      category: "Poultry",
      price: "$4.99",
      stock: 200,
      unit: "dozen",
      image:
        "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=800&q=80",
      status: "active",
      sales: 95,
    },
    {
      id: "5",
      name: "Raw Honey",
      category: "Other",
      price: "$8.99",
      stock: 50,
      unit: "jar",
      image:
        "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=800&q=80",
      status: "active",
      sales: 42,
    },
    {
      id: "6",
      name: "Fresh Avocados",
      category: "Fruits",
      price: "$5.49",
      stock: 150,
      unit: "kg",
      image:
        "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80",
      status: "active",
      sales: 110,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-video relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
              <Badge className="absolute top-2 right-2">
                {product.category}
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.price}/{product.unit}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" /> View Details
                    </DropdownMenuItem>
                    <Dialog>
                      <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Edit className="mr-2 h-4 w-4" /> Edit Product
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Edit Product</DialogTitle>
                          <DialogDescription>
                            Update the details of your product
                          </DialogDescription>
                        </DialogHeader>
                        <ProductForm initialData={product} />
                      </DialogContent>
                    </Dialog>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Stock:</span>
                  <span className="font-medium">
                    {product.stock} {product.unit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Sales:</span>
                  <span className="font-medium">
                    {product.sales} {product.unit}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" /> View Details
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogDescription>
                      Update the details of your product
                    </DialogDescription>
                  </DialogHeader>
                  <ProductForm initialData={product} />
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
