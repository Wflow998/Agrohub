"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Clock,
  DollarSign,
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
import { AuctionForm } from "./auction-form";
import { AuctionDetails } from "./auction-details";

interface AuctionListProps {
  status: "active" | "upcoming" | "my-auctions" | "completed";
}

export function AuctionList({ status }: AuctionListProps) {
  // Mock auction data
  const auctions = [
    {
      id: "1",
      title: "Premium Dairy Cows",
      category: "Livestock",
      type: "Cattle",
      quantity: 5,
      startingBid: 1200,
      currentBid: 1450,
      bidCount: 8,
      endDate: "2023-11-15T14:00:00",
      status: "active",
      location: "Eastern Region Farm",
      image:
        "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800&q=80",
      description:
        "Healthy dairy cows with excellent milk production history. All vaccinations up to date.",
      seller: {
        name: "Green Valley Farm",
        rating: 4.8,
        verified: true,
      },
    },
    {
      id: "2",
      title: "Merino Sheep Flock",
      category: "Livestock",
      type: "Sheep",
      quantity: 12,
      startingBid: 800,
      currentBid: 950,
      bidCount: 5,
      endDate: "2023-11-18T16:00:00",
      status: "active",
      location: "Central Region Farm",
      image:
        "https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=800&q=80",
      description:
        "Quality Merino sheep known for premium wool. Healthy and well-maintained.",
      seller: {
        name: "Highland Pastures",
        rating: 4.6,
        verified: true,
      },
    },
    {
      id: "3",
      title: "Free-Range Chickens",
      category: "Livestock",
      type: "Poultry",
      quantity: 50,
      startingBid: 300,
      currentBid: 300,
      bidCount: 0,
      endDate: "2023-11-25T12:00:00",
      status: "upcoming",
      location: "Western Region Farm",
      image:
        "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80",
      description:
        "Healthy free-range chickens raised on organic feed. Excellent for egg production.",
      seller: {
        name: "Sunrise Poultry",
        rating: 4.5,
        verified: true,
      },
    },
    {
      id: "4",
      title: "Angus Beef Cattle",
      category: "Livestock",
      type: "Cattle",
      quantity: 3,
      startingBid: 1500,
      currentBid: 1500,
      bidCount: 0,
      endDate: "2023-11-30T15:00:00",
      status: "upcoming",
      location: "Northern Region Farm",
      image:
        "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=800&q=80",
      description:
        "Premium Angus beef cattle. Grass-fed and raised with sustainable farming practices.",
      seller: {
        name: "Quality Meats Farm",
        rating: 4.9,
        verified: true,
      },
    },
    {
      id: "5",
      title: "Berkshire Pigs",
      category: "Livestock",
      type: "Pigs",
      quantity: 8,
      startingBid: 900,
      currentBid: 1100,
      bidCount: 6,
      endDate: "2023-11-10T10:00:00",
      status: "my-auctions",
      location: "Your Farm",
      image:
        "https://images.unsplash.com/photo-1593179357196-ea11a2e7c119?w=800&q=80",
      description:
        "Healthy Berkshire pigs known for their superior meat quality. Well-cared for and ready for sale.",
      seller: {
        name: "Your Farm",
        rating: 4.7,
        verified: true,
      },
    },
  ];

  const filteredAuctions = auctions.filter(
    (auction) => auction.status === status,
  );

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Function to calculate time remaining
  const getTimeRemaining = (endDate: string) => {
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    const distance = end - now;

    if (distance < 0) return "Ended";

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  };

  const [selectedAuction, setSelectedAuction] = React.useState<any>(null);
  const [detailsOpen, setDetailsOpen] = React.useState(false);

  const handleViewDetails = (auction: any) => {
    setSelectedAuction(auction);
    setDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      {filteredAuctions.length === 0 ? (
        <div className="text-center py-10 border rounded-lg">
          <p className="text-muted-foreground">
            No {status.replace("-", " ")} auctions found.
          </p>
          {status === "my-auctions" && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4">Create New Auction</Button>
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
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAuctions.map((auction) => (
            <Card key={auction.id} className="overflow-hidden flex flex-col">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={auction.image}
                  alt={auction.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
                <Badge className="absolute top-2 right-2">{auction.type}</Badge>
                {status === "active" && (
                  <Badge
                    variant="destructive"
                    className="absolute top-2 left-2"
                  >
                    <Clock className="mr-1 h-3 w-3" />
                    {getTimeRemaining(auction.endDate)}
                  </Badge>
                )}
              </div>
              <CardContent className="p-4 flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{auction.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {auction.location}
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
                      <DropdownMenuItem
                        onClick={() => handleViewDetails(auction)}
                      >
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      {status === "my-auctions" && (
                        <>
                          <Dialog>
                            <DialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                              >
                                <Edit className="mr-2 h-4 w-4" /> Edit Auction
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                              <DialogHeader>
                                <DialogTitle>Edit Auction</DialogTitle>
                                <DialogDescription>
                                  Update the details of your auction
                                </DialogDescription>
                              </DialogHeader>
                              <AuctionForm initialData={auction} />
                            </DialogContent>
                          </Dialog>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" /> Cancel Auction
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Quantity:</span>
                    <span className="font-medium">
                      {auction.quantity}{" "}
                      {auction.quantity > 1 ? "items" : "item"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Current Bid:</span>
                    <span className="font-medium">
                      ${auction.currentBid.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Bids:</span>
                    <span className="font-medium">{auction.bidCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Ends:</span>
                    <span className="font-medium">
                      {formatDate(auction.endDate)}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between border-t mt-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewDetails(auction)}
                >
                  <Eye className="mr-2 h-4 w-4" /> View Details
                </Button>
                {status !== "my-auctions" && (
                  <Button size="sm">
                    <DollarSign className="mr-2 h-4 w-4" /> Place Bid
                  </Button>
                )}
                {status === "my-auctions" && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Edit Auction</DialogTitle>
                        <DialogDescription>
                          Update the details of your auction
                        </DialogDescription>
                      </DialogHeader>
                      <AuctionForm initialData={auction} />
                    </DialogContent>
                  </Dialog>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[800px]">
          {selectedAuction && <AuctionDetails auction={selectedAuction} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
