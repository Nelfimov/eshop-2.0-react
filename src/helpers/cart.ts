import { Cart } from '@/types';

export function addToCart(id: string) {
  const cartString = localStorage.getItem('cart');
  if (!cartString) localStorage.setItem('cart', JSON.stringify([]));
  const cart: Cart[] = JSON.parse(localStorage.getItem('cart') as string);
  const itemIndex = cart.findIndex((item) => item.id == id);
  console.log(itemIndex);
  if (itemIndex >= 0) {
    cart[itemIndex].quantity++;
  } else {
    cart.push({ id, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart(id: string) {
  const cartString = localStorage.getItem('cart');
  if (!cartString) return;
  const cart: Cart[] = JSON.parse(localStorage.getItem('cart') as string);
  const itemIndex = cart.findIndex((item) => item.id === id);
  if (itemIndex < 1) return;
  cart.splice(itemIndex, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function substractFromCart(id: string) {
  const cartString: string | null = localStorage.getItem('cart');
  if (!cartString) return;
  const cartArray: Cart[] = JSON.parse(cartString);
  const itemIndex = cartArray.findIndex((item) => item.id === id);
  if (itemIndex < 1) return;
  cartArray[itemIndex].quantity--;
  localStorage.setItem('cart', JSON.stringify(cartArray));
}
