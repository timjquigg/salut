import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { getCocktailDetails } from "../../../lib/details";
import LocationProvider from "../../../providers/locationProvider";
import LoggedinDetail from "../../../components/detail/loggedinDetail";
import PageContainer from "../../../components/detail/pageContainer";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

function Details(props) {
  const { data: session, status } = useSession();

  const [favoriteId, setFavoriteId] = useState();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams({
      userId: session.user.id,
      cocktailId: props.data.idDrink,
    });
    axios.get(`/api/favorites?${params}`).then((res) => {
      setFavoriteId(res.data.favoriteId);
      setCategories(res.data.categories);
    });
  }, [props.data.idDrink, session.user.id]);

  return (
    <LocationProvider>
      <PageContainer>
        <LoggedinDetail
          data={props.data}
          favoriteId={favoriteId}
          categories={categories}
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

  return {
    props: {
      data,
    },
  };
}
