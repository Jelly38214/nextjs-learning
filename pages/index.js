import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import DateFnsComponent from "../components/date";

/**
 *
 * @type import("next").GetServerSideProps;
 */
export async function getStaticProps(_context) {
  console.log("Index start getStaticProps");
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData, name }) {
  console.log("Index Start Render", name);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you'll be building a site like this on{""}
          )<a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section>
        <h2 className={utilStyles.headingLg}>SSR Page</h2>
        <div className={utilStyles.listItem}>
          <Link href={`/randomuser`}>
            <a>RandomUser</a>
          </Link>
        </div>
      </section>

      <section>
        <h2 className={utilStyles.headingLg}>
          ISG(Incremental Static Generation) Page
        </h2>
        <div className={utilStyles.listItem}>
          <Link href={`/isgmode`}>
            <a>Dynamic amount of React start</a>
          </Link>
        </div>
      </section>
      <section>
        <h2 className={utilStyles.headingLg}>Google Analytics Demo Page</h2>
        <div className={utilStyles.listItem}>
          <Link href={`/ga`}>
            <a>Google Analytics Demo</a>
          </Link>
        </div>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData?.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <DateFnsComponent dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
