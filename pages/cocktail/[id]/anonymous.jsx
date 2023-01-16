import NotLoggedinDetail from "../../../components/detail/notLoggedinDetail";
import Layout from "../../../components/layout";

import { getCocktailDetails } from "../../../lib/details";

function Details(props) {
  return (
    <Layout navbarType={2}>
      <NotLoggedinDetail data={props.data} />
    </Layout>
  )
}

export default Details;

export async function getServerSideProps(context) {
  const cocktailId = context.query.id;
  const data = await getCocktailDetails(cocktailId);

  return {
    props: {
      data,
    },
  };
}
