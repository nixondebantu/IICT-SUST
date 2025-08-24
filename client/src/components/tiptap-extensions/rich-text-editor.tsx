import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

import { MediaEmbedDialog } from "./media-embed-dialog";
import { RichTextToolbar } from "./rich-text-toolbar";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder,
}: RichTextEditorProps) {
  const [showMediaDialog, setShowMediaDialog] = useState(false);
  const [mediaType, setMediaType] = useState<"image" | "video">("image");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        dropcursor: {
          color: "#555",
          width: 2,
        },
      }),
      Underline,
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: "text-primary underline cursor-pointer",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg my-4",
        },
      }),
      Youtube.configure({
        width: undefined,
        height: undefined,
        HTMLAttributes: {
          class: "w-full aspect-video rounded-lg my-4",
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || "Start writing...",
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base max-w-none focus:outline-none p-4",
      },
    },
  });

  // This effect syncs the editor content if the `value` prop changes
  // from outside (e.g., form.reset()).
  useEffect(() => {
    if (editor && !editor.isDestroyed) {
      const editorContent = editor.getHTML();
      // Compare the content and update only if it's different.
      // This prevents an infinite loop and preserves cursor position.
      if (value !== editorContent) {
        editor.commands.setContent(value, false); // `false` prevents firing onUpdate
      }
    }
  }, [value, editor]);

  const insertMedia = (url: string, type: "image" | "video") => {
    if (!editor) return;

    if (type === "image") {
      editor.chain().focus().setImage({ src: url }).run();
    } else {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  };

  return (
    <div className="border rounded-lg">
      <RichTextToolbar
        editor={editor}
        onImageClick={() => {
          setMediaType("image");
          setShowMediaDialog(true);
        }}
        onVideoClick={() => {
          setMediaType("video");
          setShowMediaDialog(true);
        }}
      />
      <div className="min-h-[250px] max-h-[500px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>

      <MediaEmbedDialog
        isOpen={showMediaDialog}
        onClose={() => setShowMediaDialog(false)}
        onInsert={insertMedia}
        type={mediaType}
      />
    </div>
  );
}
