import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const AdminProducts = () => {
  const [open, setOpen] = useState(false);

  const handleAddProduct = () => {
    toast({ title: "Product added!", description: "Demo mode - product saved." });
    setOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl md:text-3xl font-bold">Products</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Add Product</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div><Label>Product Name</Label><Input placeholder="Enter product name" /></div>
              <div><Label>Description</Label><Textarea placeholder="Product description" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Price (₹)</Label><Input type="number" placeholder="999" /></div>
                <div><Label>Stock</Label><Input type="number" placeholder="50" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="facewash">Facewash</SelectItem>
                      <SelectItem value="serums">Serums</SelectItem>
                      <SelectItem value="creams">Creams</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Unit</Label><Input placeholder="50ml" /></div>
              </div>
              <div><Label>Discount %</Label><Input type="number" placeholder="0" /></div>
              <Button className="w-full" onClick={handleAddProduct}>Add Product</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-medium">Product</th>
                <th className="text-left p-4 font-medium">Category</th>
                <th className="text-left p-4 font-medium">Price</th>
                <th className="text-left p-4 font-medium">Stock</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={product.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4"><Badge variant="outline" className="capitalize">{product.category}</Badge></td>
                  <td className="p-4">₹{product.price}</td>
                  <td className="p-4">{product.stock}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
