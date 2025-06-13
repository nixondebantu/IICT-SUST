import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NoticePagination() {
  return (
    <div className="mt-8 flex justify-center">
      <nav className="flex items-center space-x-2">
        <button className="px-3 py-2 text-gray-500 hover:text-primary border border-gray-300 rounded-lg hover:border-primary transition-colors">
          <FontAwesomeIcon icon={["fas", "chevron-left"]} className="text-lg" />
        </button>
        <button className="px-3 py-2 bg-primary text-white rounded-lg">
          1
        </button>
        <button className="px-3 py-2 text-gray-700 hover:text-primary border border-gray-300 rounded-lg hover:border-primary transition-colors">
          2
        </button>
        <button className="px-3 py-2 text-gray-700 hover:text-primary border border-gray-300 rounded-lg hover:border-primary transition-colors">
          3
        </button>
        <span className="px-3 py-2 text-gray-500">...</span>
        <button className="px-3 py-2 text-gray-700 hover:text-primary border border-gray-300 rounded-lg hover:border-primary transition-colors">
          13
        </button>
        <button className="px-3 py-2 text-gray-500 hover:text-primary border border-gray-300 rounded-lg hover:border-primary transition-colors">
          <FontAwesomeIcon
            icon={["fas", "chevron-right"]}
            className="text-lg"
          />
        </button>
      </nav>
    </div>
  );
}
