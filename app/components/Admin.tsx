// "use client";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Plus,
//   Package,
//   AlertCircle,
//   Hash,
//   Upload,
//   Edit,
//   Trash2,
// } from "lucide-react";
// import { toast } from "sonner";

// import type {
//   Items,
//   ProductStats,
//   ProductFormData,
//   ProductCondition,
//   Category,
// } from "@/lib/types";

// import {
//   getProducts,
//   getProductStats,
//   checkAuthStatus,
//   updateProduct,
//   deleteProduct,
//   AddProduct,
// } from "@/lib/action";

// const initialFormData: ProductFormData = {
//   name: "",
//   description: "",
//   price: 0,
//   rating: 0,
//   category: "" as Category,
//   condition: "" as ProductCondition,
//   colors: "",
//   stock: 0,
//   images: "",
// };

// const AdminDashboard = () => {
//   const [products, setProducts] = useState<Items[]>([]);
//   const [stats, setStats] = useState<ProductStats | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedFiles, setSelectedFiles] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string>("");
//   const [formData, setFormData] = useState<ProductFormData>(initialFormData);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [editingProduct, setEditingProduct] = useState<Items | null>(null);
//   const router = useRouter();

//   const loadData = async () => {
//     try {
//       const [productsData, statsData] = await Promise.all([
//         getProducts(),
//         getProductStats(),
//       ]);
//       setProducts(productsData);
//       setStats(statsData);
//     } catch (error) {
//       console.error("Error loading data:", error);
//       toast.error("Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   useEffect(() => {
//     const verifyAuth = async () => {
//       const user = await checkAuthStatus();
//       if (!user) {
//         router.push("/auth");
//       }
//     };
//     verifyAuth();
//   }, [router]);

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value, type } = e.target;

//     setFormData((prev: any) => ({
//       ...prev,
//       [name]: type === "number" ? Number(value) : value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       await AddProduct(formData, selectedFiles || undefined);
//       toast.success("Product added successfully");
//       setFormData(initialFormData);
//       setSelectedFiles(null);
//       setPreviewUrl("");
//       setIsDialogOpen(false);
//       loadData();
//     } catch (error) {
//       console.error("Error creating product:", error);
//       toast.error("Failed to create product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (product: Items) => {
//     setEditingProduct(product);
//     setFormData({
//       name: product.name,
//       description: product.description,
//       price: product.price,
//       rating: product.rating,
//       category: product.category as Category,
//       condition: product.condition as ProductCondition,
//       colors: product.colors,
//       stock: product.stock,
//       images: product.images,
//     });
//     setPreviewUrl(product.images);
//     setIsEditDialogOpen(true);
//   };

//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editingProduct) return;

//     try {
//       setLoading(true);
//       await updateProduct(
//         editingProduct.$id,
//         formData,
//         selectedFiles || undefined
//       );
//       toast.success("Product updated successfully");
//       setFormData(initialFormData);
//       setSelectedFiles(null);
//       setPreviewUrl("");
//       setIsEditDialogOpen(false);
//       setEditingProduct(null);
//       loadData();
//     } catch (error) {
//       console.error("Error updating product:", error);
//       toast.error("Failed to update product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (productId: string) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         setLoading(true);
//         await deleteProduct(productId);
//         toast.success("Product deleted successfully");
//         loadData();
//       } catch (error) {
//         console.error("Error deleting product:", error);
//         toast.error("Failed to delete product");
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setSelectedFiles(file);
//       const url = URL.createObjectURL(file);
//       setPreviewUrl(url);
//     }
//   };

//   const ProductForm = ({
//     onSubmit,
//     submitText,
//   }: {
//     onSubmit: (e: React.FormEvent) => Promise<void>;
//     submitText: string;
//   }) => (
//     <form onSubmit={onSubmit} className="space-y-4">
//       <div>
//         <Label htmlFor="name">Product Name</Label>
//         <Input
//           id="name"
//           name="name"
//           value={formData.name}
//           onChange={handleInputChange}
//           className="w-full"
//           required
//         />
//       </div>

//       <div>
//         <Label htmlFor="description">Description</Label>
//         <Textarea
//           id="description"
//           name="description"
//           value={formData.description}
//           onChange={handleInputChange}
//           className="w-full"
//           required
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <Label htmlFor="price">Price</Label>
//           <Input
//             id="price"
//             name="price"
//             type="number"
//             value={formData.price}
//             onChange={handleInputChange}
//             className="w-full"
//             min="0"
//             step="0.01"
//             required
//           />
//         </div>
//         <div>
//           <Label htmlFor="rating">Rating</Label>
//           <Input
//             id="rating"
//             name="rating"
//             type="number"
//             value={formData.rating}
//             onChange={handleInputChange}
//             className="w-full"
//             min="0"
//             max="5"
//             step="0.1"
//             required
//           />
//         </div>
//       </div>

