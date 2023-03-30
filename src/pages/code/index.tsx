import Router from 'next/router';
import { useEffect } from 'react';

export default function Code(): JSX.Element {
  useEffect(() => {
    let isSub = true;
    if (isSub) {
      Router.push('/');
    }
    return () => {
      isSub = false;
    };
  }, []);

  return (
    <>
      <div className="text-center py-10">Redirecting...</div>
    </>
  );
}
