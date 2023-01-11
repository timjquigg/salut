import * as React from "react";
import NotLoggedinDetail from "../../../components/detail/notLoggedinDetail";

import { getCocktailDetails } from "../../../lib/details";


export async function getServerSideProps(context) {
  const cocktailId = context.query.id;
  const data = await getCocktailDetails(cocktailId);

  return {
    props: {
      data,
    },
  };
}


function Details(props) {
  return (

  <NotLoggedinDetail data={props.data}/>
      
  )
}

export default Details;
