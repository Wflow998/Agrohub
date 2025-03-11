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
import { AuctionList } from "@/components/auctions/auction-list";
import { AuctionCalendar } from "@/components/auctions/auction-calendar";
import { MyBids } from "@/components/auctions/my-bids";
import { Plus, Filter, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AuctionForm } from "@/components/auctions/auction-form";

export default function AuctionsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Livestock Auctions
            </h1>
            <p className="text-muted-foreground">
              Buy and sell livestock through secure auctions
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" /> View Calendar
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Create Auction
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Auction</DialogTitle>
                  <DialogDescription>
                    Enter details about your livestock auction
                  </DialogDescription>
                </DialogHeader>
                <AuctionForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="active">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="active">Active Auctions</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="my-auctions">My Auctions</TabsTrigger>
            <TabsTrigger value="my-bids">My Bids</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-4 pt-4">
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
            <AuctionList status="active" />
          </TabsContent>
          <TabsContent value="upcoming" className="space-y-4 pt-4">
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
            <AuctionList status="upcoming" />
          </TabsContent>
          <TabsContent value="my-auctions" className="space-y-4 pt-4">
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
            <AuctionList status="my-auctions" />
          </TabsContent>
          <TabsContent value="my-bids" className="space-y-4 pt-4">
            <MyBids />
          </TabsContent>
          <TabsContent value="calendar" className="space-y-4 pt-4">
            <AuctionCalendar />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
