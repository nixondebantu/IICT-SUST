import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NoticeDetailsSidebar() {
  return (
    <aside id="sidebar" className="lg:col-span-1">
      <div className="rounded-lg shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center px-4 py-2 bg-primary/90 text-white rounded-lg hover:bg-primary transition-colors">
            <FontAwesomeIcon icon={["fas", "print"]} className="mr-2" />
            Print Notice
          </button>
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-primary hover:text-primary transition-colors">
            <FontAwesomeIcon icon={["fas", "share-nodes"]} className="mr-2" />
            Share Notice
          </button>
        </div>
      </div>

      <div className="rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Related Notices</h3>
        <div className="space-y-4">
          <span className="block p-3 border border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
            <h4 className="font-medium text-sm mb-1">
              Semester Final Exam Schedule
            </h4>
            <p className="text-xs text-gray-500">December 10, 2024</p>
          </span>
          <span className="block p-3 border border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
            <h4 className="font-medium text-sm mb-1">
              Research Proposal Submission
            </h4>
            <p className="text-xs text-gray-500">December 8, 2024</p>
          </span>
        </div>
      </div>
    </aside>
  );
}
