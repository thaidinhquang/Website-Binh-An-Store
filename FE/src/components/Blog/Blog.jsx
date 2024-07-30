const Blog = ({ blog }) => {
    return (
        <div className="blog-card">
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-xl font-bold">{blog.title}</h2>
                <p className="text-gray-600">{blog.excerpt}</p>
                <a href={`/blogs/${blog._id}`} className="text-blue-500">Read more</a>
            </div>
        </div>
    );
};

export default Blog;