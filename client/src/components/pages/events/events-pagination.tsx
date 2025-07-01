import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EventsPagination() {
  return (
    <div
      id="pagination"
      className="flex justify-center items-center space-x-2 mb-6"
    >
      <Button variant="outline">
        <FontAwesomeIcon
          icon={["fas", "chevron-left"]}
          className="text-gray-500"
        />
      </Button>
      <Button variant="outline" className="px-3 py-2">
        1
      </Button>
      <Button variant="outline" className="px-4 py-2">
        2
      </Button>
      <Button variant="outline" className="px-4 py-2">
        3
      </Button>
      <span className="px-2">...</span>
      <Button variant="outline" className="px-4 py-2">
        8
      </Button>
      <Button variant="outline" className="px-3 py-2">
        <FontAwesomeIcon
          icon={["fas", "chevron-right"]}
          className="text-gray-500"
        />
      </Button>
    </div>
  );
}
