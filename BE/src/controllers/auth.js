import User from "../models/User.js";
import { token } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "../utils/password.js";

export const signUp = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                message: "Email đã được sử dụng",
            });
        }

        const hashPasswordUser = await hashPassword(password);
        const user = await User.create({
            email,
            password: hashPasswordUser,
        });

        const accessToken = token({ _id: user._id }, "365d");
        return res.status(201).json({
            message: "Đăng ký thành công!",
            accessToken,
        });
    } catch (error) {
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({
                message: "Email không tồn tại",
            });
        }
        if (userExist.active == false) {
            return res.status(400).json({
                message: "Người dùng không hoạt động",
            });
        }
        const checkPassword = await comparePassword(password, userExist.password);
        if (!checkPassword) {
            return res.status(400).json({
                message: "Mật khẩu không đúng",
            });
        }

        const accessToken = token({ _id: userExist._id }, "365d");
        return res.status(200).json({
            message: "Đăng nhập thành công!",
            accessToken,
        });
    } catch (error) {
        next(error);
    }
};

export const getUserByToken = async (req, res, next) => {
    try {
        const data = req.user;
        data.password = undefined;
        return res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
}

import sendEmail from "../utils/sendEmail.js";
export const sendOTP = async (req, res, next) => {
    try {
        const email = req.body.email;
        if (!email) {
            return res.status(400).json({
                message: "Email không được để trống!",
            });
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        const checkEmail = await User.findOne({ email });
        if (!checkEmail) {
            return res.status(400).json({
                message: "Email không tồn tại!",
            });
        }
        const updateOTP = await User.findByIdAndUpdate(checkEmail.id, {
            otp: otp,
            otpCreatedAt: new Date(),
        });
        if (!updateOTP) {
            return res.status(400).json({
                message: "Có lỗi xảy ra!",
            });
        }
        if (sendEmail(checkEmail.email, "Đặt lại mật khẩu", `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Nguyen Tuan Anh</a>
    </div>
    <p style="font-size:1.1em">Xin chào,</p>
    <p>Cảm ơn bạn đã chọn website của chúng tôi. Sử dụng OTP sau đây để hoàn tất quy trình khôi phục mật khẩu của bạn. OTP có hiệu lực trong 5 phút</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
    <p style="font-size:0.9em;">Trân trọng,<br />Nguyen Tuan Anh</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Nguyen Tuan Anh</p>
        <p>Việt Nam</p>
    </div>
    </div>
</div>`)) {
            return res.status(200).json({
                message: "Gửi email thành công!",
                id: checkEmail.id,
            });
        }
        else {
            return res.status(400).json({
                message: "Gửi email thất bại!",
            });
        }
    }
    catch (error) {
        next(error);
    }
};

export const resetPassword = async (req, res, next) => {
    try {
        const { email, password, otp, cPassword } = req.body;
        if(password !== cPassword) {
            return res.status(400).json({
                message: "Mật khẩu không trùng khớp!",
            });
        }
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.status(400).json({
                message: "Người dùng không tồn tại!",
            });
        }
        if (checkUser.otp === null || checkUser.otpCreatedAt === null) {
            return res.status(400).json({
                message: "Bạn chưa gửi OTP!",
            });
        }
        if (checkUser.otp !== otp) {
            return res.status(400).json({
                message: "OTP không đúng!",
            });
        }
        const otpCreatedAt = new Date(checkUser.otpCreatedAt);
        const now = new Date();
        const diff = Math.abs(now - otpCreatedAt);
        const diffMinutes = Math.floor((diff / 1000) / 60);
        if (diffMinutes > 60) {
            return res.status(400).json({
                message: "OTP đã hết hạn!",
            });
        }
        const hashPasswordUser = await hashPassword(password);
        const updatePassword = await User.findByIdAndUpdate(checkUser.id, {
            password: hashPasswordUser,
        });
        if (!updatePassword) {
            return res.status(400).json({
                message: "Có lỗi xảy ra!",
            });
        }
        const removeOTP = await User.findByIdAndUpdate(checkUser.id, {
            otp: null,
            otpCreatedAt: null,
        });
        if (!removeOTP) {
            return res.status(400).json({
                message: "Có lỗi xảy ra!",
            });
        }
        const accessToken = token({ _id: checkUser.id }, "365d");
        return res.status(201).json({
            message: "Đặt lại mật khẩu thành công!",
            accessToken,
        });
    }
    catch (error) {
        next(error);
    }
}

export const changePassword = async (req, res, next) => {
    try {
        const data = req.user;
        const { oldPassword, newPassword } = req.body;
        const checkPassword = await comparePassword(oldPassword, data.password);
        if (!checkPassword) {
            return res.status(400).json({
                message: "Mật khẩu cũ không đúng!",
            });
        }
        const hashPasswordUser = await hashPassword(newPassword);
        const updatePassword = await User.findByIdAndUpdate(data.id, {
            password: hashPasswordUser,
        });
        if (!updatePassword) {
            return res.status(400).json({
                message: "Có lỗi xảy ra!",
            });
        }
        return res.status(200).json({
            message: "Đổi mật khẩu thành công!",
        });
    }
    catch (error) {
        next(error);
    }
}