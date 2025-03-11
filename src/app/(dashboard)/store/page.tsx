import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StoreProducts } from "@/components/store/store-products";
import { StoreOrders } from "@/components/store/store-orders";
import { StoreAnalytics } from "@/components/store/store-analytics";
import { StoreSettings } from "@/components/store/store-settings";
import { Plus, Settings, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductForm } from "@/components/store/product-form";
import Link from "next/link";

export default function StorePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Store</h1>
            <p className="text-muted-foreground">
              Manage your online store and products
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Link href="/store/preview" target="_blank">
              <Button variant="outline">
                <ExternalLink className="mr-2 h-4 w-4" /> Preview Store
              </Button>
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>
                    Enter details about your new product
                  </DialogDescription>
                </DialogHeader>
                <ProductForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="products">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="products" className="space-y-4 pt-4">
            <StoreProducts />
          </TabsContent>
          <TabsContent value="orders" className="space-y-4 pt-4">
            <StoreOrders />
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4 pt-4">
            <StoreAnalytics />
          </TabsContent>
          <TabsContent value="settings" className="space-y-4 pt-4">
            <StoreSettings />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
