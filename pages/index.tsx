// dependencies
import Head from 'next/head';
// layout
import { DefaultLayout } from 'layout';
// components
import { TextMessage, Logo } from 'components';

/* TYPES */
interface Content {
  pageTitle: string;
};

interface Props {
  content: Content;
};

const Home = ( {
  content: {
    pageTitle,
  },
}: Props ) => {

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
        <DefaultLayout>
          <TextMessage id='yuhurd' />
            <div className='bg' role='presentation' />
          <Logo />
        </DefaultLayout>
    </>
  );
}

const homeContent = {
  pageTitle: 'Top Dop - Did you mean...?',
  // Component Content
  //fdashjf 
};

export async function getStaticProps() {
  return {
    props: {
      content: homeContent,
    }
  }
}

export default Home;