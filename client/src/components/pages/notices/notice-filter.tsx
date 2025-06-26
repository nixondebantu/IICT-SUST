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
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// Corrected import and usage
import { useDebounce } from "@/hooks/useDebounce.hook";

export default function NoticeFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { useTagsListQuery } = useTagsAction();
  const { data: tagsData, isLoading: isTagsLoading } = useTagsListQuery({
    type: "notice",
  });

  // ... (rest of your state initializations) ...
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.getAll("tag") || []
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "date");
  const [order, setOrder] = useState(searchParams.get("order") || "desc");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (debouncedSearchTerm) {
      newParams.set("search", debouncedSearchTerm);
    } else {
      newParams.delete("search");
    }
    newParams.delete("tag");
    if (selectedTags.length > 0) {
      selectedTags.forEach((tagId) => {
        newParams.append("tag", tagId);
      });
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
            {isTagsLoading ? (
              <p className="text-sm text-muted-foreground">Loading tags...</p>
            ) : (
              tagsData?.map((tag) => (
                <div key={tag.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cat-${tag.id}`}
                    checked={selectedTags.includes(String(tag.id))}
                    onCheckedChange={(checked) =>
                      handleTagChange(String(tag.id), !!checked)
                    }
                  />
                  <Label
                    htmlFor={`cat-${tag.id}`}
                    className="font-normal text-sm"
                  >
                    {tag.value}
                  </Label>
                </div>
              ))
            )}
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
