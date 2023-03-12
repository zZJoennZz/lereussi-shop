import Image from 'next/image';
import Meta from '@/components/Meta';
import styles from '@/styles/About.module.css';
import aboutBg from '@/img/about-bg.png';
import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const getAboutUs = await fetch(`${process.env.API_URL}v1/shop/getpagecontents/?page_slug=about`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return {
    props: {
      pageContent: getAboutUs[0],
    },
  };
}

export default function About({ pageContent }: any) {
  return (
    <>
      <Meta
        title={pageContent.pageTitle + ' | Lé REUSSI' || 'Lé REUSSI'}
        metaDescription={pageContent.metaDescription || ''}
        keywords={pageContent.metaKeywords}
        robots={pageContent.metaRobots}
        other={pageContent.otherMetaData}
      />
      {pageContent.page_component &&
        pageContent.page_component.map((component: any) => {
          return <div key={component.name}>{component.name === 'AboutContent' && <AboutContent contents={component.section_component[0]} />}</div>;
        })}
    </>
  );
}

function AboutContent({ contents }: any): JSX.Element {
  return (
    <>
      <div style={{ minHeight: '60vh' }} className="flex items-center">
        <div className={styles.aboutSection}>
          <div className={styles.aboutInnerSection}>
            <div className="pl-0 lg:pl-6 w-full flex flex-col justify-center">
              <h1 className="text-2xl md:text-5xl font-bold mb-3 text-gray-700">{contents.title}</h1>
              <p className="text-slate-600">{contents.description1}</p>
            </div>
            <div className="flex items-center justify-end relative" style={{ minHeight: '300px' }}>
              <Image src={contents.image} fill alt="About us" className="object-contain" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
