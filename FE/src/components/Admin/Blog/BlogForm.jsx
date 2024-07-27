import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../../config/axios";
import { toast } from "react-toastify";
import MarkdownIt from 'markdown-it';

const BlogForm = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const [htmlContent, setHtmlContent] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { mutate, isPending } = useMutation({
        mutationFn: async (blog) => {
            const { data } = await instance.post(`/blogs`, blog);
            return data;
        },
        onSuccess: () => {
            toast.success("Blog đã được thêm thành công!");
            navigate("/admin/blogs");
        },
        onError: () => {
            toast.error("Không thể thêm blog");
        },
    });

    const md = new MarkdownIt();

    const onSubmit = (data) => {
        const markdownContent = md.render(content);
        mutate({ ...data, content: markdownContent });
        setHtmlContent(markdownContent);
    };

    return (
        <div className="p-4">
            <h1 className="text-lg font-bold mb-4">Thêm thông tin Blog</h1>
            <div className="flex justify-end mb-4">
                <Link to="/admin/blogs">
                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Quay lại
                    </button>
                </Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Tiêu đề Blog:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        {...register("title", { required: 'Không được bỏ trống' })}
                        type="text"
                    />
                    {errors?.title && <span className="text-red-500">{errors?.title?.message}</span>}
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nội dung Blog (Markdown):</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="10"
                    />
                    {errors?.content && <span className="text-red-500">{errors?.content?.message}</span>}
                </div>
                <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5">
                    {isPending ? "Đang Thêm..." : "Thêm"}
                </button>
            </form>
            {htmlContent && (
                <div className="mt-4">
                    <h2 className="text-lg font-bold">Nội dung Blog:</h2>
                    <div className="border p-4 rounded" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                </div>
            )}
        </div>
    );
}

export default BlogForm;