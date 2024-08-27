import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTanstackQuery } from "../../common/hooks/useTanstackQuery";
import { Space, Flex, Rate } from "antd";

export default function Reviews({ reviews }) {
  const { id } = useParams();
  const { data: product, isLoading: isProductLoading } = useTanstackQuery(
    `/products/${id}`
  );
  const items = product?.productItems;

  const desc = ["terrible", "bad", "normal", "good", "wonderful"];

  const [showAllComments, setShowAllComments] = useState(false); // Add state for toggling comments

  if (isProductLoading) {
    return <div>Loading...</div>;
  }

  useEffect(() => {}, [reviews, product]);

  return (
    <div className="review-wrapper w-full">
      <div className="w-full reviews mb-[60px]">
        {/* comments */}
        <div className="w-full comments mb-[60px]">
          {reviews &&
            reviews.length > 0 &&
            reviews.map((review) => (
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
                        {/* {review.user.location} */}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Flex gap="middle" vertical>
                      <Rate tooltips={desc} value={review.rating} />
                    </Flex>
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
          <span
            onClick={() => setShowAllComments(!showAllComments)}
            className="cursor-pointer text-blue-500"
          >
            {showAllComments ? "Thu gọn" : "Xem thêm"}
          </span>
        </div>
      </div>
      {/* <div className="write-review w-full">
        <h1 className="text-2xl font-medium text-qblack mb-5">
          Đánh giá
        </h1>
      </div> */}
    </div>
  );
}
