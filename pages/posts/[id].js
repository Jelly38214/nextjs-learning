import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

export async function getStaticPaths() {
  // Return an array of possible value for id
  const paths = getAllPostIds();

  /**
   * return {
   *   paths: {params: {id: string;}}
   *   fallback: boolean
   * }
   */
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
