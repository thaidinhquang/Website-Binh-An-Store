import Blog from "../models/Blog.js";

// Lấy danh sách các bài blog
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ message: "Lỗi khi lấy danh sách blog" });
  }
};

// Lấy chi tiết một bài blog
export const getOneBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Không tìm thấy blog" });
    res.json(blog);
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(500).json({ message: "Lỗi khi lấy thông tin blog" });
  }
};

// Tạo một bài blog mới
export const createBlog = async (req, res) => {
  const { title, content, image } = req.body;

  console.log("Received blog data:", req.body);

  // Validation
  if (!title || typeof title !== 'string' || title.trim().length < 5) {
    return res.status(400).json({ message: "Tiêu đề phải có ít nhất 5 ký tự" });
  }

  if (!content || typeof content !== 'string' || content.trim().length < 10) {
    return res.status(400).json({ message: "Nội dung phải có ít nhất 10 ký tự" });
  }

  if (!image || typeof image !== 'string' || !image.startsWith('http')) {
    return res.status(400).json({ message: "Ảnh phải là một URL hợp lệ" });
  }

  const blog = new Blog({
    title: title.trim(),
    content: content.trim(),
    image
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(400).json({ message: "Lỗi khi tạo blog", details: err.message });
  }
};

// Cập nhật một bài blog
export const updateBlog = async (req, res) => {
  const { title, content, image } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Không tìm thấy blog" });

    // Validation
    if (title && (typeof title !== 'string' || title.trim().length < 5)) {
      return res.status(400).json({ message: "Tiêu đề phải có ít nhất 5 ký tự" });
    }

    if (content && (typeof content !== 'string' || content.trim().length < 10)) {
      return res.status(400).json({ message: "Nội dung phải có ít nhất 10 ký tự" });
    }

    if (image && (typeof image !== 'string' || !image.startsWith('http'))) {
      return res.status(400).json({ message: "Ảnh phải là một URL hợp lệ" });
    }

    blog.title = title ? title.trim() : blog.title;
    blog.content = content ? content.trim() : blog.content;
    blog.image = image || blog.image;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (err) {
    console.error("Error updating blog:", err);
    res.status(400).json({ message: "Lỗi khi cập nhật blog", details: err.message });
  }
};

// Xóa một bài blog
export const removeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Không tìm thấy blog" });

    await blog.deleteOne();
    res.json({ message: "Đã xóa blog thành công" });
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).json({ message: "Lỗi khi xóa blog" });
  }
};

// Khôi phục một bài blog (nếu có cơ chế khôi phục)
export const restoreBlog = async (req, res) => {
  // Implement restore logic if needed
  res.status(501).json({ message: "Chức năng này chưa được triển khai" });
};