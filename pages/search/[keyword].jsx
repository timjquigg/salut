import { getCocktail } from "../../lib/search";
import { useRouter } from "next/router";
import Image from "next/image";

const result = (props) => {
  console.log(props);
  return (
    <>
      <p>{props.drink[0].strDrink}</p>
      <p>{props.drink[0].strCategory}</p>
      <Image
        src={props.drink[0].strDrinkThumb}
        alt={props.drink[0].strDrink}
        width="200"
        height="200"
      />
    </>
  );
};

export async function getServerSideProps(context) {
  const keyword = context.query.keyword;
  const data = await getCocktail(keyword);
  return {
    props: {
      drink: data,
    },
  };
}
export default result;
