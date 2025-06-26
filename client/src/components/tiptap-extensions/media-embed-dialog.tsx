import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Image, LinkIcon, Video } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface MediaEmbedDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (url: string, type: "image" | "video") => void;
  type: "image" | "video";
}
export function MediaEmbedDialog({
  isOpen,
  onClose,
  onInsert,
  type,
}: MediaEmbedDialogProps) {
  const [url, setUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const handleInsert = () => {
    if (url.trim()) {
      onInsert(url.trim(), type);
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setUrl("");
      setPreviewUrl("");
    }
  }, [isOpen]);

  const handleUrlChange = (value: string) => {
    setUrl(value);
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      setPreviewUrl("");
      return;
    }

    if (type === "image") {
      setPreviewUrl(trimmedValue);
    } else if (type === "video") {
      const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
      const match = trimmedValue.match(youtubeRegex);
      if (match && match[1]) {
        setPreviewUrl(`https://www.youtube.com/embed/${match[1]}`);
      } else {
        setPreviewUrl("");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === "image" ? (
              <Image className="h-5 w-5" />
            ) : (
              <Video className="h-5 w-5" />
            )}
            Embed {type === "image" ? "Image" : "Video"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="media-url">
              {type === "image" ? "Image URL" : "Video URL (YouTube)"}
            </Label>
            <Input
              id="media-url"
              placeholder={
                type === "image"
                  ? "https://example.com/image.jpg"
                  : "https://www.youtube.com/watch?v=..."
              }
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              className="w-full"
            />
          </div>

          {previewUrl && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="border rounded-lg p-2 bg-muted/50 overflow-hidden">
                {type === "image" ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-w-full h-auto max-h-48 rounded mx-auto"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      setPreviewUrl("");
                    }}
                  />
                ) : (
                  <div className="aspect-video relative w-full">
                    <iframe
                      src={previewUrl}
                      className="absolute top-0 left-0 w-full h-full rounded"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Video preview"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleInsert}
            disabled={!url.trim() || (type === "video" && !previewUrl)}
          >
            <LinkIcon className="h-4 w-4 mr-2" />
            Insert {type === "image" ? "Image" : "Video"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
