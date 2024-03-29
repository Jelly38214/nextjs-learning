import React, { useCallback } from "react";
import Layout from "../components/layout";

const GaComponent = (props) => {
  console.log('Props in GaComponent:', props)
  const handleEvent = useCallback(() => {
    setTimeout(() => {
      gtag("event", "e_express_checkout_success", {
        event_category: "ecommerce",
        event_label: "e_express_checkout_click",
      });
    }, 2000);
  }, []);
  return (
    <Layout>
      <a href="" ga-event="a-link-click">
        Click Send Event In Non-A tag
      </a>
      <br />
      <button ga-event="button-click">Click Send Event In Non-A tag</button>
      <br />
      <button onClick={handleEvent}>Click Send Event By dataLayer</button>
    </Layout>
  );
};

GaComponent.getInitialProps = async () => {
  console.log('getInitialProps in GaComponent')
  return {
    props: {name: 'Jelly'}
  }
}

export default GaComponent