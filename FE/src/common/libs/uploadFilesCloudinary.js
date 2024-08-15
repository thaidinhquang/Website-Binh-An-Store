import axios from 'axios';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const isValidUrl = (string) => {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
};

const uploadFilesCloudinary = async (inputs) => {
    try {
        const indexedInputs = inputs.map((input, index) => ({ input, index }));

        const uploadPromises = indexedInputs.map(async ({ input, index }) => {
            if (isValidUrl(input)) {
                return input;
            } else {
                const formData = new FormData();
                formData.append("file", input);
                formData.append("upload_preset", "keqing");
                formData.append('folder', "reactjs");
                const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/dz5u8iawa/upload",
                    formData
                );
                return response.data.url;
            }
        });

        const results = await Promise.all(uploadPromises);
        return results
    } catch (error) {
        console.error(error);
    }
};

export { uploadFilesCloudinary };