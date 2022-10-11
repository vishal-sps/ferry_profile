import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import ReviewMainSection from "../../../components/reviews/main-section";
import ReviewTopSection from "../../../components/reviews/top-section";
import ReviewModal from "../../../components/modals/review-modal";

import useChef from "../../../custom-hooks/use-chef";
import { fetchReviews } from "../../../store/actions/review-actions";

function Reviews() {
  const { chef } = useChef();
  const router = useRouter();
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.data);

  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      dispatch(fetchReviews(router.query.id));
    }
  }, [router, dispatch]);

  return (
    <div className="pt-32 w-11/12 mx-auto">
      <ReviewModal
        chefId={router.query.id}
        show={showReviewModal}
        setShowReviewModal={setShowReviewModal}
      />

      <ReviewTopSection
        chef={chef}
        totalReviews={reviews?.length}
        setShowReviewModal={setShowReviewModal}
      />

      {reviews?.map((review) => (
        <ReviewMainSection
          key={review.id}
          description={review.description}
          rating={review.rating}
          images={review.images}
        />
      ))}
    </div>
  );
}

export default Reviews;
