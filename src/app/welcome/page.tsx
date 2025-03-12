"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor, ArrowRight, Leaf } from "lucide-react";

export default function WelcomePage() {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeSelect = (theme: string) => {
    setSelectedTheme(theme);
    setTheme(theme);
  };

  const handleContinue = () => {
    router.push("/login");
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <div className="w-full max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative h-24 w-24">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sun className="h-16 w-16 text-primary" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Welcome to AgroHub
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            The Agricultural Social Network for Africa
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Features */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Connect. Trade. Grow.</h2>
            <p className="text-muted-foreground">
              Join thousands of farmers, distributors, and agricultural
              professionals across Africa to share knowledge, trade products,
              and grow your business.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <FeatureCard
                title="Social Networking"
                description="Connect with other agricultural professionals"
                imageUrl="https://images.unsplash.com/photo-1529148482759-b35b25c5f217?w=800&q=80"
              />
              <FeatureCard
                title="Marketplace"
                description="Buy and sell agricultural products"
                imageUrl="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80"
              />
              <FeatureCard
                title="Land Investment"
                description="Find land to invest in or list your own"
                imageUrl="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"
              />
              <FeatureCard
                title="Analytics"
                description="Track your farm's performance and market trends"
                imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
              />
            </div>
          </div>

          {/* Right Column - Theme Selection */}
          <div className="bg-card rounded-xl p-8 shadow-lg border">
            <h2 className="text-2xl font-bold mb-6">Choose Your Theme</h2>
            <p className="text-muted-foreground mb-8">
              Select a theme that works best for you. You can always change this
              later in settings.
            </p>

            <div className="grid grid-cols-1 gap-4">
              <ThemeOption
                title="Light"
                description="Clean, bright interface for daytime use"
                icon={<Sun className="h-8 w-8" />}
                isSelected={selectedTheme === "light"}
                onClick={() => handleThemeSelect("light")}
              />

              <ThemeOption
                title="Dark"
                description="Easy on the eyes for nighttime use"
                icon={<Moon className="h-8 w-8" />}
                isSelected={selectedTheme === "dark"}
                onClick={() => handleThemeSelect("dark")}
              />

              <ThemeOption
                title="System"
                description="Follows your device's theme settings"
                icon={<Monitor className="h-8 w-8" />}
                isSelected={selectedTheme === "system"}
                onClick={() => handleThemeSelect("system")}
              />
            </div>

            <Button className="w-full mt-8" size="lg" onClick={handleContinue}>
              Continue to AgroHub <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-[300px] rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=90"
            alt="African agricultural landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 to-transparent z-20">
            <h2 className="text-3xl font-bold text-white">
              Transforming African Agriculture
            </h2>
            <p className="text-white/90 max-w-2xl">
              Join our community of farmers, distributors, and agricultural
              professionals across Africa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  imageUrl,
}: {
  title: string;
  description: string;
  imageUrl: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-lg h-40 group">
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors z-10"></div>
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 p-4 flex flex-col justify-end z-20">
        <h3 className="font-bold text-white">{title}</h3>
        <p className="text-white/80 text-sm">{description}</p>
      </div>
    </div>
  );
}

function ThemeOption({
  title,
  description,
  icon,
  isSelected,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div
          className={`p-2 rounded-full ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted"}`}
        >
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}
