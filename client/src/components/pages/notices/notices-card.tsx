import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { NoticeRes } from "@/lib/dtos/notice.dto";
import { toast } from "sonner";
import { useCallback, useMemo } from "react";

interface NoticesCardProps {
  notice: NoticeRes;
  className?: string;
}

export default function NoticesCard({ notice, className = "" }: NoticesCardProps) {

  const formatDate = useCallback((dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid Date';
    }
  }, []);

  const getFileIcon = useCallback((fileName: string) => {
    const extension = fileName?.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return { icon: "file-pdf", color: "text-red-500" };
      case 'doc':
      case 'docx':
        return { icon: "file-word", color: "text-blue-600" };
      case 'xls':
      case 'xlsx':
        return { icon: "file-excel", color: "text-green-600" };
      case 'ppt':
      case 'pptx':
        return { icon: "file-powerpoint", color: "text-orange-600" };
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
        return { icon: "file-image", color: "text-purple-600" };
      case 'zip':
      case 'rar':
      case '7z':
        return { icon: "file-zipper", color: "text-yellow-600" };
      default:
        return { icon: "file", color: "text-gray-600" };
    }
  }, []);

  const getTextPreview = useCallback((htmlContent: string, maxLength: number = 150) => {
    if (!htmlContent || typeof htmlContent !== 'string') {
      return 'No description available';
    }

    try {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      
      if (textContent.length <= maxLength) {
        return textContent || 'No description available';
      }
      
      return textContent.substring(0, maxLength).trim() + '...';
    } catch (error) {
      console.error('Text preview error:', error);
      return 'Description unavailable';
    }
  }, []);

  const handleShare = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const shareUrl = `${window.location.origin}/notices/${notice.id}`;
    const shareData = {
      title: notice.title || 'Notice',
      text: getTextPreview(notice.description || '', 100),
      url: shareUrl,
    };
    
    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast.success("Shared successfully!");
      } else {
        await copyToClipboard(shareUrl);
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        await copyToClipboard(shareUrl);
      }
    }
  }, [notice, getTextPreview]);

  const copyToClipboard = useCallback(async (url: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      console.error('Copy to clipboard failed:', error);
      toast.error("Failed to copy link");
    }
  }, []);


  const formattedDate = useMemo(() => formatDate(notice.date), [notice.date, formatDate]);
  const textPreview = useMemo(() => getTextPreview(notice.description || ''), [notice.description, getTextPreview]);

  return (
    <Link
      to={`/notices/${notice.id}`}
      id={`notice-${notice.id}`}
      className={`
        block rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 
        hover:border-primary/30 group bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        ${className}
      `}
      aria-label={`Read notice: ${notice.title}`}
    >
      <article className="p-6">
        <header className="flex justify-between items-start mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-200 mb-3 line-clamp-2">
              {notice.title || 'Untitled Notice'}
            </h3>
            

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
              <span className="flex items-center" title={`Published on ${formattedDate}`}>
                <FontAwesomeIcon icon={["far", "calendar"]} className="mr-1.5 text-xs" aria-hidden="true" />
                {formattedDate}
              </span>
              
              {notice.tags && notice.tags.length > 0 && (
                <div className="flex items-center gap-1.5" role="list" aria-label="Notice categories">
                  {notice.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag.id}
                      className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium"
                      role="listitem"
                    >
                      {tag.value}
                    </span>
                  ))}
                  {notice.tags.length > 2 && (
                    <span className="text-xs text-gray-400" title={`${notice.tags.length - 2} more categories`}>
                      +{notice.tags.length - 2} more
                    </span>
                  )}
                </div>
              )}
              
              {notice.files && notice.files.length > 0 && (
                <span 
                  className="flex items-center text-gray-600" 
                  title={`${notice.files.length} attachment${notice.files.length !== 1 ? 's' : ''}`}
                >
                  <FontAwesomeIcon 
                    icon={["fas", getFileIcon(notice.files[0].title).icon as any]} 
                    className={`mr-1.5 text-xs ${getFileIcon(notice.files[0].title).color}`} 
                    aria-hidden="true"
                  />
                  {notice.files.length} attachment{notice.files.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            
            <p className="text-gray-600 leading-relaxed line-clamp-3">
              {textPreview}
            </p>
          </div>
        </header>

        <footer className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-primary group-hover:text-primary/80 font-medium text-sm flex items-center transition-colors duration-200">
            Read More
            <FontAwesomeIcon 
              icon={["fas", "arrow-right"]} 
              className="ml-2 text-xs group-hover:translate-x-1 transition-transform duration-200" 
              aria-hidden="true"
            />
          </span>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="text-gray-400 hover:text-primary transition-colors duration-200 p-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              title="Share this notice"
              aria-label="Share this notice"
              type="button"
            >
              <FontAwesomeIcon icon={["fas", "share"]} className="text-base" />
            </button>
          </div>
        </footer>

      </article>
    </Link>
  );
}