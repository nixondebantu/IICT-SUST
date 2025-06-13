import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useDebounce } from "use-debounce";

export default function NoticeFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.getAll("tag") || []
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "date");
  const [order, setOrder] = useState(searchParams.get("order") || "desc");

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (debouncedSearchTerm) {
      newParams.set("search", debouncedSearchTerm);
    } else {
      newParams.delete("search");
    }

    newParams.set("sortBy", sortBy);
    newParams.set("order", order);

    newParams.set("page", "1");

    setSearchParams(newParams);
  }, [debouncedSearchTerm, selectedTags, sortBy, order, setSearchParams]);

  const handleTagChange = (tagId: string, checked: boolean) => {
    setSelectedTags((prev) =>
      checked ? [...prev, tagId] : prev.filter((id) => id !== tagId)
    );
  };

  const handleSortChange = (value: string) => {
    const [newSortBy, newOrder] = value.split("_");
    setSortBy(newSortBy);
    setOrder(newOrder);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTags([]);
    setSortBy("date");
    setOrder("desc");
    setSearchParams({});
  };

  return (
    <aside
      id="filters-sidebar"
      className="lg:w-80 rounded-lg shadow-sm border p-6"
    >
      <h3 className="text-lg font-semibold mb-6">Filter &amp; Search</h3>

      <div className="space-y-6">
        <div>
          <Label htmlFor="search" className="mb-2 block">
            Search Notices
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              type="text"
              placeholder="Search by keywords..."
              className="w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label className="mb-2 block">Categories</Label>
          <div className="space-y-2">
            {/* {MOCK_CATEGORIES.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${category.id}`}
                  checked={selectedTags.includes(String(category.id))}
                  onCheckedChange={(checked) =>
                    handleTagChange(String(category.id), !!checked)
                  }
                />
                <Label
                  htmlFor={`cat-${category.id}`}
                  className="font-normal text-sm"
                >
                  {category.name}
                </Label>
              </div>
            ))} */}
            {/* TODO: List tags here */}
          </div>
        </div>

        <div>
          <Label htmlFor="sort" className="mb-2 block">
            Sort By
          </Label>
          <Select value={`${sortBy}_${order}`} onValueChange={handleSortChange}>
            <SelectTrigger id="sort">
              <SelectValue placeholder="Select sorting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date_desc">Newest First</SelectItem>
              <SelectItem value="date_asc">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="ghost" className="w-full" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>
    </aside>
  );
}
