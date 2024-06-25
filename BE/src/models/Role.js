import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        create_category: {
            type: Boolean,
            default: true,
        },
        update_category: {
            type: Boolean,
            default: true,
        },
        delete_category: {
            type: Boolean,
            default: true,
        },
        restore_category: {
            type: Boolean,
            default: true,
        },
        create_product: {
            type: Boolean,
            default: true,
        },
        update_product: {
            type: Boolean,
            default: true,
        },
        delete_product: {
            type: Boolean,
            default: true,
        },
        restore_product: {
            type: Boolean,
            default: true,
        },
        get_user: {
            type: Boolean,
            default: true,
        },
        create_user: {
            type: Boolean,
            default: true,
        },
        update_user: {
            type: Boolean,
            default: true,
        },
        delete_user: {
            type: Boolean,
            default: true,
        },
        restore_user: {
            type: Boolean,
            default: true,
        },
        create_role: {
            type: Boolean,
            default: true,
        },
        update_role: {
            type: Boolean,
            default: true,
        },
        delete_role: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("Role", roleSchema);