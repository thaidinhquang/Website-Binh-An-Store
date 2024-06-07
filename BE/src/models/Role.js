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
            default: false,
        },
        update_category: {
            type: Boolean,
            default: false,
        },
        delete_category: {
            type: Boolean,
            default: false,
        },
        restore_category: {
            type: Boolean,
            default: false,
        },
        create_product: {
            type: Boolean,
            default: false,
        },
        update_product: {
            type: Boolean,
            default: false,
        },
        delete_product: {
            type: Boolean,
            default: false,
        },
        restore_product: {
            type: Boolean,
            default: false,
        },
        create_user: {
            type: Boolean,
            default: false,
        },
        update_user: {
            type: Boolean,
            default: false,
        },
        delete_user: {
            type: Boolean,
            default: false,
        },
        restore_user: {
            type: Boolean,
            default: false,
        },
        create_role: {
            type: Boolean,
            default: false,
        },
        update_role: {
            type: Boolean,
            default: false,
        },
        delete_role: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("Role", roleSchema);