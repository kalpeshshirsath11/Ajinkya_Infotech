import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const RichTextEditor = ({ content, setContent }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded-xl p-3 bg-white">
      <div className="flex gap-2 mb-3 flex-wrap">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className="px-2 py-1 bg-gray-200 rounded">Bold</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className="px-2 py-1 bg-gray-200 rounded">Italic</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="px-2 py-1 bg-gray-200 rounded">H2</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="px-2 py-1 bg-gray-200 rounded">List</button>
      </div>

      <EditorContent editor={editor} className="min-h-[200px]" />
    </div>
  );
};

export default RichTextEditor;
