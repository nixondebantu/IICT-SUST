import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import { NoticeRes } from "@/lib/dtos/notice.dto";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";


interface NoticeDetailsSidebarProps {
  relatedNotices: NoticeRes[];
  isRelatedLoading: boolean;
  notice: NoticeRes;
}

export default function NoticeDetailsSidebar({ 
  relatedNotices, 
  isRelatedLoading ,
  notice
}: NoticeDetailsSidebarProps) {
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${notice.title}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
        @media print {
          body { print-color-adjust: exact; }
          .no-print { display: none; }
        }
        </style>
      </head>
      <body class="font-serif max-w-4xl mx-auto p-10 leading-relaxed text-black bg-white">
        <div class="text-center mb-10 border-b-4 border-red-600 pb-5">
        <img src="/favicon.svg" alt="IICT Logo" class="w-20 h-20 mx-auto mb-4 object-contain" />
        <div class="text-xl font-bold text-red-600 mb-2 uppercase">
          Institute of Information Communication Technology (IICT)
        </div>
        <div class="text-base text-gray-600 mb-2">
          Shahjalal University of Science & Technology
        </div>
        <div class="text-xs text-gray-600 leading-normal">
          Email: info@iict-sust.edu.bd | Phone: +880-821-714479<br>
          Website: www.iict-sust.edu.bd | Sylhet-3114, Bangladesh
        </div>
        </div>
        
        <div class="text-center mb-8 p-4 bg-red-50 border-2 border-red-600 rounded-lg">
        <h1 class="text-2xl font-bold text-red-600 uppercase">${notice.title}</h1>
        </div>
        
        <div class="mb-8 p-4 bg-red-50 border-l-4 border-red-600">
        <div class="mb-2 text-gray-800"><span class="font-semibold text-red-600">Published:</span> ${formatDate(notice.date)}</div>
        ${notice.tags && notice.tags.length > 0 ? `
          <div class="mt-4">
          <span class="font-semibold text-red-600">Tags:</span>
          ${notice.tags.map(tag => `<span class="inline-block bg-red-600 text-white px-2 py-1 mr-2 text-xs rounded-full">${tag.value}</span>`).join('')}
          </div>
        ` : ''}
        </div>

        <div class="mb-8 text-justify bg-white p-5 border border-gray-300 rounded-lg">
        ${notice.description}
        </div>

        ${notice.files && notice.files.length > 0 ? `
        <div class="mt-8 p-5 bg-red-50 border border-red-600 rounded-lg">
          <h3 class="text-red-600 mb-4 pb-2 border-b border-red-600 font-semibold">📎 Attachments (${notice.files.length})</h3>
          ${notice.files.map(file => `
          <div class="mb-3 p-2 bg-white border border-red-200 rounded">
            <span class="font-medium">${file.title}</span> (${file.title.split('.').pop()?.toUpperCase()})
          </div>
          `).join('')}
        </div>
        ` : ''}

        <div class="mt-10 text-center text-xs text-gray-600 border-t border-red-600 pt-4">
        <p class="font-bold">Institute of Information Communication Technology (IICT)</p>
        <p>This is an official notice from IICT-SUST. For any queries, please contact the administration.</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };



  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: 'Check out this notice',
          url: window.location.href,
        });
        toast.success('Notice shared successfully!');
      } catch (error) {
        toast.error('Failed to share the notice. Copying link instead.');
        copyToClipboard();
      }
    } else {
      toast.info('Web Share API not supported. Copying link to clipboard.');
      copyToClipboard();
    }
  };


  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast.success('Notice link copied to clipboard!');
    });
  };

  return (
    <aside id="sidebar" className="lg:col-span-1">

      <div className="rounded-lg shadow-lg p-6 mb-6 bg-white">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <button 
            onClick={handlePrint}
            className="w-full flex items-center justify-center px-4 py-2 bg-primary/90 text-white rounded-lg hover:bg-primary transition-colors"
          >
            <FontAwesomeIcon icon={["fas", "print"]} className="mr-2" />
            Print Notice
          </button>
          <button 
            onClick={handleShare}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-primary hover:text-primary transition-colors"
          >
            <FontAwesomeIcon icon={["fas", "share-nodes"]} className="mr-2" />
            Share Notice
          </button>
        </div>
      </div>

      <div className="rounded-lg shadow-lg p-6 bg-white">
        <h3 className="text-lg font-semibold mb-4">Related Notices</h3>
        
        {isRelatedLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : relatedNotices.length > 0 ? (
          <div className="space-y-4">
            {relatedNotices.map((notice) => (
              <Link
                key={notice.id}
                to={`/notices/${notice.id}`}
                className="block p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
              >
                <h4 className="font-medium text-sm mb-1 line-clamp-2 text-gray-900">
                  {notice.title}
                </h4>
                <p className="text-xs text-gray-500 mb-2">
                  {formatDate(notice.date)}
                </p>
                {notice.tags && notice.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {notice.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag.id}
                        className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                      >
                        {tag.value}
                      </span>
                    ))}
                    {notice.tags.length > 2 && (
                      <span className="text-xs text-gray-500 px-1">
                        +{notice.tags.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <FontAwesomeIcon
              icon={["fas", "inbox"]}
              className="text-gray-300 text-3xl mb-2"
            />
            <p className="text-sm text-gray-500">No related notices found</p>
          </div>
        )}
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <Link
            to="/notices"
            className="w-full flex items-center justify-center px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={["fas", "list"]} className="mr-2" />
            View All Notices
          </Link>
        </div>
      </div>

    </aside>
  );
}