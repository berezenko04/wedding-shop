export type AddToWishlistBody = {
  productId: string;
};

export type WishlistItem = {
  id: string;
  product: {
    id: string;
    posterUrl: string;
    title: string;
    price: number;
    discount: number | null;
    slug: string;
  };
};

export type GetAllWishlist = {
  wishlist: WishlistItem[];
  total: number;
};
