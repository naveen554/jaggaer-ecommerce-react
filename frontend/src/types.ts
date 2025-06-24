export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imageUrl: string;
  shortDescription: string;
  rating: number
}

export interface CartItem extends Product {
  quantity: number;
}