//       <div>
//         <Label htmlFor="category">Category</Label>
//         <select
//           id="category"
//           name="category"
//           className="w-full border rounded-md p-2"
//           value={formData.category}
//           onChange={handleInputChange}
//           required
//         >
//           <option value="">Select a category</option>
//           {[
//             "iphones",
//             "laptops",
//             "tablets",
//             "monitor",
//             "accessories",
//             "all",
//           ].map((category) => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <Label htmlFor="condition">Condition</Label>
//         <select
//           id="condition"
//           name="condition"
//           className="w-full border rounded-md p-2"
//           value={formData.condition}
//           onChange={handleInputChange}
//           required
//         >
//           <option value="">Select a condition</option>
//           {["new", "likenew", "excellent", "good", "fair"].map((condition) => (
//             <option key={condition} value={condition}>
//               {condition}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <Label htmlFor="stock">Stock</Label>
//         <Input
//           id="stock"
//           name="stock"
//           type="number"
//           value={formData.stock}
//           onChange={handleInputChange}
//           className="w-full"
//           min="0"
//           required
//         />
//       </div>

//       <div>
//         <Label htmlFor="colors">Colors (comma-separated)</Label>
//         <Input
//           id="colors"
//           name="colors"
//           value={formData.colors}
//           onChange={handleInputChange}
//           className="w-full"
//           placeholder="red, blue, green"
//           required
//         />
//       </div>

//       <div>
//         <Label htmlFor="images">Images</Label>
//         <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//           <div className="space-y-1 text-center">
//             {previewUrl ? (
//               <div className="mb-4">
//                 <img
//                   src={previewUrl}
//                   alt="Preview"
//                   className="mx-auto h-32 w-32 object-cover rounded-md"
//                 />
//               </div>
//             ) : (
//               <Upload className="mx-auto h-12 w-12 text-gray-400" />
//             )}
//             <div className="flex text-sm text-gray-600">
//               <label
//                 htmlFor="file-upload"
//                 className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
//               >
//                 <span>Upload a file</span>
//                 <input
//                   id="file-upload"
//                   name="file-upload"
//                   type="file"
//                   className="sr-only"
//                   onChange={handleFileChange}
//                   accept="image/*"
//                 />
//               </label>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Button
//         className="w-full bg-black hover:bg-gray-800"
//         type="submit"
//         disabled={loading}
//       >
//         {loading ? "Processing..." : submitText}
//       </Button>
//     </form>
//   );

//   const StatCard = ({
//     title,
//     value,
//     icon: Icon,
//   }: {
//     title: string;
//     value: number;
//     icon: React.ElementType;
//   }) => (
//     <div className="bg-white rounded-lg p-6 shadow-sm">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm text-gray-500">{title}</p>
//           <h3 className="text-2xl font-bold mt-1">{value}</h3>
//         </div>
//         <Icon className="w-8 h-8 text-gray-400" />
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <DialogTrigger asChild>
//               <Button className="bg-black hover:bg-gray-800">
//                 <Plus className="w-4 h-4 mr-2" />
//                 Add Product
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[425px]">
//               <DialogHeader>
//                 <DialogTitle>Add New Product</DialogTitle>
//               </DialogHeader>
//               <ProductForm
//                 onSubmit={handleSubmit}
//                 submitText="Create Product"
//               />
//             </DialogContent>
//           </Dialog>
//         </div>

//         {stats && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//             <StatCard
//               title="Total Products"
//               value={stats.totalProducts}
//               icon={Package}
//             />
//             <StatCard
//               title="Low Stock"
//               value={stats.lowStock}
//               icon={AlertCircle}
//             />
//             <StatCard
//               title="Out of Stock"
//               value={stats.outOfStock}
//               icon={Package}
//             />
//             <StatCard
//               title="Total Value"
//               value={stats.totalValue}
//               icon={Hash}
//             />
//           </div>
//         )}

//         <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//           <DialogContent className="sm:max-w-[425px]">
//             <DialogHeader>
//               <DialogTitle>Edit Product</DialogTitle>
//             </DialogHeader>
//             <ProductForm onSubmit={handleUpdate} submitText="Update Product" />
//           </DialogContent>
//         </Dialog>

//         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Product
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Category
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Stock
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Price
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {products.map((product) => (
//                   <tr key={product.$id}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 flex-shrink-0">
//                           {product.images && (
//                             <img
//                               className="h-10 w-10 rounded-full object-cover"
//                               src={product.images}
//                               alt=""
//                             />
//                           )}
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">
//                             {product.name}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {product.category}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           product.stock === 0
//                             ? "bg-red-100 text-red-800"
//                             : product.stock < 10
//                             ? "bg-yellow-100 text-yellow-800"
//                             : "bg-green-100 text-green-800"
//                         }`}
//                       >
//                         {product.stock}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       ₦{product.price}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <button
//                         className="text-blue-600 hover:text-blue-900 mr-4"
//                         onClick={() => handleEdit(product)}
//                       >
//                         <Edit className="w-4 h-4" />
//                       </button>
//                       <button
//                         className="text-red-600 hover:text-red-900"
//                         onClick={() => handleDelete(product.$id)}
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
