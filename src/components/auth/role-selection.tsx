"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Leaf,
  Store,
  Truck,
  Package,
  Briefcase,
  ShoppingBag,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface RoleOption {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
}

export function RoleSelection() {
  const router = useRouter();

  const roles: RoleOption[] = [
    {
      id: "farmer",
      title: "Farmer",
      description: "List your produce and connect with buyers",
      icon: Leaf,
      path: "/dashboard",
    },
    {
      id: "retailer",
      title: "Retailer",
      description: "Source produce and sell to consumers",
      icon: Store,
      path: "/dashboard",
    },
    {
      id: "logistics",
      title: "Logistics Partner",
      description: "Provide transportation services",
      icon: Truck,
      path: "/dashboard",
    },
    {
      id: "distributor",
      title: "Distributor",
      description: "Connect farmers with retailers",
      icon: Package,
      path: "/dashboard",
    },
    {
      id: "service",
      title: "Service Provider",
      description: "Offer agricultural services",
      icon: Briefcase,
      path: "/dashboard",
    },
    {
      id: "consumer",
      title: "Consumer",
      description: "Purchase fresh produce directly",
      icon: ShoppingBag,
      path: "/dashboard",
    },
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Select Your Role</CardTitle>
        <CardDescription>
          Choose how you want to participate in the AgroHub ecosystem
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role) => (
            <Link href={role.path} key={role.id}>
              <div className="flex flex-col items-center p-4 border rounded-lg hover:border-primary cursor-pointer transition-all">
                <role.icon className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-lg font-medium">{role.title}</h3>
                <p className="text-sm text-center text-muted-foreground mt-2">
                  {role.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
