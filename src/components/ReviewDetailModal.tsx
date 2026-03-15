import { useState, useEffect } from "react";
import { Star, X, User as UserIcon, Calendar, Quote } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Review } from "@/types";

interface ReviewDetailModalProps {
  review: Review | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewDetailModal = ({ review, isOpen, onClose }: ReviewDetailModalProps) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const baseUrl = import.meta.env.VITE_API_BASE_URL ;

  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000, stopOnInteraction: false })]);

  useEffect(() => {
    if (review?.images?.length > 0) {
      setActiveImage(`${baseUrl}${review.images[0]}`);
    } else {
      setActiveImage(null);
    }
  }, [review, baseUrl]);

  if (!review) return null;

  const hasImages = review.images && review.images.length > 0;
  const hasMultiImages = review.images && review.images.length > 1;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-4xl h-auto max-h-[90vh] w-[92vw] sm:w-full p-0 overflow-hidden border-none bg-white !rounded-[32px] flex flex-col ${!hasImages ? 'sm:max-w-lg' : ''}`}>
        {/* Full-Width Top Header */}
        <div className="px-6 py-4 md:px-8 md:py-4 border-b border-border/50 bg-white relative z-20">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-20">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                <UserIcon className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg md:text-xl leading-tight tracking-tight">{review.userName}</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">
                  {format(new Date(review.createdAt), "PPP")}
                </p>
              </div>
            </div>

            <div className="flex flex-row md:flex-col items-center md:items-start gap-3 md:gap-1.5">
              <div className="flex gap-0.5 md:gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 md:h-5 md:w-5 ${
                      star <= review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground/20"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest hidden md:inline">PRODUCT:</span>
                <Badge variant="secondary" className="bg-primary/5 text-primary border-none text-[10px] font-bold px-2 py-0.5 lowercase">
                  {review.productType}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto md:overflow-hidden min-h-0">
          <div className={`flex flex-col-reverse md:flex-row min-h-full items-stretch bg-white ${!hasImages ? 'md:max-w-lg' : ''}`}>
            {/* Content Section (Scrolling on Left for Desktop) */}
            <div className={`flex-1 flex flex-col justify-center bg-white rounded-t-[32px] md:rounded-none relative z-10 md:mt-0 md:overflow-y-auto ${hasImages ? 'md:border-r border-border/50 md:w-1/2' : 'w-full'}`}>
              <div className="p-8 md:p-10">
                <div className="relative group pr-2">
                  <Quote className="absolute -top-4 -left-4 h-8 w-8 text-primary/10 transition-transform group-hover:scale-110" />
                  <p className="text-muted-foreground leading-relaxed italic text-base relative z-10 font-serif whitespace-pre-wrap">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>

            {/* Image Section (Top on Mobile, Right on Desktop) */}
            {hasImages && (
              <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gray-50/50 md:border-l border-border/50 p-8 md:p-10">
                {!hasMultiImages ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <img
                      src={activeImage || ""}
                      alt="Review"
                      className="max-h-[300px] md:max-h-[310px] w-auto object-contain rounded-lg shadow-lg"
                    />
                  </div>
                ) : (
                  <div className="embla overflow-hidden h-full" ref={emblaRef}>
                    <div className="embla__container flex h-full">
                      {review.images.map((img, idx) => (
                        <div key={idx} className="embla__slide flex-[0_0_100%] min-w-0 flex items-center justify-center">
                          <img
                            src={`${baseUrl}${img}`}
                            alt={`Review ${idx + 1}`}
                            className="max-h-[300px] md:max-h-[310px] w-auto object-contain rounded-lg shadow-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-sm hover:bg-muted flex items-center justify-center transition-all z-50 group"
          aria-label="Close modal"
        >
          <X className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </DialogContent>
    </Dialog>
  );
};
