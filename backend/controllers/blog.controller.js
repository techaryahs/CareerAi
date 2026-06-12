const BlogPost = require("../models/BlogPost");

const createSlug = (value) =>
  value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);

const makeUniqueSlug = async (title, excludeId = null) => {
  const base = createSlug(title) || `blog-${Date.now()}`;
  let slug = base;
  let counter = 2;

  const query = () => (excludeId ? { slug, _id: { $ne: excludeId } } : { slug });

  while (await BlogPost.exists(query())) {
    slug = `${base}-${counter}`;
    counter += 1;
  }

  return slug;
};

exports.getAdminBlogs = async (req, res) => {
  try {
    const blogs = await BlogPost.find()
      .sort({ updatedAt: -1 })
      .select("title slug category excerpt content image status createdAt updatedAt");

    res.json({ blogs });
  } catch (err) {
    console.error("Error fetching admin blogs:", err);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

exports.getPublishedBlogs = async (req, res) => {
  try {
    const blogs = await BlogPost.find({ status: "published" })
      .sort({ createdAt: -1 })
      .select("title slug category excerpt image createdAt updatedAt");

    res.json({ blogs });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await BlogPost.findOne({
      slug: req.params.slug,
      status: "published",
    });

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json({ blog });
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(500).json({ error: "Failed to fetch blog" });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, category, excerpt, content, status } = req.body;

    if (!title || !excerpt || !content) {
      return res.status(400).json({
        error: "Title, excerpt and content are required",
      });
    }

    const image = req.file ? `/uploads/${req.file.filename}` : "";
    const slug = await makeUniqueSlug(title);

    const blog = await BlogPost.create({
      title,
      slug,
      category: category || "Career Guidance",
      excerpt,
      content,
      image,
      status: status === "draft" ? "draft" : "published",
      author: req.user?._id || req.user?.id || null,
    });

    res.status(201).json({ blog, message: "Blog published successfully" });
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).json({ error: "Failed to create blog" });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { title, category, excerpt, content, status } = req.body;
    const blog = await BlogPost.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    if (!title || !excerpt || !content) {
      return res.status(400).json({
        error: "Title, excerpt and content are required",
      });
    }

    blog.title = title;
    blog.slug = await makeUniqueSlug(title, blog._id);
    blog.category = category || "Career Guidance";
    blog.excerpt = excerpt;
    blog.content = content;
    blog.status = status === "draft" ? "draft" : "published";

    if (req.file) {
      blog.image = `/uploads/${req.file.filename}`;
    }

    await blog.save();

    res.json({ blog, message: "Blog updated successfully" });
  } catch (err) {
    console.error("Error updating blog:", err);
    res.status(500).json({ error: "Failed to update blog" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await BlogPost.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).json({ error: "Failed to delete blog" });
  }
};
