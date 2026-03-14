import { useQuery } from "@tanstack/react-query";
import { Star, ArrowRight, Quote, User as UserIcon, MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getPublicReviewsApi } from "@/api/review.api";
import { Review } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { ReviewDetailModal } from "@/components/ReviewDetailModal";
import { ReviewModal } from "@/components/ReviewModal";
import { useState } from "react";
import { format } from "date-fns";

export const ReviewsSection = () => {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["public-reviews-preview"],
    queryFn: getPublicReviewsApi,
  });

  const reviews = data?.reviews?.slice(0, 3) || [];

  if (!isLoading && reviews.length === 0) return null;

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">What Our PARVE Family Says</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Real feedback from our lovely customers about their results with PARVE Skincare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {isLoading ? (
            [1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full rounded-2xl" />
            ))
          ) : (
            reviews.map((review: Review) => (
              <div 
                key={review._id} 
                className="bg-card p-8 rounded-2xl shadow-soft border border-border/50 relative group hover:shadow-md transition-all cursor-pointer h-full"
                onClick={() => setSelectedReview(review)}
              >
                <Quote className="absolute top-6 right-8 h-12 w-12 text-primary/5 -z-10" />
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <UserIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-base leading-tight">{review.userName}</p>
                    <p className="text-[10px] text-muted-foreground font-medium">
                      {format(new Date(review.createdAt), "PPP")}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Product:</span>
                    <span className="text-xs font-semibold text-primary/80">{review.productType}</span>
                  </div>

                  <p className="text-muted-foreground italic line-clamp-3 leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 group border-primary/20 hover:border-primary/50 text-primary">
            <Link to="/reviews">
              View All Reviews
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <Button 
            onClick={() => setIsWriteReviewOpen(true)}
            size="lg" 
            className="rounded-full px-8 shadow-soft hover:shadow-md transition-all gap-2"
          >
            Write Review
          </Button>
        </div>
      </div>

      <ReviewDetailModal
        review={selectedReview}
        isOpen={!!selectedReview}
        onClose={() => setSelectedReview(null)}
      />

      <ReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        onSuccess={refetch}
      />
    </section>
  );
};
