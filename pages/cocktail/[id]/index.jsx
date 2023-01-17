import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { getCocktailDetails } from "../../../lib/details";
import LocationProvider from "../../../providers/locationProvider";
import LoggedinDetail from "../../../components/detail/loggedinDetail";
import PageContainer from "../../../components/detail/pageContainer";
import Layout from "../../../components/layout";
import fetcher from "../../../lib/fetcher";
import useSWR from "swr";

function Details(props) {
  const { data: session, status } = useSession();

  const [favoriteId, setFavoriteId] = useState();
  const [categories, setCategories] = useState([]);

  const params = new URLSearchParams({
    userId: session.user.id,
    cocktailId: props.data.idDrink,
  });
  const { data, error, isLoading, isValidating } = useSWR(
    `/api/favorites?${params}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      // console.log(data);
      setFavoriteId(data.favoriteId);
      setCategories(data.categories);
    }
  }, [data]);

  return (
    <LocationProvider>
      <Layout navbarType={2}>
        <PageContainer>
          <LoggedinDetail
            data={props.data}
            favoriteId={favoriteId}
            categories={categories}
          />
        </PageContainer>
      </Layout>
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
