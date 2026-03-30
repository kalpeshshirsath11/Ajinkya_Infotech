import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";

const UpdateBlogModal = ({ blog, onClose, onUpdated }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(false);

  const [mode, setMode] = useState("editor");
  const [htmlInput, setHtmlInput] = useState("");
  const [show, setShow] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: true }),
      Youtube.configure({
        width: 640,
        height: 360,
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none focus:outline-none min-h-[250px] px-4 py-3",
      },
    },
  });

  useEffect(() => {
    if (blog && editor) {
      setTitle(blog.title);
      setPublished(blog.published);
      setHtmlInput(blog.content || "");
      setExistingImage(blog.coverImage);

      setTimeout(() => {
        editor.commands.setContent(blog.content || "");
        setShow(true);
      }, 100);
    }
  }, [blog, editor]);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 200);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const content =
        mode === "editor" ? editor.getHTML() : htmlInput;

      const data = new FormData();
      data.append("title", title);
      data.append("content", content);
      data.append("published", published);

      if (image) data.append("image", image);

      await api.put(`/blogs/${blog.id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Blog updated!");
      onUpdated();
      handleClose();
    } catch (err) {
      toast.error("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  if (!blog || !editor) return null;

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 flex justify-center items-start pt-10 z-51 transition
      ${show ? "bg-black/40" : "bg-black/0"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-5xl bg-white rounded-2xl shadow-xl p-6 overflow-y-auto max-h-[90vh]
        transform transition ${show ? "scale-100" : "scale-95 opacity-0"}`}
      >
        {/* CLOSE */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-5 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">Update Blog</h2>

        {/* TITLE */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-xl font-semibold border-b mb-4 outline-none"
        />

        {/* MODE SWITCH */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setMode("editor")}
            className={mode === "editor" ? "btn-active" : "btn"}
          >
            Editor
          </button>

          <button
            onClick={() => setMode("html")}
            className={mode === "html" ? "btn-active" : "btn"}
          >
            HTML
          </button>
        </div>

        {/* ===== TOOLBAR ===== */}
        {mode === "editor" && (
          <>
            <div className="flex flex-wrap gap-2 mb-3">
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                label="Bold"
              />
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                label="Italic"
              />
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                label="H1"
              />
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().toggleBulletList().run()
                }
                label="List"
              />
              <ToolbarButton
                onClick={() => {
                  const url = prompt("Image URL");
                  if (url) editor.chain().focus().setImage({ src: url }).run();
                }}
                label="Image"
              />
              <ToolbarButton
                onClick={() => {
                  const url = prompt("Link URL");
                  if (url)
                    editor.chain().focus().setLink({ href: url }).run();
                }}
                label="Link"
              />
            </div>

            <div className="border rounded-xl">
              <EditorContent editor={editor} />
            </div>
          </>
        )}

        {/* HTML MODE */}
        {mode === "html" && (
          <textarea
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            className="w-full min-h-[250px] border p-3 rounded-xl"
          />
        )}

        {/* IMAGE */}
        <div className="mt-4">
          <input type="file" onChange={handleImageChange} />

          {(preview || existingImage) && (
            <img
              src={preview || existingImage}
              className="mt-3 h-40 w-full object-cover rounded-xl"
            />
          )}
        </div>

        {/* PUBLISH */}
        <label className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            checked={published}
            onChange={() => setPublished(!published)}
          />
          Published
        </label>

        {/* ACTIONS */}
        <div className="flex gap-3 mt-5">
          <button
            onClick={handleUpdate}
            className="flex-1 bg-orange-500 text-white py-2 rounded-xl"
          >
            {loading ? "Updating..." : "Update"}
          </button>

          <button
            onClick={handleClose}
            className="flex-1 bg-gray-400 text-white py-2 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const ToolbarButton = ({ onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    className="px-3 py-1 bg-gray-100 rounded-lg"
  >
    {label}
  </button>
);

export default UpdateBlogModal;