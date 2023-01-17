import LocationProvider from "../../providers/locationProvider";
import PageContainer from "../../components/detail/pageContainer";
import Layout from "../../components/layout";
import NewCocktailProvider from "../../providers/newCocktailProvider";
import Form from "../../components/create/form";

function Create(props) {
  return (
    <LocationProvider>
      <NewCocktailProvider>
        <Layout navbarType={2}>
          <PageContainer>
            <Form />
          </PageContainer>
        </Layout>
      </NewCocktailProvider>
    </LocationProvider>
  );
}

Create.auth = true;

export default Create;
