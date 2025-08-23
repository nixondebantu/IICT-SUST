import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Plus,
  Quote,
  Redo,
  SquareCode,
  Strikethrough,
  Table as TableIcon,
  Trash2,
  Underline as UnderlineIcon,
  Undo,
  Video,
} from "lucide-react";
import { useCallback } from "react";
import { TooltipWrapper } from "../ui/custom-tooltip-wrapper";

interface RichTextToolbarProps {
  editor: Editor | null;
  onImageClick: () => void;
  onVideoClick: () => void;
}

// Custom SVG icons for better table management
const TableRowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="3" width="12" height="2" rx="0.5" fill="currentColor" />
    <rect x="2" y="7" width="12" height="2" rx="0.5" fill="currentColor" />
    <rect x="2" y="11" width="12" height="2" rx="0.5" fill="currentColor" />
    <rect
      x="1.5"
      y="2.5"
      width="13"
      height="11"
      rx="1"
      stroke="currentColor"
      fill="none"
      strokeWidth="1"
    />
  </svg>
);

const TableColumnIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="2" width="2" height="12" rx="0.5" fill="currentColor" />
    <rect x="7" y="2" width="2" height="12" rx="0.5" fill="currentColor" />
    <rect x="11" y="2" width="2" height="12" rx="0.5" fill="currentColor" />
    <rect
      x="2.5"
      y="1.5"
      width="11"
      height="13"
      rx="1"
      stroke="currentColor"
      fill="none"
      strokeWidth="1"
    />
  </svg>
);

export function RichTextToolbar({
  editor,
  onImageClick,
  onVideoClick,
}: RichTextToolbarProps) {
  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border rounded-t-lg bg-background z-10 sticky top-0">
      {/* Undo/Redo */}
      <TooltipWrapper tooltip="Undo">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="h-4 w-4" />
        </Button>
      </TooltipWrapper>
      <TooltipWrapper tooltip="Redo">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </TooltipWrapper>
      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Headings */}
      <TooltipWrapper tooltip="Heading 1">
        <Button
          type="button"
          variant={
            editor.isActive("heading", { level: 1 }) ? "secondary" : "ghost"
          }
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Heading1 className="h-4 w-4" />
        </Button>
      </TooltipWrapper>
      <TooltipWrapper tooltip="Heading 2">
        <Button
          type="button"
          variant={
            editor.isActive("heading", { level: 2 }) ? "secondary" : "ghost"
          }
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 className="h-4 w-4" />
        </Button>
      </TooltipWrapper>
      <TooltipWrapper tooltip="Heading 3">
        <Button
          type="button"
          variant={
            editor.isActive("heading", { level: 3 }) ? "secondary" : "ghost"
          }
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 className="h-4 w-4" />
        </Button>
      </TooltipWrapper>
      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Text Formatting */}
      <TooltipWrapper tooltip="Bold">
        <Button
          type="button"
          variant={editor.isActive("bold") ? "secondary" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Button>
      </TooltipWrapper>
      <TooltipWrapper tooltip="Italic">
        <Button
          type="button"
          variant={editor.isActive("italic") ? "secondary" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Button>
      </TooltipWrapper>
      <TooltipWrapper tooltip="Underline">
        <Button
          type="button"
          variant={editor.isActive("underline") ? "secondary" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>
      </TooltipWrapper>
      <TooltipWrapper tooltip="Strikethrough">
        <Button
          type="button"
          variant={editor.isActive("strike") ? "secondary" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
      </TooltipWrapper>
      <TooltipWrapper tooltip="Inline Code">
        <Button
          type="button"
          variant={editor.isActive("code") ? "secondary" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Code className="h-4 w-4" />
        </Button>
      </TooltipWrapper>
      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Lists & Blocks */}
      <TooltipWrapper tooltip="Bullet List">
        <Button
          type="button"
          variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </Button>
      </TooltipWrapper>
      <TooltipWrapper tooltip="Numbered List">
        <Button
          type="button"
          variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
      </TooltipWrapper>
      <TooltipWrapper tooltip="Quote">
        <Button
          type="button"
          variant={editor.isActive("blockquote") ? "secondary" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="h-4 w-4" />
        </Button>
      </TooltipWrapper>
      <TooltipWrapper tooltip="Code Block">
        <Button
          type="button"
          variant={editor.isActive("codeBlock") ? "secondary" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <SquareCode className="h-4 w-4" />
        </Button>
      </TooltipWrapper>
      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Table Management */}
      <TooltipWrapper tooltip="Insert Table">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          <TableIcon className="h-4 w-4" />
        </Button>
      </TooltipWrapper>

      <TooltipWrapper tooltip="Add Column">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          disabled={!editor.can().addColumnAfter()}
        >
          <div className="flex items-center">
            <TableColumnIcon />
            <Plus className="h-2 w-2 -ml-1 -mt-1" />
          </div>
        </Button>
      </TooltipWrapper>

      <TooltipWrapper tooltip="Add Row">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().addRowAfter().run()}
          disabled={!editor.can().addRowAfter()}
        >
          <div className="flex items-center">
            <TableRowIcon />
            <Plus className="h-2 w-2 -ml-1 -mt-1" />
          </div>
        </Button>
      </TooltipWrapper>

      <TooltipWrapper tooltip="Remove Column">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().deleteColumn().run()}
          disabled={!editor.can().deleteColumn()}
        >
          <div className="flex items-center">
            <TableColumnIcon />
            <Minus className="h-2 w-2 -ml-1 -mt-1" />
          </div>
        </Button>
      </TooltipWrapper>

      <TooltipWrapper tooltip="Remove Row">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().deleteRow().run()}
          disabled={!editor.can().deleteRow()}
        >
          <div className="flex items-center">
            <TableRowIcon />
            <Minus className="h-2 w-2 -ml-1 -mt-1" />
          </div>
        </Button>
      </TooltipWrapper>

      <TooltipWrapper tooltip="Delete Table">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().deleteTable().run()}
          disabled={!editor.can().deleteTable()}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TooltipWrapper>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Links and Media */}
      <TooltipWrapper tooltip="Add Link">
        <Button
          type="button"
          variant={editor.isActive("link") ? "secondary" : "ghost"}
          size="sm"
          onClick={setLink}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
      </TooltipWrapper>
      <TooltipWrapper tooltip="Insert Image">
        <Button type="button" variant="ghost" size="sm" onClick={onImageClick}>
          <ImageIcon className="h-4 w-4" />
        </Button>
      </TooltipWrapper>
      <TooltipWrapper tooltip="Insert Video">
        <Button type="button" variant="ghost" size="sm" onClick={onVideoClick}>
          <Video className="h-4 w-4" />
        </Button>
      </TooltipWrapper>
    </div>
  );
}
