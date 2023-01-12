import * as React from "react";
import LoggedinDetail from "../../../components/detail/loggedinDetail";
import { getSession } from "next-auth/react";
import { getCocktailDetails } from "../../../lib/details";
import { getFavoriteId } from "../../../lib/favorite";
import { getInventory } from "../../../lib/inventory";
import LocationProvider from "../../../providers/locationProvider";

export async function getServerSideProps(context) {
  const cocktailId = context.query.id;
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: `/cocktail/${cocktailId}/anonymous`,
        permanent: false,
      },
    };
  }
  const sessionToken = context.req.cookies["next-auth.session-token"];
  const data = await getCocktailDetails(cocktailId);

  if (sessionToken) {
    const favoriteId = await getFavoriteId(sessionToken, cocktailId);
    const inventory = await getInventory(sessionToken);
    // console.log(context.req.cookies["next-auth.session-token"]);
    return {
      props: {
        data,
        favoriteId,
        inventory,
      },
    };
  } else {
    return {
      props: {
        data,
      },
    };
  }
}

function Details(props) {
  return (
    <LocationProvider>
      <LoggedinDetail
        data={props.data}
        favoriteId={props.favoriteId}
        inventory={props.inventory}
      />
    </LocationProvider>
  );
}

Details.auth = true;
export default Details;
