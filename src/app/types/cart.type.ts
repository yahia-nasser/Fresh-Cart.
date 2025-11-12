export interface CartProductItem {
  count: number;
  price: number;
  product: {
    id: string;
    title: string;
    imageCover: string;
  };
}

export interface CartType {
  status?: string;
  numOfCartItems: number;
  cartId: string;
  data: {
    totalCartPrice: number;
    products: CartProductItem[];
  };
  message: string;
}

export interface CartContextType {
  numOfCartItems: number;
  totalCartPrice: number;
  CartProducts: CartProductItem[];
  isLoading: boolean;

  addProductToCart: (id: string) => Promise<CartType>;

  removeProductFromCart: (id: string) => Promise<CartType>;

  updateCount: (id: string, count: number) => Promise<CartType>;

  clearAll: () => Promise<{ status: string }>;

  cartId: string;
  afterPayment: () => void;
  loading: boolean;
}
