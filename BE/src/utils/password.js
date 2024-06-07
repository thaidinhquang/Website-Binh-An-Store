import bcryptjs from "bcryptjs";

export const comparePassword = async (password, hashedPassword) => {
    const validPassword = await bcryptjs.compare(password, hashedPassword);
    return validPassword;
};

export const hashPassword = async (password) => {
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    return hashPassword;
};