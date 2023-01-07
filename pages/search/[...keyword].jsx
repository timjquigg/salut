import { getCocktailName } from "../../lib/search";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";

const result = (props) => {
  console.log(props.drink);
  return (
    <>
      <p>{props.drink[0].strDrink}</p>
      <p>{props.drink[0].strCategory}</p>
    </>
  );
};

export async function getServerSideProps(context) {
  const keyword = context.query.keyword;
  const data = await getCocktailName(keyword[0]);
  return {
    props: {
      drink: data,
    },
  };
}
export default result;
