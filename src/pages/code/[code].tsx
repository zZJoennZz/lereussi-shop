import type { GetServerSidePropsContext } from 'next';
import Router from 'next/router';
import { useEffect } from 'react';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      code: context.query.code,
    },
  };
}

export default function Code({ code }: { code: string }): JSX.Element {
  useEffect(() => {
    let isSub = true;
    if (isSub) {
      localStorage.setItem('code', code);
      Router.push('/');
    }
    return () => {
      isSub = false;
    };
  }, [code]);

  return (
    <>
      <div className="text-center py-10">Applying code... Please do not refresh the page... Redirecting...</div>
    </>
  );
}
