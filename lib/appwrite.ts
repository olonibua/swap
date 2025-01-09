// lib/appwrite.ts

import { Client, Account, Databases, Storage } from "appwrite";

// Check if required environment variables are set
if (!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) {
  throw new Error("NEXT_PUBLIC_APPWRITE_ENDPOINT is not set");
}
if (!process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) {
  throw new Error("NEXT_PUBLIC_APPWRITE_PROJECT_ID is not set");
}
if (!process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID) {
  throw new Error("NEXT_PUBLIC_APPWRITE_DATABASE_ID is not set");
}
if (!process.env.NEXT_PUBLIC_APPWRITE_ITEMS_COLLECTION_ID) {
  throw new Error(
    "NEXT_PUBLIC_APPWRITE_ITEMS_COLLECTION_ID is not set"
  );
}
if (!process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID) {
  throw new Error("NEXT_PUBLIC_APPWRITE_BUCKET_ID is not set");
}

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
export const ITEMS_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_ITEMS_COLLECTION_ID;
export const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;

const client = new Client();



client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);









// import { Product, ProductFormData, ProductStats } from "@/types";
// import { Client, Databases, Storage, ID, Query } from "appwrite";

// const client = new Client()
//   .setEndpoint("YOUR_APPWRITE_ENDPOINT")
//   .setProject("YOUR_PROJECT_ID");

// const databases = new Databases(client);
// const storage = new Storage(client);

// export const COLLECTION_ID = "products";
// export const DATABASE_ID = "marketplace";
// export const BUCKET_ID = "product-images";

// export class AppwriteService {
//   async createProduct(productData: ProductFormData): Promise<Product> {
//     const images = await Promise.all(
//       productData.images.map((image) =>
//         storage.createFile(BUCKET_ID, ID.unique(), image)
//       )
//     );

//     const imageIds = images.map((file) => file.$id);

//     return await databases.createDocument(
//       DATABASE_ID,
//       COLLECTION_ID,
//       ID.unique(),
//       {
//         ...productData,
//         images: imageIds,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       }
//     );
//   }

//   async getProducts(): Promise<Product[]> {
//     const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
//       Query.orderDesc("createdAt"),
//     ]);
//     return response.documents as Product[];
//   }

//   async updateProduct(
//     id: string,
//     productData: Partial<ProductFormData>
//   ): Promise<Product> {
//     return await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, {
//       ...productData,
//       updatedAt: new Date(),
//     });
//   }

//   async deleteProduct(id: string): Promise<void> {
//     await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
//   }

//   async getProductStats(): Promise<ProductStats> {
//     const products = await this.getProducts();
//     return {
//       totalProducts: products.length,
//       lowStock: products.filter((p) => p.stock < 10).length,
//       outOfStock: products.filter((p) => p.stock === 0).length,
//       totalValue: products.reduce((acc, p) => acc + p.price * p.stock, 0),
//     };
//   }
// }

// export const appwriteService = new AppwriteService();
