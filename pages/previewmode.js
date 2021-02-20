import Layout from "../components/layout";
export default function PreviewModePage(props) {
  return (
    <Layout>
      <h2>Preview Mode Page: Show Specific amount user.</h2>
      <div style={{ display: "flex" }}>
        {props.results.map((user) => (
          <div className="img-wrapper">
            <img src={user.picture.large} width={200} height={100} />
            <span>
              {user.name.fisrt} {user.name.last}
            </span>
          </div>
        ))}
        <style jsx>{`
          .img-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  // if you request this page with the preview mode cookies set;
  /**
   * @params {boolean} context.preview
   * @params {any} context.previewData, which is the same as argument used for `setPreviewData`
   * @params {any} context.params, if you're also using `getStaticPaths`
   */

  let count = 1;

  if (context.preview && context?.previewData.count) {
    count = context.previewData.count;
  }

  // Fetch Specific number of user.
  const user = await fetch(
    `https://randomuser.me/api/?results=${count}`
  ).then((response) => response.json());

  // If context.preview is true, append "/preview" to API endpoint
  // to request draft data instead of published data. This will vary
  // based on which headless CMS you're using.
  return {
    props: user,
  };
}
