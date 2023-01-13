// import * as React from "react";
import { useContext } from "react";
import { getSession } from "next-auth/react";
import { getCocktailDetails } from "../../../lib/details";
import { getFavoriteId } from "../../../lib/favorite";
import { getInventory } from "../../../lib/inventory";
import { getCategoriesByFavId } from "../../../lib/category";
import LocationProvider from "../../../providers/locationProvider";
import LoggedinDetail from "../../../components/detail/loggedinDetail";
import PageContainer from "../../../components/detail/pageContainer";
import { inventoryContext } from "../../../providers/InventoryProvider";

function Details(props) {
  return (
    <LocationProvider>
      <PageContainer>
        <LoggedinDetail
          data={props.data}
          favoriteId={props.favoriteId}
          inventory={props.inventory}
          categories={props.categories}
        />
      </PageContainer>
    </LocationProvider>
  );
}

Details.auth = true;
export default Details;

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
    let categories = [];
    if (favoriteId) {
      categories = await getCategoriesByFavId(favoriteId.id);
    }

    return {
      props: {
        data,
        favoriteId,
        inventory,
        categories,
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
