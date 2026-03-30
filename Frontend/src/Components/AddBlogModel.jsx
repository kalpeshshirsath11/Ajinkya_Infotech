import { useState, useEffect } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";

const AddBlogModal = ({ isOpen, onClose, refresh }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [published, setPublished] = useState(true);
  const [mode, setMode] = useState("editor");
  const [htmlInput, setHtmlInput] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: true }),
      Youtube.configure({ width: 640, height: 360 }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none focus:outline-none min-h-[350px] px-4 py-3",
      },
    },
  });

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (!isOpen || !editor) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const content =
        mode === "editor" ? editor.getHTML() : htmlInput;

      const data = new FormData();
      data.append("title", title);
      data.append("content", content);
      data.append("published", published);

      if (image) data.append("image", image);

      await api.post("/blogs", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Blog created successfully");
      onClose();
      refresh();
    } catch {
      toast.error("Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-51 bg-black/50 backdrop-blur-sm 
                 flex justify-center items-start pt-10 overflow-y-auto"
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-8 relative
                   max-h-[90vh] overflow-y-auto"
      >

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-xl font-bold text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        {/* TITLE */}
        <input
          type="text"
          placeholder="Write your blog title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-3xl font-bold outline-none border-b pb-3 mb-6"
        />

        {/* MODE SWITCH */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setMode("editor")}
            className={`px-4 py-2 rounded-lg ${
              mode === "editor"
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Write Blog
          </button>

          <button
            onClick={() => setMode("html")}
            className={`px-4 py-2 rounded-lg ${
              mode === "html"
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Paste HTML
          </button>
        </div>

        {/* EDITOR */}
        {mode === "editor" && (
          <>
            <div className="sticky top-0 z-10 bg-white border rounded-xl p-3 mb-4 flex flex-wrap gap-2 shadow-sm">
              <ToolbarButton
                active={editor.isActive("bold")}
                onClick={() => editor.chain().focus().toggleBold().run()}
                label="Bold"
              />
              <ToolbarButton
                active={editor.isActive("italic")}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                label="Italic"
              />
              <ToolbarButton
                active={editor.isActive("heading", { level: 1 })}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                label="H1"
              />
              <ToolbarButton
                active={editor.isActive("heading", { level: 2 })}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                label="H2"
              />
              <ToolbarButton
                active={editor.isActive("bulletList")}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                label="• List"
              />
              <ToolbarButton
                active={editor.isActive("orderedList")}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                label="1. List"
              />
              <ToolbarButton
                active={editor.isActive("blockquote")}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                label="Quote"
              />
              <ToolbarButton
                active={editor.isActive("codeBlock")}
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                label="Code"
              />
              <ToolbarButton
                onClick={() => {
                  const url = prompt("Enter Image URL");
                  if (url)
                    editor.chain().focus().setImage({ src: url }).run();
                }}
                label="Image"
              />
              <ToolbarButton
                onClick={() => {
                  const url = prompt("Enter URL");
                  if (url)
                    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
                }}
                label="Link"
              />
              <ToolbarButton
                onClick={() => {
                  const url = prompt("Enter YouTube URL");
                  if (url) editor.commands.setYoutubeVideo({ src: url });
                }}
                label="YouTube"
              />
              <ToolbarButton
                onClick={() => editor.chain().focus().undo().run()}
                label="Undo"
              />
              <ToolbarButton
                onClick={() => editor.chain().focus().redo().run()}
                label="Redo"
              />
            </div>

            <div className="border rounded-xl bg-white">
              <EditorContent editor={editor} />
            </div>
          </>
        )}

        {/* HTML MODE */}
        {mode === "html" && (
          <textarea
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            placeholder="Paste your full HTML here..."
            className="w-full min-h-[350px] border rounded-xl p-4 font-mono text-sm"
          />
        )}

        {/* IMAGE */}
        <div className="mt-6">
          <label className="font-semibold">Cover Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 w-full h-48 object-cover rounded-xl"
            />
          )}
        </div>

        {/* FOOTER */}
        <div className="mt-6 flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={published}
              onChange={() => setPublished(!published)}
            />
            Publish immediately
          </label>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl"
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </button>
        </div>
      </div>
    </div>
  );
};

const ToolbarButton = ({ active, onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-3 py-1 rounded-lg text-sm font-medium transition
      ${active ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
  >
    {label}
  </button>
);

export default AddBlogModal;