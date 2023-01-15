import NotLoggedinDetail from "../../../components/detail/notLoggedinDetail";

import { getCocktailDetails } from "../../../lib/details";

function Details(props) {
  return <NotLoggedinDetail data={props.data} />;
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
