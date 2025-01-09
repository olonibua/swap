import { ID, } from "appwrite";
import {
  account,
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ITEMS_COLLECTION_ID,
  storage,
} from "./appwrite";
import { ProductFormData } from "@/types";
import { toast } from "sonner";


// const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes




interface UserData {
  email: string;
  password: string;
  name?: string;
}

export const createUser = async (user: UserData) => {
  try {
    const newUser = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    return newUser;
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

export const signIn = async (user: UserData) => {
  try {
    // Add underscore prefix to indicate intentionally unused variable
    const _session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );
    const currentUser = await account.get();
    return currentUser;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const checkAuthStatus = async () => {
  try {
    const session = await account.get();
    return session;
  } catch (error) {
    console.error("Auth check failed:", error);
    return null;
  }
};

// export const signInWithGoogle = async () => {
//   try {
//     const session = await googleOAuth();
//     const currentUser = await account.get();
//     return currentUser;
//   } catch (error) {
//     console.error("Error signing in with Google:", error);
//     throw error;
//   }
// };

export const signOut = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};




export const AddProduct = async (
  productData: Partial<ProductFormData>,
  imageFile?: File
) => {
  try {
    let imageUrl = "";

    if (imageFile) {
      // Upload image to Appwrite Storage
      const uploadResponse = await storage.createFile(
        BUCKET_ID!,
        ID.unique(),
        imageFile
      );

      // Get image URL
      imageUrl = storage.getFileView(BUCKET_ID!, uploadResponse.$id);
    }

    const newItem = await databases.createDocument(
      DATABASE_ID!,
      ITEMS_COLLECTION_ID!,
      "unique()",
      {
        ...productData,
        name: productData.name,
        description: productData.description,
        price: productData.price,
        rating: productData.rating,
        condition: productData.condition,
        category: productData.category,
        colors: productData.colors,
        stock: productData.stock,
        images: imageUrl,
      }
    );

    return newItem;
  } catch (error) {
    console.log(error)
    toast.error("Failed to add item");
  }
}

export const getProducts = async () => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      ITEMS_COLLECTION_ID
    );
    return response.documents;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductStats = async () => {
  try {
    const products = await getProducts();
    
    return {
      totalProducts: products.length,
      lowStock: products.filter((p) => p.stock < 10).length,
      outOfStock: products.filter((p) => p.stock === 0).length,
      totalValue: products.reduce((acc, p) => {
  const price = Number(p.price) || 0; // Convert price to number
  const stock = Number(p.stock) || 0; // Convert stock to number
  return acc + (price * stock); // Calculate total value
}, 0),
    };
  } catch (error) {
    console.error("Error getting product stats:", error);
    throw error;
  }
};

export const updateProduct = async (
  productId: string,
  productData: Partial<ProductFormData>,
  imageFile?: File
) => {
  try {
    let imageUrl = productData.images;

    if (imageFile) {
      const uploadResponse = await storage.createFile(
        BUCKET_ID!,
        ID.unique(),
        imageFile
      );
      imageUrl = storage.getFileView(BUCKET_ID!, uploadResponse.$id);
    }

    const updatedItem = await databases.updateDocument(
      DATABASE_ID!,
      ITEMS_COLLECTION_ID!,
      productId,
      {
        ...productData,
        images: imageUrl,
      }
    );

    return updatedItem;
  } catch (error) {
    toast.error("Failed to update item");
    throw error;
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    await databases.deleteDocument(
      DATABASE_ID!,
      ITEMS_COLLECTION_ID!,
      productId
    );
    return true;
  } catch (error) {
    toast.error("Failed to delete item");
    throw error;
  }
};