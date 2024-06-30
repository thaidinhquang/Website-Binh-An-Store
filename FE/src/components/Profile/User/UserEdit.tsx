import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../Auth/core/Auth";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTanstackMutation } from "../../../common/hooks/useTanstackQuery";

const UserEdit = () => {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { form, onSubmit } = useTanstackMutation(`users`, "UPDATE", "/profile");
    const { register, handleSubmit, setValue } = form;

    useEffect(() => {
        if (currentUser) {
            setValue("name", currentUser.name);
            setValue("email", currentUser.email);
            setValue("address", currentUser.address);
            setValue("phone", currentUser.phone);
            setValue("_id", currentUser._id); 
        }
    }, [currentUser, setValue]);

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
                    <button type="submit" className="btn bg-blue-500 text-white px-4 py-2 rounded">
                        Lưu
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserEdit;