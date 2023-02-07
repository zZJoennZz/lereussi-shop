import { atom } from 'recoil';
import { Cart } from '@/types';

export const cartItemsState = atom({
  key: 'cartItemsState',
  default: [] as Cart[],
});
