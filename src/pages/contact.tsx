import Meta from '@/components/Meta';
import Image from 'next/image';
import styles from '@/styles/Contact.module.css';
import contactBg from '@/img/contact-bg.png';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

export async function getServerSideProps() {
  const getContactPage = await fetch(`${process.env.API_URL}v1/shop/getpagecontents/?page_slug=contact`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return {
    props: {
      pageContent: getContactPage[0],
    },
  };
}

export default function Contact({ pageContent }: any): JSX.Element {
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
        <div className={styles.contact}>
          <div className={styles.contactInner}>
            {pageContent.page_component &&
              pageContent.page_component.map((component: any) => {
                return <div key={component.name}>{component.name === 'ContactForm' && <ContactForm />}</div>;
              })}
          </div>
        </div>
      </div>
    </>
  );
}

function ContactForm(): JSX.Element {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 py-10">
        <div className="pl-0 lg:pl-6 w-full">
          <h1 className="text-2xl md:text-5xl font-bold mb-3 text-slate-600">
            <span>Contact Us</span>
          </h1>
          <form action="">
            <div className="mb-3">
              <div className="mb-1">
                <label htmlFor="" className="text-slate-500">
                  Subject
                </label>
              </div>
              <div>
                <input type="text" placeholder="Hey! How can we help you?" className="textfield" />
              </div>
            </div>
            <div className="mb-3">
              <div className="mb-1">
                <label htmlFor="" className="text-slate-500">
                  Email Address
                </label>
              </div>
              <div>
                <input type="text" placeholder="Let us get back to you!" className="textfield" />
              </div>
            </div>
            <div className="mb-3">
              <div className="mb-1">
                <label htmlFor="" className="text-slate-500">
                  Message
                </label>
              </div>
              <div>
                <textarea placeholder="Tell us more!" className="textfield"></textarea>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="bg-pizza-700 hover:bg-pizza-600 transition-all ease-in-out duration-300 text-white px-3 py-2 rounded-xl flex items-center">
                Send! <PaperAirplaneIcon className="ml-2 w-4 h-4 inline" />
              </button>
            </div>
          </form>
        </div>
        <div>
          <Image priority src={contactBg} className="w-4/5" alt="Contact us now!" />
        </div>
      </div>
    </>
  );
}
