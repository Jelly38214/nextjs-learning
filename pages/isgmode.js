import Layout from "../components/layout";

export default function IncrementalStaticGeneration({ star }) {
  return <Layout>The amount of star of React is {star}</Layout>;
}

export async function getStaticProps(context) {
  const data = (await fetch("https://api.github.com/repos/facebook/react", {
    method: "GET",
  })
    .then((res) => res.json())
    .catch(() => undefined)) ?? { stargazers_count: 0 };

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      star: data.stargazers_count,
    },
    revalidate: 1,
  };
}
