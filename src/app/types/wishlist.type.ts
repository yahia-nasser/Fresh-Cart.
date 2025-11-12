export interface WishList {
  status: string;
  count: number;
  data: WishListProduct[];
}

export interface WishListProduct {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
  priceAfterDiscount?: number;
}

export interface WishlistContextType {
  wishListItems: WishListProduct[];
  isLoading: boolean;
  loading: boolean;
  removeItemFromWishlist: (id: string) => void;
  addToWishlist: (id: string) => Promise<WishlistResponse>;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface WishlistResponse {
  status: string;
  message: string;
}
