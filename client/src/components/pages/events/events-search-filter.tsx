import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueryParams } from "@/lib/dtos/query.dto";
import { Search } from "lucide-react";
interface EventsSearchFilterProps {
  queryParams: QueryParams;
  onQueryChange: (name: string, value: string) => void;
}

export default function EventsSearchFilter({
  queryParams,
  onQueryChange,
}: EventsSearchFilterProps) {
    const handleCategoryChange = (selectedValue: string) => {
    // If the user selects "all", we pass an empty string to onQueryChange.
    // Your EventsPage component will see the empty string and remove the `tag`
    // parameter from the URL, effectively clearing the filter.
    onQueryChange("tag", selectedValue === "all" ? "" : selectedValue);
  };

  return (
    <section id="search-filter" className="py-8 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="relative w-full lg:w-96">
            {/* <FontAwesomeIcon
              icon={["fas", "magnifying-glass"]}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            /> */}
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />

            <Input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-3"
              defaultValue={queryParams.search}
              onChange={(e) => onQueryChange("search", e.target.value)}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Select
              value={queryParams.tag?.[0]?.toString() || "all"}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="5">Workshop</SelectItem>
                <SelectItem value="4">Seminar</SelectItem>
                <SelectItem value="3">Conference</SelectItem>
              </SelectContent>
            </Select>
            {/* Additional filters can be added here and connected to onQueryChange */}
          </div>
        </div>
      </div>
    </section>
  );
}