import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Filter, SortDesc, SortAsc, Grid3X3, List } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
}

interface FeedFiltersProps {
  onFilterChange?: (filter: string) => void;
  onSortChange?: (sort: string) => void;
  onViewChange?: (view: "grid" | "list") => void;
  onSearch?: (query: string) => void;
  activeFilter?: string;
  activeSort?: string;
  activeView?: "grid" | "list";
  filterOptions?: FilterOption[];
  sortOptions?: FilterOption[];
}

const FeedFilters = ({
  onFilterChange = () => {},
  onSortChange = () => {},
  onViewChange = () => {},
  onSearch = () => {},
  activeFilter = "all",
  activeSort = "latest",
  activeView = "list",
  filterOptions = [
    { id: "all", label: "All Posts" },
    { id: "crops", label: "Crops" },
    { id: "livestock", label: "Livestock" },
    { id: "equipment", label: "Equipment" },
    { id: "weather", label: "Weather" },
    { id: "market", label: "Market" },
  ],
  sortOptions = [
    { id: "latest", label: "Latest" },
    { id: "trending", label: "Trending" },
    { id: "popular", label: "Most Popular" },
  ],
}: FeedFiltersProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="w-full space-y-4 bg-background">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-2">
          <Tabs
            defaultValue={activeFilter}
            className="w-full sm:w-auto"
            onValueChange={onFilterChange}
          >
            <TabsList>
              {filterOptions.slice(0, 3).map((option) => (
                <TabsTrigger key={option.id} value={option.id}>
                  {option.label}
                </TabsTrigger>
              ))}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    <span>More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {filterOptions.slice(3).map((option) => (
                    <DropdownMenuItem
                      key={option.id}
                      onClick={() => onFilterChange(option.id)}
                    >
                      {option.label}
                      {activeFilter === option.id && (
                        <Badge variant="secondary" className="ml-2">
                          Active
                        </Badge>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <form
            onSubmit={handleSearch}
            className="relative flex w-full sm:w-auto"
          >
            <Input
              type="search"
              placeholder="Search posts..."
              className="w-full sm:w-[200px] pr-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <div className="flex items-center space-x-2">
            <Select defaultValue={activeSort} onValueChange={onSortChange}>
              <SelectTrigger className="w-[140px]">
                <div className="flex items-center gap-2">
                  {activeSort === "latest" ? (
                    <SortDesc className="h-4 w-4" />
                  ) : (
                    <SortAsc className="h-4 w-4" />
                  )}
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center rounded-md border bg-background p-1">
              <Button
                variant={activeView === "list" ? "default" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => onViewChange("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={activeView === "grid" ? "default" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => onViewChange("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {activeFilter !== "all" && (
          <Badge variant="secondary" className="flex items-center gap-1">
            {filterOptions.find((opt) => opt.id === activeFilter)?.label}
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 ml-1"
              onClick={() => onFilterChange("all")}
            >
              ×
            </Button>
          </Badge>
        )}
        {searchQuery && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Search: {searchQuery}
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 ml-1"
              onClick={() => {
                setSearchQuery("");
                onSearch("");
              }}
            >
              ×
            </Button>
          </Badge>
        )}
      </div>
    </div>
  );
};

export default FeedFilters;
