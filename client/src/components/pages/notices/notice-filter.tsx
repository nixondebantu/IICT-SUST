import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useTagsAction from "@/hooks/useTagsAction.hook";
import { useDebounce } from "@/hooks/useDebounce.hook";
import { Search, X } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

interface SortOption {
  value: string;
  label: string;
}

const sortOptions: SortOption[] = [
  { value: "date_desc", label: "Newest First" },
  { value: "date_asc", label: "Oldest First" },
  { value: "title_asc", label: "Title A-Z" },
  { value: "title_desc", label: "Title Z-A" },
];

export default function NoticeFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { useTagsListQuery } = useTagsAction();
  
  const { data: tagsData, isLoading: isTagsLoading, error: tagsError } = useTagsListQuery({
    type: "notice",
  });

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.getAll("tag") || []
  );
  const [sortBy, setSortBy] = useState(
    searchParams.get("sortBy") || "date"
  );
  const [order, setOrder] = useState(
    searchParams.get("order") || "desc"
  );

  // Debounce search term to avoid excessive API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const newParams = new URLSearchParams();
    
    const pageSize = searchParams.get("pageSize");
    if (pageSize) {
      newParams.set("pageSize", pageSize);
    }
    
    if (debouncedSearchTerm.trim()) {
      newParams.set("search", debouncedSearchTerm.trim());
    }

    selectedTags.forEach((tagId) => {
      newParams.append("tag", tagId);
    });

    newParams.set("sortBy", sortBy);
    newParams.set("order", order);

    newParams.set("page", "1");

    setSearchParams(newParams);
  }, [debouncedSearchTerm, selectedTags, sortBy, order, setSearchParams]);

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlTags = searchParams.getAll("tag") || [];
    const urlSortBy = searchParams.get("sortBy") || "date";
    const urlOrder = searchParams.get("order") || "desc";

    setSearchTerm(urlSearch);
    setSelectedTags(urlTags);
    setSortBy(urlSortBy);
    setOrder(urlOrder);
  }, [searchParams]);

  const handleTagChange = useCallback((tagId: string, checked: boolean) => {
    setSelectedTags((prev) => {
      const newTags = checked 
        ? [...prev, tagId] 
        : prev.filter((id) => id !== tagId);
      return newTags;
    });
  }, []);

  const handleSortChange = useCallback((value: string) => {
    const [newSortBy, newOrder] = value.split("_");
    setSortBy(newSortBy);
    setOrder(newOrder);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedTags([]);
    setSortBy("date");
    setOrder("desc");
    
    const newParams = new URLSearchParams();
    const pageSize = searchParams.get("pageSize");
    if (pageSize) {
      newParams.set("pageSize", pageSize);
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  }, [setSearchParams, searchParams]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  const hasActiveFilters = searchTerm.trim() || selectedTags.length > 0 || 
    sortBy !== "date" || order !== "desc";

  return (
    <aside
      id="filters-sidebar"
      className="lg:w-80 rounded-lg shadow-sm border p-6 bg-white"
      role="complementary"
      aria-label="Notice filters and search"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          Filter & Search
        </h3>
      </div>
      <div className="space-y-6">
        {/* Search Input */}
        <div>
          <Label htmlFor="search" className="mb-2 block font-medium">
            Search Notices
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
            <Input
              id="search"
              type="text"
              placeholder="Search by title, content..."
              className="w-full pl-10 pr-10"
              value={searchTerm}
              onChange={handleSearchChange}
              aria-describedby={searchTerm ? "search-clear" : undefined}
            />
            {searchTerm && (
              <button
                id="search-clear"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Categories/Tags Filter */}
        <div>
          <Label className="mb-3 block font-medium">
            Categories
            {selectedTags.length > 0 && (
              <span className="ml-2 text-sm text-muted-foreground">
                ({selectedTags.length} selected)
              </span>
            )}
          </Label>
          
          <div className="space-y-3 max-h-48 overflow-y-auto" role="group" aria-label="Filter by categories">
            {isTagsLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" aria-hidden="true"></div>
                <span className="ml-2 text-sm text-muted-foreground">Loading categories...</span>
              </div>
            ) : tagsError ? (
              <p className="text-sm text-destructive" role="alert">
                Failed to load categories. Please try refreshing the page.
              </p>
            ) : tagsData && tagsData.length > 0 ? (
              tagsData.map((tag) => (
                <div key={tag.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cat-${tag.id}`}
                    checked={selectedTags.includes(String(tag.id))}
                    onCheckedChange={(checked) =>
                      handleTagChange(String(tag.id), !!checked)
                    }
                    aria-describedby={`cat-${tag.id}-label`}
                  />
                  <Label
                    id={`cat-${tag.id}-label`}
                    htmlFor={`cat-${tag.id}`}
                    className="font-normal text-sm cursor-pointer flex-1"
                  >
                    {tag.value}
                  </Label>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No categories available
              </p>
            )}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <Label htmlFor="sort" className="mb-2 block font-medium">
            Sort By
          </Label>
          <Select 
            value={`${sortBy}_${order}`} 
            onValueChange={handleSortChange}
          >
            <SelectTrigger id="sort">
              <SelectValue placeholder="Select sorting option" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="pt-4 border-t">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={clearFilters}
            >
              <X className="h-4 w-4 mr-2" aria-hidden="true" />
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="text-xs text-muted-foreground space-y-1" role="status" aria-label="Active filters summary">
            <p className="font-medium mb-2">Active filters:</p>
            {searchTerm && (
              <p>• Search: "{searchTerm}"</p>
            )}
            {selectedTags.length > 0 && (
              <p>• Categories: {selectedTags.length} selected</p>
            )}
            {(sortBy !== "date" || order !== "desc") && (
              <p>• Sort: {sortOptions.find(opt => opt.value === `${sortBy}_${order}`)?.label}</p>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}