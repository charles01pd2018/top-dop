// dependencies
import Head from 'next/head';
// layout
import { DefaultLayout } from 'layout';
// components
import { Headers, Paragraphs, Container } from 'components';

/* TYPES */
interface Content {
  pageTitle: string;
  headersContent: {
    text: string;
  },
  paragraphsContent: {
    text: string;
  },
};

interface Props {
  content: Content;
};

const Home = ( {
  content: {
    pageTitle,
    headersContent,
    paragraphsContent,
  },
}: Props ) => {

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

        <DefaultLayout>
          <Container id='header-container'>
            <Headers id='headers-component' content={headersContent} />
          </Container>
          <Container id='paragraphs-container' className='paragraphs-container'>
            <Paragraphs id='paragraphs-component' content={paragraphsContent} />
          </Container>
        </DefaultLayout>
    </>
  
  );
}

const HomeContent = {
  pageTitle: 'Next.JS Starting Template',
  // Component Content
  headersContent: {
    text: 'Welcome!'
  },
  paragraphsContent: {
    text: 'Paragraph',
  }
};

export async function getStaticProps() {
  return {
    props: {
      content: HomeContent,
    }
  }
}

export default Home;