import { getFilterCocktailsStrict } from "../../lib/search";

const Result = (props) => {
  console.log(props);
  return <p>Apples</p>;
};

export async function getServerSideProps(context) {
  const filtersParams = context.query.filter.map((el) => el.toLowerCase());
  const data = await getFilterCocktailsStrict(filtersParams);
  return {
    props: {
      data: data,
    },
  };
}
export default Result;
