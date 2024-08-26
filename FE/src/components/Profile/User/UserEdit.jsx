import { useContext, useEffect, useState } from "react";
import { AuthContext, fetchUser } from "../../Auth/core/Auth";
import { useTanstackMutation } from "../../../common/hooks/useTanstackQuery";
import { useMutation } from "@tanstack/react-query";
import { uploadFileCloudinary } from "../../../common/libs/uploadImageCloud";
import { toast } from 'react-toastify';

const UserEdit = () => {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const [image, setImage] = useState('');
    const [uploading, setUploading] = useState(false);
    const { form, onSubmit, isSuccess } = useTanstackMutation({
        path: `users`,
        action: "PATCH",
        navigatePage: "/profile",
    });
    const { register, handleSubmit, setValue } = form;

    useEffect(() => {
        if (isSuccess) {
            fetchUser(setCurrentUser);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (currentUser) {
            setValue("name", currentUser.name);
            setValue("email", currentUser.email);
            setValue("address", currentUser.address);
            setValue("phone", currentUser.phone);
            setValue("avatar", currentUser.avatar);
            setValue("_id", currentUser._id); 
            setImage(currentUser.avatar || '')
        }
    }, [currentUser, setValue]);

    const uploadMutation = useMutation({
        mutationFn: uploadFileCloudinary,
        onMutate: () => {
            setUploading(true);  
            toast.info("Đang tải ảnh..."); 
        },
        onSuccess: (data) => {
            setValue('avatar', data);
            setImage(data);
            toast.success("Ảnh đã được tải lên thành công");
        },
        onError: (error) => {
            console.error("Error uploading image:", error);
            toast.error("Không thể tải ảnh lên");
        },
    });

    const handleImageChange = async ({ target }) => {
        if (target.files.length > 0) {
            const file = target.files[0];
            setImage(URL.createObjectURL(file)); // Hiển thị ảnh trước khi upload
            uploadMutation.mutate(file); // Gửi file lên server
        }
    };

    return (
        <div className="profile-edit-container max-w-3xl mx-auto mt-10">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-6">Chỉnh Sửa Thông Tin</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700">Tên</label>
                        <input className="border rounded px-4 py-2" {...register("name")} />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700">Email</label>
                        <input className="border rounded px-4 py-2" {...register("email")} />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700">Địa chỉ</label>
                        <input className="border rounded px-4 py-2" {...register("address")} />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700">Số điện thoại</label>
                        <input className="border rounded px-4 py-2" {...register("phone")} />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700">Avatar</label>
                        {image && <img src={image} alt="Preview" className="mt-4 border rounded w-[300px] m-auto h-[300px]" />}
                        <button
                            type="button"
                            onClick={() => document.getElementById('file')?.click()}
                            className="py-1.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                        >
                            Chọn ảnh mới
                        </button>
                        <input 
                            type="file" 
                            id="file" 
                            accept="image/jpg, image/jpeg, image/png" 
                            onChange={handleImageChange}
                            className="hidden" 
                        />
                    </div>
                    <button type="submit" className="btn bg-blue-500 text-white px-4 py-2 rounded">
                        Lưu
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserEdit;
