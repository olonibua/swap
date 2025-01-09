// "use client";
// import React, { JSX, useEffect, useState } from "react";
// import { Search, Filter, Star, Plus, Phone } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { getProductStats } from "@/lib/action";
// import { getProducts } from "@/lib/action";

// // Updated type definitions to match Appwrite structure
// type Product = {
//   $id: string;
//   name: string;
//   description: string;
//   price: number;
//   rating: number;
//   condition: string;
//   category: string;
//   colors: string;
//   stock: number;
//   images: string;
//   $createdAt: string;
//   $updatedAt: string;
// };

// type Category = string;

// type CategoryOption = {
//   id: string;
//   name: string;
// };

// const ProductListing: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [selectedCategory, setSelectedCategory] = useState<Category>("all");
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);


//     const [products, setProducts] = useState<Product[]>([]);
//     const loadData = async () => {
//       try {
//         const [productsData, statsData] = await Promise.all([
//           getProducts(),
//           getProductStats(),
//         ]);

//         // Map Appwrite's `Document[]` into the `Product[]` structure
//         const mappedProducts: Product[] = productsData.map((doc: any) => ({
//           $id: doc.$id,
//           name: doc.name,
//           description: doc.description,
//           price: Number(doc.price),
//           rating: Number(doc.rating),
//           condition: doc.condition,
//           category: doc.category,
//           colors: doc.colors || "",
//           stock: Number(doc.stock),
//           images: doc.images || "",
//           $createdAt: doc.$createdAt,
//           $updatedAt: doc.$updatedAt,
//         }));

//         setProducts(mappedProducts);
//         // setStats(statsData); // Handle this if necessary
//       } catch (error) {
//         console.error("Error loading data:", error);
//         toast.error("Failed to load products");
//       }
//     };


//      useEffect(() => {
//        loadData();
//      }, []);

//   const categories: CategoryOption[] = [
//     { id: "all", name: "All Categories" },
//     { id: "laptops", name: "Laptops" },
//     { id: "phones", name: "Phones" },
//     { id: "tablets", name: "Tablets" },
//     { id: "accessories", name: "Accessories" },
//   ];

//   const filteredProducts = products.filter((product: Product) => {
//     const matchesSearch =
//       product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       product.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       product.description.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory =
//       selectedCategory === "all" || product.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   console.log(filteredProducts, 'filtered')

//   const handleProductClick = (product: Product): void => {
//     setSelectedProduct(product);
//     setIsDialogOpen(true);
//   };

//   const handleWhatsAppClick = (): void => {
//     if (!selectedProduct) return;

//     const message = `Hi, I'm interested in the ${selectedProduct.name} priced at $${selectedProduct.price}. Is it still available?`;
//     const whatsappUrl = `https://wa.me/+YOUR_PHONE_NUMBER?text=${encodeURIComponent(
//       message
//     )}`;
//     window.open(whatsappUrl, "_blank");
//     setIsDialogOpen(false);
//   };

//   const renderStars = (rating: number): JSX.Element[] => {
//     return [...Array(5)].map((_, i) => (
//       <Star
//         key={i}
//         className={`w-3 h-3 ${
//           i < Math.floor(rating)
//             ? "text-yellow-400 fill-yellow-400"
//             : "text-gray-300"
//         }`}
//       />
//     ));
//   };

//   const renderColorDots = (colors: string): JSX.Element => {
//     const colorArray = colors.split(",").map((color) => color.trim());
//     return (
//       <div className="flex items-center mt-2 space-x-1">
//         {colorArray.slice(0, 5).map((color, index) => (
//           <div
//             key={index}
//             className="w-4 h-4 rounded-full border"
//             style={{ backgroundColor: color }}
//           />
//         ))}
//         {colorArray.length > 5 && (
//           <div className="w-4 h-4 rounded-full border flex items-center justify-center bg-gray-100">
//             <Plus className="w-3 h-3 text-gray-600" />
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Search and Filter Section */}
//       <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//           <input
//             type="text"
//             placeholder="Search by name, category, or condition..."
//             className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={searchQuery}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               setSearchQuery(e.target.value)
//             }
//           />
//         </div>
//         <div className="flex items-center space-x-2">
//           <Filter className="text-gray-400 h-5 w-5" />
//           <select
//             className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={selectedCategory}
//             onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
//               setSelectedCategory(e.target.value as Category)
//             }
//           >
//             {categories.map((category) => (
//               <option key={category.id} value={category.id}>
//                 {category.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Products Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//         {filteredProducts.map((product) => (
//           <div
//             key={product.$id}
//             className="group border rounded hover:shadow-lg transition-shadow bg-white cursor-pointer"
//             onClick={() => handleProductClick(product)}
//           >
//             <div className="aspect-square relative">
//               <img
//                 src={product.images}
//                 alt={product.name}
//                 className="w-full h-full object-cover"
//               />
//               {product.stock < 10 && (
//                 <div className="absolute top-2 left-2">
//                   <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
//                     Low Stock: {product.stock}
//                   </span>
//                 </div>
//               )}
//             </div>
//             <div className="p-4">
//               <div className="text-xs text-gray-600 mb-1">{product.$id}</div>
//               <h3 className="font-medium text-sm mb-1">{product.name}</h3>
//               <div className="text-xs mb-2">{product.description}</div>
//               <div className="flex items-center mb-1">
//                 <div className="flex items-center">
//                   {renderStars(product.rating)}
//                 </div>
//               </div>
//               <div className="text-xs mb-2">{product.condition}</div>
//               <div className="flex items-center justify-between">
//                 <div className="text-sm">
//                   ₦
//                   {Number(product.price)
//                     .toFixed(0)
//                     .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
//                 </div>
//                 <div className="text-xs text-gray-500">{product.category}</div>
//               </div>
//               {product.colors && renderColorDots(product.colors)}
//               <div className="text-xs text-gray-500 mt-2">
//                 Stock: {product.stock}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Product Interest Dialog */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Interested in this product?</DialogTitle>
//             <DialogDescription>
//               {selectedProduct && (
//                 <div className="py-4">
//                   <h3 className="font-medium">{selectedProduct.name}</h3>
//                   <p className="text-sm text-gray-500 mt-1">
//                     {selectedProduct.description}
//                   </p>
//                   <p className="text-sm text-gray-500 mt-1">
//                     Price: ₦{selectedProduct.price}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     Condition: {selectedProduct.condition}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     Stock: {selectedProduct.stock}
//                   </p>
//                 </div>
//               )}
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button
//               onClick={handleWhatsAppClick}
//               className="bg-green-600 hover:bg-green-700"
//             >
//               <Phone className="w-4 h-4 mr-2" />
//               Contact Seller on WhatsApp
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default ProductListing;
