import Feedback from "../models/Feedback.js";

export const createFeedback = async (req, res, next) => {
    try {
        const { name, message } = req.body;
        const feedback = await Feedback.create({
            name,
            message,
        });
        return res.status(201).json({
            message: "Gửi phản hồi thành công!",
            feedback,
        });
    } catch (error) {
        next(error);
    }
};

export const getFeedbacks = async (req, res, next) => {
    try {
        const { page, limit, search, searchBy } = req.query;
        const options = {
            page: parseInt(page, 10) || 1,
            limit: parseInt(limit, 10) || 10,
            sort: { createdAt: -1 },
        };

        // Build the search query
        let query = {};
        if (search && searchBy) {
            if (searchBy === 'name') {
                query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
            } else if (searchBy === 'message') {
                query.message = { $regex: search, $options: 'i' }; // Case-insensitive search
            } else if (searchBy === 'id') {
                query._id = search;
            }
        }

        const feedbacks = await Feedback.paginate(query, options);

        // Map feedbacks to include like and dislike counts
        const feedbacksWithCounts = feedbacks.docs.map(feedback => ({
            _id: feedback._id,
            name: feedback.name,
            message: feedback.message,
            like: feedback.like.length,
            dislike: feedback.dislike.length,
            createdAt: feedback.createdAt,
            updatedAt: feedback.updatedAt,
        }));

        return res.status(200).json({
            docs: feedbacksWithCounts,
            totalDocs: feedbacks.totalDocs,
            limit: feedbacks.limit,
            totalPages: feedbacks.totalPages,
            page: feedbacks.page,
            pagingCounter: feedbacks.pagingCounter,
            hasPrevPage: feedbacks.hasPrevPage,
            hasNextPage: feedbacks.hasNextPage,
            prevPage: feedbacks.prevPage,
            nextPage: feedbacks.nextPage,
        });
    } catch (error) {
        next(error);
    }
};

export const likeFeedback = async (req, res, next) => {
    try {
        const { id } = req.body;
        const userId = req.user.id;
        const checkLike = await Feedback.findOne({ _id: id, like: userId });
        if (checkLike) {
            return res.status(400).json({
                message: "Bạn đã thích phản hồi này rồi",
            });
        }
        const checkDislike = await Feedback.findOne({ _id: id, dislike: userId });
        if (checkDislike) {
            await Feedback.findByIdAndUpdate(id, { $pull: { dislike: userId } });
        }
        const feedback = await Feedback.findByIdAndUpdate(id, { $addToSet: { like: userId } }, { new: true })
        if (!feedback) {
            console.log(id);
            return res.status(404).json({
                message: "Không tìm thấy phản hồi",
            });
        }
        return res.status(200).json({
            message: "Đã thích phản hồi",
        });
    } catch (error) {
        next(error);
    }
};

export const dislikeFeedback = async (req, res, next) => {
    try {
        const { id } = req.body;
        const userId = req.user.id;
        const checkDislike = await Feedback.findOne({ _id: id, dislike: userId });
        if (checkDislike) {
            return res.status(400).json({
                message: "Bạn đã không thích phản hồi này rồi",
            });
        }
        const checkLike = await Feedback.findOne({ _id: id, like: userId });
        if (checkLike) {
            await Feedback.findByIdAndUpdate(id, { $pull: { like: userId } });
        }
        const feedback = await Feedback.findByIdAndUpdate(id, { $addToSet: { dislike: userId } }, { new: true })
        if (!feedback) {
            return res.status(404).json({
                message: "Không tìm thấy phản hồi",
            });
        }
        return res.status(200).json({
            message: "Đã không thích phản hồi",
        });
    } catch (error) {
        next(error);
    }
}