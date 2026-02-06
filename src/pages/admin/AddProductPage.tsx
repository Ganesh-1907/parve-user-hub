import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { useState } from "react";
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

const AddProductPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    unit: "",
    discountPercentage: "",
    isYearlyDiscount: false,
    discountStartDate: "",
    discountEndDate: "",
    mainImage: null as File | null,
    subImages: [] as File[],
  });

  const token = localStorage.getItem("token");

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!form.mainImage) {
        toast({ title: "Main image is required", variant: "destructive" });
        return;
      }

      setLoading(true);
      const formData = new FormData();

      formData.append("productName", form.productName);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("category", form.category);
      formData.append("unit", form.unit);
      formData.append("discountPercentage", form.discountPercentage);
      formData.append("isYearlyDiscount", String(form.isYearlyDiscount));

      if (!form.isYearlyDiscount) {
        formData.append("discountStartDate", form.discountStartDate);
        formData.append("discountEndDate", form.discountEndDate);
      }

      formData.append("images", form.mainImage);
      form.subImages.forEach((img) => {
        formData.append("images", img);
      });

      await axios.post(`${API_BASE_URL}/products/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast({ title: "Product added successfully" });
      navigate("/products");
    } catch (error) {
      toast({ title: "Add product failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-blue-600 text-xl font-semibold mb-8">Add Product</h2>
        <form onSubmit={handleAddProduct} className="space-y-6">
          {/* Product Name */}
          <div>
            <Label className="text-gray-700 font-medium">Product Name</Label>
            <Input
              value={form.productName}
              onChange={(e) =>
                setForm({ ...form, productName: e.target.value })
              }
              className="mt-2 bg-white border border-gray-300 text-gray-900 rounded-md focus:border-gray-500 focus:ring-gray-500 placeholder-gray-400 shadow-sm"
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
            <Label className="text-gray-700 font-medium">Main Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({
                  ...form,
                  mainImage: e.target.files ? e.target.files[0] : null,
                })
              }
              className="mt-2 bg-white border border-gray-300 text-gray-900 rounded-md focus:border-blue-500 focus:ring-blue-500 placeholder-gray-400 shadow-sm"
              required
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
                className="mt-2 bg-white border border-gray-300 text-gray-900 rounded-md focus:border-gray-500 focus:ring-gray-500 placeholder-gray-400 shadow-sm"
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
                className="mt-2 bg-white border border-gray-300 text-gray-900 rounded-md focus:border-gray-500 focus:ring-gray-500 placeholder-gray-400 shadow-sm"
                required
              />
            </div>
          </div>

          {/* Discount */}
          <div>
            <Label className="text-gray-700 font-medium">Discount %</Label>
            <Input
              type="number"
              value={form.discountPercentage}
              onChange={(e) =>
                setForm({
                  ...form,
                  discountPercentage: e.target.value,
                })
              }
                className="mt-2 bg-white border border-gray-300 text-gray-900 rounded-md focus:border-gray-500 focus:ring-gray-500 placeholder-gray-400 shadow-sm"
            />
          </div>

          {/* Discount Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="yearly"
              checked={form.isYearlyDiscount}
              onChange={() =>
                setForm({
                  ...form,
                  isYearlyDiscount: !form.isYearlyDiscount,
                })
              }
              className="w-4 h-4"
            />
            <Label htmlFor="yearly" className="text-gray-700 font-medium cursor-pointer">
              Apply discount for whole year
            </Label>
          </div>

          {/* Discount Dates */}
          {!form.isYearlyDiscount && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-700 font-medium">Start Date</Label>
                <Input
                  type="date"
                  value={form.discountStartDate}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      discountStartDate: e.target.value,
                    })
                  }
                  className="mt-2 bg-white border border-gray-300 text-gray-900 rounded-md focus:border-gray-500 focus:ring-gray-500 placeholder-gray-400 shadow-sm"
                />
              </div>
              <div>
                <Label className="text-gray-700 font-medium">End Date</Label>
                <Input
                  type="date"
                  value={form.discountEndDate}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      discountEndDate: e.target.value,
                    })
                  }
                  className="mt-2 bg-white border border-gray-300 text-gray-900 rounded-md focus:border-gray-500 focus:ring-gray-500 placeholder-gray-400 shadow-sm"
                />
              </div>
            </div>
          )}

          {/* Sub Images */}
          <div>
            <Label className="text-gray-700 font-medium">Sub Images (max 4)</Label>
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
              {loading ? "Adding..." : "Add Product"}
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

export default AddProductPage;
