import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Bold,
  Edit3,
  Eye,
  X,
  Heading1,
  Heading2,
  ImagePlus,
  Italic,
  List,
  RefreshCw,
  Send,
  Trash2,
  Underline,
} from "lucide-react";
import "./AdminDashboard.css";
import { fetchBlogJson, formatBlogDate, resolveAssetUrl } from "../../utils/blogApi";

const toolbarActions = [
  { label: "Bold", icon: Bold, command: "bold" },
  { label: "Italic", icon: Italic, command: "italic" },
  { label: "Underline", icon: Underline, command: "underline" },
  { label: "Bullets", icon: List, command: "insertUnorderedList" },
];

const AdminBlogPosting = () => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    title: "",
    category: "Career Guidance",
    excerpt: "",
  });
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [adminBlogs, setAdminBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [failedAdminImages, setFailedAdminImages] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    bullets: false,
    block: "",
  });

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateActiveFormats = () => {
    const selection = window.getSelection();
    const editor = editorRef.current;

    if (!selection || !editor || selection.rangeCount === 0) return;

    const anchorNode = selection.anchorNode;
    if (anchorNode && !editor.contains(anchorNode)) return;

    const block = document.queryCommandValue("formatBlock")?.toLowerCase() || "";
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      bullets: document.queryCommandState("insertUnorderedList"),
      block,
    });
  };

  useEffect(() => {
    document.addEventListener("selectionchange", updateActiveFormats);
    return () => document.removeEventListener("selectionchange", updateActiveFormats);
  }, []);

  const fetchAdminBlogs = async () => {
    setLoadingBlogs(true);
    try {
      const data = await fetchBlogJson("/api/blogs/admin/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAdminBlogs(data.blogs || []);
    } catch (err) {
      setMessage("Could not load posted blogs. Please make sure the backend is running on port 5009.");
    } finally {
      setLoadingBlogs(false);
    }
  };

  useEffect(() => {
    fetchAdminBlogs();
  }, []);

  const runCommand = (command, value = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    setContent(editorRef.current?.innerHTML || "");
    setTimeout(updateActiveFormats, 0);
  };

  const toggleBlock = (blockTag) => {
    const currentBlock = document.queryCommandValue("formatBlock")?.toLowerCase() || "";
    runCommand("formatBlock", currentBlock === blockTag ? "p" : blockTag);
  };

  const handleEditorInput = (e) => {
    setContent(e.currentTarget.innerHTML);
    updateActiveFormats();
  };

  const handleImage = (file) => {
    setImage(file || null);
    setImagePreview(file ? URL.createObjectURL(file) : "");
  };

  const resetForm = () => {
    setForm({
      title: "",
      category: "Career Guidance",
      excerpt: "",
    });
    setContent("");
    setImage(null);
    setImagePreview("");
    setEditingBlogId(null);
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }
  };

  const startEditing = (blog) => {
    setEditingBlogId(blog._id);
    setForm({
      title: blog.title || "",
      category: blog.category || "Career Guidance",
      excerpt: blog.excerpt || "",
    });
    setContent(blog.content || "");
    setImage(null);
    setImagePreview(resolveAssetUrl(blog.image));
    if (editorRef.current) {
      editorRef.current.innerHTML = blog.content || "";
      editorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMessage("Editing selected blog. Update details and save changes.");
  };

  const handleDelete = async (blog) => {
    const confirmed = window.confirm(`Delete "${blog.title}"? This cannot be undone.`);
    if (!confirmed) return;

    try {
      await fetchBlogJson(`/api/blogs/${blog._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (editingBlogId === blog._id) {
        resetForm();
      }
      setMessage("Blog deleted successfully.");
      fetchAdminBlogs();
    } catch (err) {
      setMessage(err.message || "Failed to delete blog");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.title.trim() || !form.excerpt.trim() || !content.trim()) {
      setMessage("Please add title, short description and blog content.");
      return;
    }

    const payload = new FormData();
    payload.append("title", form.title.trim());
    payload.append("category", form.category.trim() || "Career Guidance");
    payload.append("excerpt", form.excerpt.trim());
    payload.append("content", content);
    payload.append("status", "published");
    if (image) payload.append("image", image);

    setSaving(true);
    try {
      await fetchBlogJson(
        editingBlogId ? `/api/blogs/${editingBlogId}` : "/api/blogs",
        {
        method: editingBlogId ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
        }
      );

      setMessage(editingBlogId ? "Blog updated successfully." : "Blog published successfully.");
      resetForm();
      fetchAdminBlogs();
    } catch (err) {
      setMessage(err.message || "Failed to save blog");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header blog-admin-header">
        <div>
          <Link to="/admin-dashboard" className="admin-back-link">
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
          <h1>Blog Posting</h1>
          <p>Create and publish blogs with text styling and optional images.</p>
        </div>
        <Link to="/blog" className="blog-preview-link">
          <Eye size={18} />
          View User Blog Page
        </Link>
      </header>

      <form className="blog-editor-shell" onSubmit={handleSubmit}>
        <section className="blog-editor-main">
          <div className="blog-field-grid">
            <label>
              Blog Title
              <input
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="Enter attractive blog title"
              />
            </label>
            <label>
              Category
              <input
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                placeholder="Career Guidance"
              />
            </label>
          </div>

          <label className="blog-full-field">
            Short Description
            <textarea
              value={form.excerpt}
              onChange={(e) => updateField("excerpt", e.target.value)}
              placeholder="Write a short summary shown on the blog card"
            />
          </label>

          <div className="blog-toolbar">
            {toolbarActions.map(({ label, icon: Icon, command }) => (
              <button
                key={label}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  runCommand(command);
                }}
                className={
                  (command === "bold" && activeFormats.bold) ||
                  (command === "italic" && activeFormats.italic) ||
                  (command === "underline" && activeFormats.underline) ||
                  (command === "insertUnorderedList" && activeFormats.bullets)
                    ? "active"
                    : ""
                }
                aria-pressed={
                  (command === "bold" && activeFormats.bold) ||
                  (command === "italic" && activeFormats.italic) ||
                  (command === "underline" && activeFormats.underline) ||
                  (command === "insertUnorderedList" && activeFormats.bullets)
                }
                title={label}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                toggleBlock("h1");
              }}
              className={activeFormats.block === "h1" ? "active" : ""}
              aria-pressed={activeFormats.block === "h1"}
            >
              <Heading1 size={18} />
              H1
            </button>
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                toggleBlock("h2");
              }}
              className={activeFormats.block === "h2" ? "active" : ""}
              aria-pressed={activeFormats.block === "h2"}
            >
              <Heading2 size={18} />
              H2
            </button>
          </div>

          <div
            ref={editorRef}
            className="blog-rich-editor"
            contentEditable
            suppressContentEditableWarning
            onInput={handleEditorInput}
            onKeyUp={updateActiveFormats}
            onMouseUp={updateActiveFormats}
            onFocus={updateActiveFormats}
            data-placeholder="Write your blog content here. Use toolbar for bold, headings, bullet points, color and styling."
          />
        </section>

        <aside className="blog-editor-side">
          <div className="blog-image-box">
            <button
              type="button"
              className="blog-upload-trigger"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImagePlus size={22} />
              {imagePreview ? "Edit Blog Image" : "Add Blog Image"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleImage(e.target.files?.[0])}
            />
            {imagePreview ? (
              <img src={imagePreview} alt="Blog preview" className="blog-image-preview" />
            ) : (
              <div className="blog-image-empty">
                Image is optional. User page will automatically adjust when no image is uploaded.
              </div>
            )}
          </div>

          <div className="blog-live-card">
            <span>{form.category || "Career Guidance"}</span>
            {imagePreview && <img src={imagePreview} alt="" />}
            <h2>{form.title || "Your blog title preview"}</h2>
            <p>{form.excerpt || "Short description preview appears here."}</p>
          </div>

          <button
            type="button"
            className="blog-full-preview-btn"
            onClick={() => setPreviewOpen(true)}
          >
            <Eye size={18} />
            Preview Full Blog
          </button>

          {message && <div className="blog-editor-message">{message}</div>}

          <button type="submit" className="blog-publish-btn" disabled={saving}>
            <Send size={18} />
            {saving
              ? "Saving..."
              : editingBlogId
                ? "Update Blog"
                : "Publish Blog"}
          </button>
          {editingBlogId && (
            <button type="button" className="blog-cancel-edit-btn" onClick={resetForm}>
              <RefreshCw size={17} />
              Create New Blog
            </button>
          )}
        </aside>
      </form>

      <section className="blog-admin-list">
        <div className="blog-admin-list-header">
          <div>
            <h2>Posted Blogs</h2>
            <p>Edit or delete any blog anytime from here.</p>
          </div>
          <button type="button" onClick={fetchAdminBlogs}>
            <RefreshCw size={17} />
            Refresh
          </button>
        </div>

        {loadingBlogs ? (
          <div className="blog-admin-empty">Loading posted blogs...</div>
        ) : adminBlogs.length === 0 ? (
          <div className="blog-admin-empty">No blogs posted yet.</div>
        ) : (
          <div className="blog-admin-grid">
            {adminBlogs.map((blog) => (
              <article
                key={blog._id}
                className={`blog-admin-card ${editingBlogId === blog._id ? "editing" : ""}`}
              >
                {blog.image && !failedAdminImages[blog._id] ? (
                  <img
                    src={resolveAssetUrl(blog.image)}
                    alt={blog.title}
                    onError={() =>
                      setFailedAdminImages((prev) => ({ ...prev, [blog._id]: true }))
                    }
                  />
                ) : (
                  <div className="blog-admin-card-no-image">No Image</div>
                )}
                <div className="blog-admin-card-body">
                  <span>{blog.category || "Career Guidance"}</span>
                  <h3>{blog.title}</h3>
                  <p>{blog.excerpt}</p>
                  <small>Updated {formatBlogDate(blog.updatedAt)}</small>
                  <div className="blog-admin-card-actions">
                    <button type="button" onClick={() => startEditing(blog)}>
                      <Edit3 size={16} />
                      Edit
                    </button>
                    <button type="button" className="danger" onClick={() => handleDelete(blog)}>
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {previewOpen && (
        <div className="blog-preview-overlay" onClick={() => setPreviewOpen(false)}>
          <div className="blog-preview-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="blog-preview-close"
              onClick={() => setPreviewOpen(false)}
              aria-label="Close preview"
            >
              <X size={22} />
            </button>

            <section className="blog-preview-hero">
              <span>{form.category || "Career Guidance"}</span>
              <h1>{form.title || "Your blog title will appear here"}</h1>
              <p>
                {form.excerpt ||
                  "Your short blog description will appear here on the user page."}
              </p>
            </section>

            <article className="blog-preview-article">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Blog preview"
                  className="blog-preview-main-image"
                />
              )}
              {content ? (
                <div
                  className="blog-article-html"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
                <div className="blog-preview-empty">
                  Start writing content to see the full blog preview.
                </div>
              )}
            </article>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogPosting;