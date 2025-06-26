import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import Placeholder from "@tiptap/extension-placeholder";

import { RichTextToolbar } from "./rich-text-toolbar";
import { MediaEmbedDialog } from "./media-embed-dialog";

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
        // Disable dropping to prevent default browser behavior
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
        width: undefined, // Let the class control it
        height: undefined,
        HTMLAttributes: {
          class: "w-full aspect-video rounded-lg my-4",
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || "Start writing...",
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      // On every update, call the onChange from React Hook Form
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        // Add prose styles for beautiful typography
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
