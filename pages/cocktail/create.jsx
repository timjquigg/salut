import LocationProvider from "../../providers/locationProvider";
import PageContainer from "../../components/detail/pageContainer";
import { getIngredients } from "../../lib/inventory";
import { getCocktailNames } from "../../lib/cocktail";
import NewCocktailProvider from "../../providers/newCocktailProvider";
import Form from "../../components/create/form";

function Create(props) {
  return (
    <LocationProvider>
      <NewCocktailProvider
        ingredients={props.ingredients}
        cocktails={props.cocktails}
      >
        <PageContainer>
          <Form />
        </PageContainer>
      </NewCocktailProvider>
    </LocationProvider>
  );
}

Create.auth = true;

export async function getServerSideProps(context) {
  const { ingredients } = await getIngredients();
  const cocktails = await getCocktailNames();
  console.log(ingredients);
  return {
    props: {
      ingredients,
      cocktails,
    },
  };
}

export default Create;
