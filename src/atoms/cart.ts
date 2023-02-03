import { atom } from 'recoil';
import { Cart } from '@/types';

export const cartItemsState = atom({
  key: 'cartItemsState',
  // default: [] as Cart[],
  default: [
    {
      id: 1,
      name: 'Ube Cake',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim praesent elementum facilisis leo vel fringilla est. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet dui. Ultrices sagittis orci a scelerisque purus semper eget duis.',
      slug: 'ube-cake',
      category: 'Cake',
    },
    {
      id: 2,
      name: 'Orange Cake',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim praesent elementum facilisis leo vel fringilla est. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet dui. Ultrices sagittis orci a scelerisque purus semper eget duis.',
      slug: 'orange-cake',
      category: 'Cake',
    },
    {
      id: 3,
      name: 'Cheese Cake',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim praesent elementum facilisis leo vel fringilla est. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet dui. Ultrices sagittis orci a scelerisque purus semper eget duis.',
      slug: 'cheese-cake',
      category: 'Cake',
    },
  ],
});
