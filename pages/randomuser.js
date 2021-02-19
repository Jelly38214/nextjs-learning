import Layout from "../components/layout";
export default function User(props) {
  return (
    <Layout>
      <div style={{ display: "flex" }}>
        {props.results.map((user) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: 'wrap',
            }}
          >
            <img src={user.picture.large} width={200} height={100} />
            <span>
              {user.name.fisrt} {user.name.last}
            </span>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const count = Math.floor(Math.random() * 5);
  const result = await fetch(
    `https://randomuser.me/api/?results=${count}`
  ).then((response) => response.json());

  return {
    props: result,
  };
}
