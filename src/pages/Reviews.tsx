import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star, MessageSquarePlus, Image as ImageIcon, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getPublicReviewsApi } from "@/api/review.api";
import { ReviewModal } from "@/components/ReviewModal";
import { useAuthStore } from "@/store/useStore";
import { format } from "date-fns";
import { Review } from "@/types";
import { ReviewDetailModal } from "@/components/ReviewDetailModal";

const ReviewCard = ({ review, onClick }: { review: Review; onClick: () => void }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL ;

  return (
    <div 
      className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 hover:shadow-md transition-shadow cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <UserIcon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold text-lg leading-tight">{review.userName}</h3>
          <p className="text-[10px] text-muted-foreground">
            {format(new Date(review.createdAt), "PPP")}
          </p>
        </div>
      </div>

      <div className="space-y-3">
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
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Product:</span>
          <Badge variant="secondary" className="bg-primary/5 text-primary text-[10px] py-0 h-5">
            {review.productType}
          </Badge>
        </div>

        <p className="text-muted-foreground leading-relaxed italic text-sm line-clamp-3">
          "{review.comment}"
        </p>

        {review.images && review.images.length > 0 && (
          <div className="flex gap-2 pt-2">
            {review.images.map((img, idx) => (
              <div 
                key={idx} 
                className="relative h-16 w-16 group rounded-lg overflow-hidden border border-border/50"
              >
                <img
                  src={`${baseUrl}${img}`}
                  alt="Review"
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ImageIcon className="h-4 w-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Reviews = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetailReview, setSelectedDetailReview] = useState<Review | null>(null);
  const { isLoggedIn } = useAuthStore();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["public-reviews"],
    queryFn: getPublicReviewsApi,
  });

  const reviews = data?.reviews || [];

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Customer Experiences</h1>
            <p className="text-muted-foreground max-w-2xl">
              Hear what our community has to say about their journey with PARVE Skincare.
            </p>
          </div>
          
          <Button 
            size="lg" 
            className="rounded-full shadow-lg transition-all hover:scale-105"
            onClick={() => setIsModalOpen(true)}
            disabled={!isLoggedIn}
          >
            {isLoggedIn ? "Write Review" : "Login to Review"}
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-48 w-full rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-24 bg-card rounded-3xl border-2 border-dashed border-border/50">
            <Star className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Unable to load reviews</h2>
            <p className="text-muted-foreground mb-6">Please try again in a moment.</p>
            <Button variant="outline" onClick={() => refetch()}>
              Try Again
            </Button>
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review: Review) => (
              <ReviewCard 
                key={review._id} 
                review={review} 
                onClick={() => setSelectedDetailReview(review)} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-card rounded-3xl border-2 border-dashed border-border/50">
            <Star className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No reviews yet</h2>
            <p className="text-muted-foreground">Be the first to share your experience!</p>
          </div>
        )}
      </div>

      <ReviewModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={refetch}
      />

      <ReviewDetailModal
        review={selectedDetailReview}
        isOpen={!!selectedDetailReview}
        onClose={() => setSelectedDetailReview(null)}
      />
    </div>
  );
};


export default Reviews;
