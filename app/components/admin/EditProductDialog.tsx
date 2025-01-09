'use client'
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { ProductFormData, Items } from "@/types";
import { updateProduct } from "@/lib/action";
import { toast } from "sonner";

interface EditProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: Items;
  onProductUpdated: () => void;
}

export const EditProductDialog: React.FC<EditProductDialogProps> = ({
  isOpen,
  onClose,
  product,
  onProductUpdated,
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: "",
    rating: 0,
    category: '',
    condition: '',
    colors: "",
    stock: 0,
    images: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        rating: product.rating,
        category: product.category,
        condition: product.condition,
        colors: product.colors,
        stock: product.stock,
        images: product.images,
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProduct(product.$id, formData, selectedFile || undefined);
      toast.success("Product updated successfully");
      onProductUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: Number(e.target.value) })
                }
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="condition">Condition</Label>
              <select
                id="condition"
                value={formData.condition}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setFormData({ ...formData, condition: e.target.value })
                }
                required
                className="w-full border rounded-md"
              >
                {["New", "Like_New", "Excellent", "Good", "Fair"].map(
                  (condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  )
                )}
              </select>
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: Number(e.target.value) })
                }
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
              className="w-full border rounded-md"
            >
              {[
                "iphones",
                "laptops",
                "tablets",
                "monitor",
                "accessories",
                "all",
              ].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="colors">Colors (comma-separated)</Label>
            <Input
              id="colors"
              value={formData.colors}
              onChange={(e) =>
                setFormData({ ...formData, colors: e.target.value })
              }
              placeholder="red, blue, green"
              required
            />
          </div>
          <div>
            <Label htmlFor="editImages">Images</Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="editImages"
                    className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
                  >
                    <span>Upload new image</span>
                    <Input
                      id="editImages"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </label>
                </div>
                {selectedFile && (
                  <div className="mt-2 text-sm text-gray-500">
                    New file selected: {selectedFile.name}
                  </div>
                )}
              </div>
            </div>
          </div>
          <Button
            className="w-full bg-black hover:bg-gray-800"
            type="submit"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Product"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
