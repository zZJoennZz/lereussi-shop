// import axios from 'axios'
// import { Authentication } from '@/types';

const api_url = process.env.NEXT_PUBLIC_API_URL;

export async function isAuth(token: string, refresh: string) {
  const url = api_url + 'v1/shop/whoami/';
  const data = {
    refresh,
  };
  const res = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(data),
  });

  if (res.status === 200) {
    let data = await res.json();
    localStorage.setItem('user', JSON.stringify(data));
    return true;
  }
  localStorage.setItem('token', '');
  localStorage.setItem('refresh', '');
  return false;
}

export async function login(username: string, password: string) {
  const url = api_url + 'v1/shop/login/';
  const data = {
    username,
    password,
  };
  const res = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  let resData = await res.json();

  if (res.status === 200) {
    localStorage.setItem('token', 'Bearer ' + resData.access);
    localStorage.setItem('refresh', resData.refresh);
    return true;
  }
  localStorage.setItem('token', '');
  localStorage.setItem('refresh', '');
  return false;
}
