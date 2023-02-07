import { Cart } from '@/types/cart';
export function addToCartInLocalStorage(updatedCart: Cart[]): boolean {
  const upCart: string = JSON.stringify(updatedCart);
  localStorage.setItem('cart', upCart);
  return false;
}
