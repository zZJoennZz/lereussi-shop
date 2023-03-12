import Meta from '@/components/Meta';

import styles from '@/styles/TermsAndConditions.module.css';

import parse from 'html-react-parser';

export async function getServerSideProps() {
  const getTermsContent = await fetch(`${process.env.API_URL}v1/shop/getpagecontents/?page_slug=terms`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return {
    props: {
      pageContent: getTermsContent[0],
    },
  };
}

export default function TermsAndConditions({ pageContent }: any): JSX.Element {
  return (
    <>
      <Meta
        title={pageContent.pageTitle + ' | Lé REUSSI' || 'Lé REUSSI'}
        metaDescription={pageContent.metaDescription || ''}
        keywords={pageContent.metaKeywords}
        robots={pageContent.metaRobots}
        other={pageContent.otherMetaData}
      />
      <div style={{ minHeight: '60vh' }}>
        <div className={styles.termsContainer}>
          <div className={styles.termsContainerInner}>
            {pageContent.page_component &&
              pageContent.page_component.map((component: any) => {
                return (
                  <div key={component.name}>
                    {component.name === 'TermsAndConditionsContent' && (
                      <>
                        <h1 className="text-3xl font-bold text-gray-700 mb-1">{component.section_component[0].title}</h1>
                        <div className="text-gray-500 italic mb-3">Last updated on 2/2/2023</div>
                        {parse(component.section_component[0].description1)}
                      </>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
