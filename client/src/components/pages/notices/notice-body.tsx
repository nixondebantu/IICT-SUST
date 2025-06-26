import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "sonner";
import { NoticeRes } from "@/lib/dtos/notice.dto";

interface NoticeBodyProps {
  notice: NoticeRes;
}

export default function NoticeBody({ notice }: NoticeBodyProps) {

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };


  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return { icon: "file-pdf", color: "text-red-500", bgColor: "bg-red-100" };
      case 'doc':
      case 'docx':
        return { icon: "file-word", color: "text-blue-600", bgColor: "bg-blue-100" };
      case 'xls':
      case 'xlsx':
        return { icon: "file-excel", color: "text-green-600", bgColor: "bg-green-100" };
      case 'ppt':
      case 'pptx':
        return { icon: "file-powerpoint", color: "text-orange-600", bgColor: "bg-orange-100" };
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return { icon: "file-image", color: "text-purple-600", bgColor: "bg-purple-100" };
      default:
        return { icon: "file", color: "text-gray-600", bgColor: "bg-gray-100" };
    }
  };


  const handleFileDownload = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          title: notice.title,
          text: notice.description,
          url: window.location.href,
        });
      } catch (error) {
        
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast.success("Link copied to clipboard!");
    });
  };

  return (
    <div className="lg:col-span-3">
      <article
        id="notice-article"
        className="rounded-lg shadow-lg overflow-hidden bg-white"
      >
        <div id="notice-header" className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              {notice.title}
            </h1>
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={handlePrint}
                className="p-2 text-gray-500 hover:text-primary transition-colors"
                title="Print Notice"
              >
                <FontAwesomeIcon icon={["fas", "print"]} className="text-lg" />
              </button>
              <button
                onClick={handleShare}
                className="p-2 text-gray-500 hover:text-primary transition-colors"
                title="Share"
              >
                <FontAwesomeIcon
                  icon={["fas", "share-nodes"]}
                  className="text-lg"
                />
              </button>
            </div>
          </div>

          <div
            id="notice-metadata"
            className="flex flex-wrap items-center gap-6 text-sm"
          >
            <div className="flex items-center text-gray-600">
              <FontAwesomeIcon
                icon={["fas", "calendar-days"]}
                className="mr-2 text-primary"
              />
              <span className="font-medium">Published:</span>
              <span className="ml-1">{formatDate(notice.date)}</span>
            </div>

            {notice.tags && notice.tags.length > 0 && (
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={["fas", "tag"]}
                  className="mr-2 text-primary"
                />
                <div className="flex flex-wrap gap-2">
                  {notice.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="bg-primary text-white px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {tag.value}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div id="notice-content" className="p-6">
          <div className="prose max-w-none">
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: notice.description }}
            />
          </div>
        </div>

        {notice.files && notice.files.length > 0 && (
          <div
            id="attachments-section"
            className="p-6 bg-gray-50 border-t border-gray-200"
          >
            <h3 className="text-lg font-semibold mb-4">
              <FontAwesomeIcon
                icon={["fas", "paperclip"]}
                className="mr-2 text-primary"
              />
              Attachments ({notice.files.length})
            </h3>
            <div className="space-y-3">
              {notice.files.map((file) => {
                const fileInfo = getFileIcon(file.title);
                return (
                    <div
                    key={file.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 rounded-lg border border-gray-200 hover:border-primary transition-colors bg-white"
                    >
                    <div className="flex items-center">
                      <div className={`w-10 h-10 ${fileInfo.bgColor} rounded-lg flex items-center justify-center mr-3`}>
                      <FontAwesomeIcon
                        icon={["fas", fileInfo.icon as any]}
                        className={`${fileInfo.color} text-xl`}
                      />
                      </div>
                      <div>
                      <p className="font-medium text-gray-900">{file.title}</p>
                      <p className="text-sm text-gray-500">
                        {file.title.split('.').pop()?.toUpperCase()}
                      </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleFileDownload(file.url, file.title)}
                      className="w-full sm:w-auto px-4 py-2 bg-primary/90 text-white rounded-lg hover:bg-primary transition-colors"
                    >
                      <FontAwesomeIcon icon={["fas", "download"]} className="mr-2" />
                      Download
                    </button>
                    </div>
                );
              })}
            </div>
          </div>
        )}
      </article>
      
      {/* akhane ata vlo lage na */}
      {/* <div id="back-navigation" className="mt-8">
        <Link
          to={"/notices"}
          className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-primary transition-colors cursor-pointer"
        >
          <FontAwesomeIcon icon={["fas", "arrow-left"]} className="mr-2" />
          Back to All Notices
        </Link>
      </div> */}
    </div>
  );
}