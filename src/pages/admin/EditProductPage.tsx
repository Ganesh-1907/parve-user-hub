import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Product {
  _id: string;
  productName: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  unit: string;
  images: string[];
}

const EditProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    unit: "",
    mainImage: null as File | null,
    mainImageUrl: "",
    subImages: [] as File[],
    subImageUrls: [] as string[],
  });
  const token = localStorage.getItem("token");

  // Fetch product on load
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/products/${id}`);
        const product: Product = res.data;
        setForm({
          productName: product.productName,
          description: product.description,
          price: String(product.price),
          stock: String(product.stock),
          category: product.category,
          unit: product.unit,
          mainImage: null,
          mainImageUrl: product.images && product.images.length > 0 ? product.images[0] : "",
          subImages: [],
          subImageUrls: product.images && product.images.length > 1 ? product.images.slice(1) : [],
        });
      } catch (error) {
        toast({ title: "Failed to load product", variant: "destructive" });
        navigate("/products");
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, navigate]);

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
      if (!id) return;

      setLoading(true);
      const formData = new FormData();

      formData.append("productName", form.productName);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("category", form.category);
      formData.append("unit", form.unit);

      if (form.mainImage) {
        formData.append("images", form.mainImage);
      }
      form.subImages.forEach((img) => {
        formData.append("images", img);
      });

    try {
      await axios.put(`${API_BASE_URL}/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast({ title: "Product updated successfully" });
      navigate("/products");
    } catch (error) {
      toast({ title: "Update failed", variant: "destructive" });
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-blue-600 text-xl font-semibold mb-8">Edit Product</h2>
        <form onSubmit={handleUpdateProduct} className="space-y-6">
          {/* Product Name */}
          <div>
            <Label className="text-gray-700 font-medium">Product Name</Label>
            <Input
              value={form.productName}
              onChange={(e) =>
                setForm({ ...form, productName: e.target.value })
              }
              className="mt-2 bg-white border border-gray-300 text-gray-900 rounded-md focus:border-blue-500 focus:ring-blue-500 placeholder-gray-400 shadow-sm"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label className="text-gray-700 font-medium">Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="mt-2 bg-white border border-gray-300 text-gray-900 rounded-md focus:border-blue-500 focus:ring-blue-500 placeholder-gray-400 shadow-sm"
              rows={5}
              required
            />
          </div>

          {/* Main Image */}
          <div>
            <Label className="text-gray-700 font-medium">Main Image (optional)</Label>
            {(form.mainImage || form.mainImageUrl) && (
              <div className="mb-2 flex items-center gap-4">
                <img src={form.mainImage ? URL.createObjectURL(form.mainImage) : form.mainImageUrl.startsWith('/uploads/') ? form.mainImageUrl : `/uploads/products/${form.mainImageUrl}`} alt="Main" className="h-20 w-20 object-cover rounded" />
                <button type="button" className="text-red-600 text-sm font-medium" onClick={() => setForm({ ...form, mainImage: null, mainImageUrl: "" })}>Remove</button>
              </div>
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({
                  ...form,
                  mainImage: e.target.files ? e.target.files[0] : null,
                  mainImageUrl: "",
                })
              }
              className="mt-2 bg-white border border-gray-300 text-gray-900 rounded-md focus:border-gray-500 focus:ring-gray-500 placeholder-gray-400 shadow-sm"
            />
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-700 font-medium">Price (₹)</Label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="mt-2 bg-white border border-gray-300 text-gray-900 rounded-md focus:border-blue-500 focus:ring-blue-500 placeholder-gray-400 shadow-sm"
                required
              />
            </div>
            <div>
              <Label className="text-gray-700 font-medium">Stock</Label>
              <Input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="mt-2 border-gray-300"
                required
              />
            </div>
          </div>

          {/* Category & Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-700 font-medium">Category</Label>
              <Select
                value={form.category}
                onValueChange={(value) =>
                  setForm({ ...form, category: value })
                }
              >
                <SelectTrigger className="mt-2 border-gray-300">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facewash">Facewash</SelectItem>
                  <SelectItem value="serums">Serums</SelectItem>
                  <SelectItem value="creams">Creams</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-700 font-medium">Unit</Label>
              <Input
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
                className="mt-2 border-gray-300"
                required
              />
            </div>
          </div>

          {/* Sub Images */}
          <div>
            <Label className="text-gray-700 font-medium">Sub Images (optional)</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.subImageUrls && form.subImageUrls.length > 0 && form.subImageUrls.map((url, idx) => (
                <div key={"url-"+idx} className="relative">
                  <img src={url.startsWith('/uploads/') ? url : `/uploads/products/${url}`} alt={`Sub ${idx + 1}`} className="h-16 w-16 object-cover rounded" />
                  <button type="button" className="absolute top-0 right-0 bg-white text-red-600 text-xs px-1 rounded" onClick={() => setForm({ ...form, subImageUrls: form.subImageUrls.filter((_, i) => i !== idx) })}>x</button>
                </div>
              ))}
              {form.subImages && form.subImages.length > 0 && form.subImages.map((img, idx) => (
                <div key={"file-"+idx} className="relative">
                  <img src={URL.createObjectURL(img)} alt={`Sub ${idx + 1}`} className="h-16 w-16 object-cover rounded" />
                  <button type="button" className="absolute top-0 right-0 bg-white text-red-600 text-xs px-1 rounded" onClick={() => setForm({ ...form, subImages: form.subImages.filter((_, i) => i !== idx) })}>x</button>
                </div>
              ))}
            </div>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                setForm({
                  ...form,
                  subImages: e.target.files
                    ? Array.from(e.target.files).slice(0, 4)
                    : [],
                })
              }
              className="mt-2 bg-white border border-gray-300 text-gray-900 rounded-md focus:border-gray-500 focus:ring-gray-500 placeholder-gray-400 shadow-sm"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 text-blue-600 bg-white border border-blue-100 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 font-semibold"
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
