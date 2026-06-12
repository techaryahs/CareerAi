const express = require("express");
const router = express.Router();
const blogCtrl = require("../controllers/blog.controller");
const verifyToken = require("../middleware/auth");
const upload = require("../config/multer.config");

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }

  return res.status(403).json({ error: "Access denied. Admins only." });
};

router.get("/admin/all", verifyToken, isAdmin, blogCtrl.getAdminBlogs);
router.post("/", verifyToken, isAdmin, upload.single("image"), blogCtrl.createBlog);
router.put("/:id", verifyToken, isAdmin, upload.single("image"), blogCtrl.updateBlog);
router.delete("/:id", verifyToken, isAdmin, blogCtrl.deleteBlog);
router.get("/", blogCtrl.getPublishedBlogs);
router.get("/:slug", blogCtrl.getBlogBySlug);

module.exports = router;
