import LocationProvider from "../../providers/locationProvider";
import PageContainer from "../../components/detail/pageContainer";
import { getIngredients } from "../../lib/inventory";
import { getCocktailNames } from "../../lib/cocktail";
import { getUserId } from "../../lib/user";
import CocktailTitle from "../../components/detail/cockTailTitle";
import NewCocktailProvider from "../../providers/newCocktailProvider";
import Form from "../../components/create/form";

function Create(props) {
  return (
    <LocationProvider>
      <NewCocktailProvider
        ingredients={props.ingredients}
        cocktails={props.cocktails}
        userId={props.userId}
      >
        <PageContainer>
          <CocktailTitle cocktailName="Create a Recipe" />
          <Form />
        </PageContainer>
      </NewCocktailProvider>
    </LocationProvider>
  );
}

Create.auth = true;

export async function getServerSideProps(context) {
  const sessionToken = context.req.cookies["next-auth.session-token"];
  const userInfo = await getUserId(sessionToken);
  const { ingredients } = await getIngredients();
  const cocktails = await getCocktailNames();
  // console.log(userInfo.userId);
  return {
    props: {
      ingredients,
      cocktails,
      userId: userInfo.userId,
    },
  };
}

export default Create;
