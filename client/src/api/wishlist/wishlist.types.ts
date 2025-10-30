export type AddToWishlistBody = {
  productId: string;
};

export type WishlistItem = {
  id: string;
  product: {
    posterUrl: string;
    title: string;
    price: number;
    discount: number | null;
  };
};

export type GetAllWishlist = {
  wishlist: WishlistItem[];
  total: number;
};

export type CheckInWishlistBody = {
  ids: string[];
};
