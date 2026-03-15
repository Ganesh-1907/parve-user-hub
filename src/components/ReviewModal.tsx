import { useState } from "react";
import { Star, Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addReviewApi } from "@/api/review.api";
import { compressImage } from "@/utils/compressImage";
import { toast } from "@/hooks/use-toast";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ReviewModal = ({ isOpen, onClose, onSuccess }: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [productType, setProductType] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 2) {
      toast({
        title: "Limit reached",
        description: "You can only upload up to 2 images.",
        variant: "destructive",
      });
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({ title: "Please select a rating", variant: "destructive" });
      return;
    }
    if (!productType) {
      toast({ title: "Please select a product category", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    
    try {
      toast({ title: "Compressing images...", description: "Please wait" });
      const compressedImages = await Promise.all(
        images.map((img) => compressImage(img))
      );

      const formData = new FormData();
      formData.append("rating", rating.toString());
      formData.append("comment", comment);
      formData.append("productType", productType);
      
      compressedImages.forEach((image) => {
        formData.append("images", image);
      });

      await addReviewApi(formData);
      toast({
        title: "Review submitted!",
        description: "Thank you for your feedback. It will be visible after admin approval.",
      });
      setRating(0);
      setComment("");
      setProductType("");
      setImages([]);
      setPreviews([]);
      onSuccess();
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to submit review",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2 text-center">
            <Label>Overall Rating</Label>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none transition-transform active:scale-95"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hover || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="productType">Product Category</Label>
            <Select value={productType} onValueChange={setProductType}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Facewash">Facewash</SelectItem>
                <SelectItem value="Serums">Serums</SelectItem>
                <SelectItem value="Creams">Creams</SelectItem>
                <SelectItem value="Moisturizer">Moisturizer</SelectItem>
                <SelectItem value="Night Cream">Night Cream</SelectItem>
                <SelectItem value="All">All Products</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Your Review</Label>
            <Textarea
              id="comment"
              placeholder="Tell us what you liked (or didn't like) about the product..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px] bg-white"
              required
            />
          </div>

          <div className="space-y-3">
            <Label>Photos (Max 2)</Label>
            <div className="flex flex-wrap gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative h-20 w-20 group">
                  <img
                    src={preview}
                    alt="Review preview"
                    className="h-full w-full object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5 shadow-md"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {images.length < 2 && (
                <label className="h-20 w-20 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50 transition-colors cursor-pointer text-muted-foreground">
                  <Upload className="h-6 w-6 mb-1" />
                  <span className="text-[10px] font-medium uppercase tracking-wider">Add</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Post Review"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
