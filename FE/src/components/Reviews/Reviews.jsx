import { useNavigate, useParams } from 'react-router-dom';
import StarRating from "../UI/StarRating";
import Star from "../icons/Star";
import { useTanstackQuery, useTanstackMutation } from "../../common/hooks/useTanstackQuery";
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '../../config/axios';
import { toast } from 'react-toastify';

export default function ReviewsProduct({
  rating,
  ratingHandler,
  message,
  messageHandler,
  hoverRating,
  hoverHandler,
}) {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const { data: product, isLoading: isProductLoading } = useTanstackQuery(`/products/${id}`);

  const queryClient = useQueryClient(); // useQueryClient hook

  const { mutate: submitReview, isLoading: isReviewLoading } = useTanstackMutation({
    path: `/reviews/${id}`,
    action: "CREATE",
    toastMessage: "Submitting review...",
    invalidateQueries: true,
  });

  const { mutate: updateReview, isLoading: isUpdateLoading } = useMutation({
    mutationFn: async ({ productId, reviewId, rating, comment }) => {
      const response = await instance.put(`/reviews/${productId}/${reviewId}`, { rating, comment });
      return response.data;
    },
    onSuccess: (updatedReview) => {
      console.log("Thay đổi đánh giá thành công!");
      setIsEditing(null);

      // Cập nhật dữ liệu cục bộ
      const previousData = queryClient.getQueryData(["products", id]);
      if (previousData) {
        const updatedReviews = previousData.reviews.map((review) =>
          review._id === updatedReview._id ? updatedReview : review
        );
        queryClient.setQueryData(["products", id], { ...previousData, reviews: updatedReviews });
      }
      toast.success("Thay đổi đánh giá thành công!");

      // Chuyển hướng đến trang OrderProfile
      navigate(`/profile/orders/`);
    },
    onError: (error) => {
      console.error("Error updating review:", error);
      toast.error("Bạn không đăng nhập bằng tài khoản này");
    },
  });
  

  const [isEditing, setIsEditing] = useState(null);

  const [editMessage, setEditMessage] = useState('');
  const [editRating, setEditRating] = useState(0);

  if (isProductLoading) {
    return <div>Loading...</div>;
  }

  const { reviews } = product;

  const handleSubmitReview = () => {
    const reviewData = {
      rating,
      comment: message,
      productId: id,
    };

    submitReview(reviewData, {
      onSuccess: () => {
        console.log("Tạo đánh giá thành công");
      },
      onError: (error) => {
        console.error("Lỗi đánh giá", error);
      },
    });
  };

  const handleEditClick = (review) => {
    setIsEditing(review._id);
    setEditMessage(review.comment);
    setEditRating(review.rating);
  };

  const handleSaveClick = (reviewId) => {
    // Kiểm tra số lần cập nhật trước khi cho phép cập nhật
    const review = reviews.find((r) => r._id === reviewId);
    if (review.updateCount >= 2) {
      toast.error("Bạn đã đánh giá nhiều hơn giới hạn cho phép");
      return;
    }

    const updatedReviewData = {
      productId: id,
      reviewId,
      rating: editRating,
      comment: editMessage,
    };
  
    updateReview(updatedReviewData, {
      onSuccess: (updatedReview) => {
        console.log("Review updated successfully!");
        setIsEditing(null);
  
        // Cập nhật dữ liệu cục bộ
        const previousData = queryClient.getQueryData(["products", id]);
        if (previousData) {
          const updatedReviews = previousData.reviews.map((review) =>
            review._id === updatedReview._id ? updatedReview : review
          );
          queryClient.setQueryData(["products", id], { ...previousData, reviews: updatedReviews });
        }
      },
      onError: (error) => {
        console.error("Error updating review:", error);
      },
    });
  };
  

  return (
    <div className="review-wrapper w-full">
      <div className="w-full reviews mb-[60px]">
        {/* comments */}
        <div className="w-full comments mb-[60px]">
          {reviews && reviews.length > 0 && reviews.map((review) => (
            <div
              key={review._id}
              className="comment-item bg-white px-10 py-[32px] mb-2.5"
            >
              <div className="comment-author flex justify-between items-center mb-3">
                <div className="flex space-x-3 items-center">
                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                    <img
                      src={`/assets/images/comment-user-1.png`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-[18px] font-medium text-qblack">
                      {review.name || review.email}
                    </p>
                    <p className="text-[13px] font-normal text-qgray">
                      {review.user.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {Array.from(Array(review.rating), (x, i) => (
                      <span key={i}>
                        <Star />
                      </span>
                    ))}
                  </div>
                  <span className="text-[13px] font-normal text-qblack mt-1 inline-block">
                    ({review.rating}.0)
                  </span>
                </div>
              </div>
              <div className="comment mb-[30px]">
                {isEditing === review._id  && review.user ? (
                  <div>
                    <div className="flex space-x-1 items-center mb-[30px]">
                      <StarRating
                        hoverRating={hoverRating}
                        hoverHandler={hoverHandler}
                        rating={editRating}
                        ratingHandler={setEditRating}
                      />
                      <span className="text-qblack text-[15px] font-normal mt-1">
                        ({editRating}.0)
                      </span>
                    </div>
                    <textarea
                      value={editMessage}
                      onChange={(e) => setEditMessage(e.target.value)}
                      cols="30"
                      rows="3"
                      className="w-full focus:ring-0 focus:outline-none p-6"
                    ></textarea>
                    <div className="flex justify-end space-x-2 mt-3">
                      <button
                        onClick={() => handleSaveClick(review._id)}
                        type="button"
                        className="black-btn w-[150px] h-[50px]"
                        disabled={isUpdateLoading}
                      >
                        {isUpdateLoading ? <span className="loader"></span> : "Save"}
                      </button>
                      <button
                        onClick={() => setIsEditing(null)}
                        type="button"
                        className="black-btn w-[150px] h-[50px]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-[15px] text-qgray leading-7 text-normal">
                      {review.comment}
                    </p>
                    <button
                      onClick={() => handleEditClick(review)}
                      type="button"
                      className="text-blue-500 underline mt-2"
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* load comments */}
        <div className="w-full flex justify-center">
          <button
            type="button"
            className="black-btn w-[300px] h-[50px] text-sm font-semibold"
          >
            Load More
          </button>
        </div>
      </div>
      <div className="write-review w-full">
        <h1 className="text-2xl font-medium text-qblack mb-5">
          Write Your Reviews
        </h1>

        <div className="flex space-x-1 items-center mb-[30px]">
          <StarRating
            hoverRating={hoverRating}
            hoverHandler={hoverHandler}
            rating={rating}
            ratingHandler={ratingHandler}
          />
          <span className="text-qblack text-[15px] font-normal mt-1">
            ({rating}.0)
          </span>
        </div>

        <div className="w-full review-form ">
          <div className="w-full mb-[30px]">
            <h6 className="input-label text-qgray capitalize text-[13px] font-normal block mb-2 ">
              Message*
            </h6>
            <textarea
              value={message}
              onChange={messageHandler}
              name=""
              id=""
              cols="30"
              rows="3"
              className="w-full focus:ring-0 focus:outline-none p-6"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSubmitReview}
              type="button"
              className="black-btn w-[300px] h-[50px]  flex justify-center"
              disabled={isReviewLoading}
            >
              <span className="flex space-x-1 items-center h-full">
                <span className="text-sm font-semibold">Submit Review</span>
                {isReviewLoading && (
                  <span className="loader"></span>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// CSS for the loading spinner
const spinnerStyle = document.createElement('style');
spinnerStyle.innerHTML = 
  `.loader {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border-left-color: #09f;
    animation: spin 1s ease infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }`;
document.head.appendChild(spinnerStyle);
