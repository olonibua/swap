// app/admin/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Package,
  AlertCircle,
  Hash,
  Trash2,
  Edit,
  Upload,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ProductFormData,
  Items,
  ProductStats,
  ProductCondition,
  Category,
} from "@/types";
import { toast } from "sonner";
import { AddProduct, checkAuthStatus, getProductStats } from "@/lib/action";
import { getProducts } from "@/lib/action";
import { useRouter } from "next/navigation";
import { EditProductDialog } from "./admin/EditProductDialog";
import { DeleteProductDialog } from "./admin/DeleteProductDialog";
import Image from "next/image";

const initialFormData: ProductFormData = {
  name: "",
  description: "",
  price: '',
  rating: 0,
  category: '',
  condition: '',
  colors: "",
  stock: 0,
  images: "",
};

const AdminDashboard = () => {
  const [products, setProducts] = useState<Items[]>([]);
  const [stats, setStats] = useState<ProductStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(
    initialFormData?.images || ""
  );
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const [editingProduct, setEditingProduct] = useState<Items | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeletingProduct, setIsDeletingProduct] = useState<Items | null>(
    null
  );

  const loadData = async () => {
    try {
      const [productsData, statsData] = await Promise.all([
        getProducts(),
        getProductStats(),
      ]);

      // Map the Document data to match the Items interface
      const mappedProducts = productsData.map((doc) => ({
        $id: doc.$id,
        name: doc.name as string,
        description: doc.description as string,
        price: doc.price as string,
        rating: doc.rating as number,
        category: doc.category as string,
        condition: doc.condition as string,
        colors: doc.colors as string,
        stock: doc.stock as number,
        images: doc.images as string,
        createdAt: doc.createdAt as string,
      }));

      setProducts(mappedProducts);
      setStats(statsData);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const verifyAuth = async () => {
      const user = await checkAuthStatus();
      if (!user) {
        router.push("/auth"); // Redirect to auth page if not logged in
      }
    };

    verifyAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AddProduct(formData, selectedFiles || undefined);
      toast.success("Product added successfully");
      setFormData(initialFormData);
      setSelectedFiles(null);
      setIsDialogOpen(false);
      loadData(); // Refresh the products list
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFiles(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Rest of your component remains the same until the Dialog content...

  const StatCard = ({
    title,
    value,
    icon: Icon,
  }: {
    title: string;
    value: number;
    icon: React.ElementType;
  }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-black hover:bg-gray-800">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 p-4">
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
                        setFormData({
                          ...formData,
                          price: e.target.value,
                        })
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
                        setFormData({
                          ...formData,
                          rating: Number(e.target.value),
                        })
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
                      onChange={(e) =>
                        setFormData({ ...formData, condition: e.target.value })
                      }
                      required
                    >
                      <option value="" disabled>
                        Select a condition
                      </option>
                      {(
                        [
                          "New",
                          "Like New",
                          "Excellent",
                          "Good",
                          "Fair",
                        ] as ProductCondition[]
                      ).map((condition) => (
                        <option key={condition} value={condition}>
                          {condition}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stock: Number(e.target.value),
                        })
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
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {(
                      [
                        "iphones",
                        "laptops",
                        "tablets",
                        "monitor",
                        "accessories",
                        "all",
                      ] as Category[]
                    ).map((category) => (
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
                  <Label htmlFor="images">Images</Label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {previewUrl ? (
                        <div className="mb-4">
                          <Image
                            width={1000}
                            height={1000}
                            src={previewUrl}
                            alt="Preview"
                            className="mx-auto h-32 w-32 object-cover rounded-md"
                          />
                        </div>
                      ) : (
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      )}
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                            accept="image/*"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-black hover:bg-gray-800"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Product"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Rest of your component (Stats Grid and Products Table) remains the same */}
        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Products"
              value={stats.totalProducts}
              icon={Package}
            />
            <StatCard
              title="Low Stock"
              value={stats.lowStock}
              icon={AlertCircle}
            />
            <StatCard
              title="Out of Stock"
              value={stats.outOfStock}
              icon={Package}
            />
            <StatCard
              title="Total Value"
              value={stats.totalValue}
              icon={Hash}
            />
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.$id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          {product.images && (
                            <Image
                            width={100}
                            height={100}
                              className="h-10 w-10 rounded-full object-cover"
                              src={product.images}
                              alt=""
                            />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.stock === 0
                            ? "bg-red-100 text-red-800"
                            : product.stock < 10
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₦
                      {Number(product.price)
                        .toFixed(0)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-blue-600 hover:text-blue-900 mr-4"
                        onClick={() => {
                          setEditingProduct(product);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => setIsDeletingProduct(product)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {editingProduct && (
        <EditProductDialog
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setEditingProduct(null);
          }}
          product={editingProduct}
          onProductUpdated={loadData}
        />
      )}

      {isDeletingProduct && (
        <DeleteProductDialog
          isOpen={!!isDeletingProduct}
          onClose={() => setIsDeletingProduct(null)}
          productId={isDeletingProduct.$id}
          productName={isDeletingProduct.name}
          onProductDeleted={loadData}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
