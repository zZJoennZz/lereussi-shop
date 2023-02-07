import { atom } from 'recoil';
// import { Authentication } from '@/types';

export const authState = atom({
  key: 'authState',
  default: false as boolean,
});
