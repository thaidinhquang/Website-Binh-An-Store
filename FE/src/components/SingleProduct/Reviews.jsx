import { useParams } from "react-router-dom";
import StarRating from "../UI/StarRating";
import Star from "../icons/Star";
import { useTanstackQuery, useTanstackMutation } from "../../common/hooks/useTanstackQuery";

export default function Reviews({
  rating,
  ratingHandler,
  message,
  messageHandler,
  hoverRating,
  hoverHandler,
}) {
  const { id } = useParams();
  const { data: product, isLoading: isProductLoading } = useTanstackQuery(`/products/${id}`);

<<<<<<< HEAD
  // Fetch product data including reviews
  const { data: product } = useTanstackQuery(`/products/${id}`);
  if (!product) {
=======
  const { mutate: submitReview, isLoading: isReviewLoading } = useTanstackMutation({
    path: `reviews/${id}`,
    action: "CREATE",
    toastMessage: "Submitting review...",
    invalidateQueries: true,
  });

  if (isProductLoading) {
>>>>>>> 02108c5c5fabe8f905de34ea27fccbefb3657a56
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
        console.log("Review submitted successfully!");
      },
      onError: (error) => {
        console.error("Error submitting review:", error);
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
                <p className="text-[15px] text-qgray leading-7 text-normal">
                  {review.comment}
                </p>
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
          <div className="sm:flex sm:space-x-[30px] items-center mb-5">
            
          </div>
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
                  <span className="w-5" style={{ transform: "scale(0.3)" }}>
                    {/* Loading spinner */}
                  </span>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
