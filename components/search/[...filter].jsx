// import { getFilterCocktailsStrict } from "../../lib/search";
// import { getAllIngredients } from "../../lib/search";
// import KeywordForm from "./keyword_form";
// import FilterForm from "./filter_form";
// import SearchContainer from "./search_container";
// import Box from "@mui/material/Box";
// import ResultList from "./result_list";
// import useSearch from "../../custom_hook/useSearch";
// import { useSession } from "next-auth/react";

// const Result = (props) => {
//   const { data: session } = useSession();
//   console.log("session:", session);
//   // console.log(props);
//   const {
//     enteredSearch,
//     changeHandler,
//     submitHandler,
//     filterKeywords,
//     inputFilterKeywords,
//     changeFilterHandler,
//     changeInputFilterHandler,
//     submitFilterHandler,
//   } = useSearch();

//   return (
//     <>
//       <SearchContainer
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           p: 2,
//           mt: 8,
//         }}
//       >
//         <KeywordForm
//           enteredSearch={enteredSearch}
//           changeHandler={changeHandler}
//           submitHandler={submitHandler}
//         />

//         <FilterForm
//           options={props.ingredients}
//           filterKeywords={filterKeywords}
//           inputFilterKeywords={inputFilterKeywords}
//           onChange={changeFilterHandler}
//           onInputChange={changeInputFilterHandler}
//           onClick={submitFilterHandler}
//         />
//       </SearchContainer>
//       <Box
//         noValidate
//         component="form"
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           p: 2,
//           position: "relative",
//         }}
//       >
//         <p>{`${props.drinks.length} Results`}</p>
//         <ResultList drink={props.drinks} />
//       </Box>
//     </>
//   );
// };

// export async function getServerSideProps(context) {
//   const ingredientData = await getAllIngredients();
//   const filtersParams = context.query.filter.map((el) => el.toLowerCase());
//   const drinksData = await getFilterCocktailsStrict(filtersParams);
//   return {
//     props: {
//       drinks: drinksData,
//       ingredients: ingredientData,
//     },
//   };
// }
// export default Result;

//////////////

// const router = useRouter();
// const [enteredSearch, setEnteredSearch] = useState("");
// const [filterKeywords, setFilterKeywords] = useState([]);
// const [inputFilterKeywords, setInputFilterKeywords] = useState();

// const pathFormatter = (filtersArr) => {
//   let url = "search";
//   filtersArr.forEach((filter) => {
//     url += `/${filter}`;
//   });
//   return url;
// };

// const submitHandler = (event) => {
//   event.preventDefault();
//   router.push(`search/${enteredSearch}`);
// };

// const changeHandler = (event) => {
//   event.preventDefault();
//   setEnteredSearch(event.target.value);
// };

// const changeFilterHandler = (event, newValue) => {
//   setFilterKeywords(newValue);
// };

// const changeInputFilterHandler = (event, newValue) => {
//   console.log(newValue.strIngredient);
//   setInputFilterKeywords(newValue);
// };

// const submitFilterHandler = (event) => {
//   event.preventDefault();
//   const formatValue = filterKeywords.map((el) => el.strIngredient);
//   console.log("filtered:", filterKeywords);
//   console.log(pathFormatter(formatValue));
//   router.push(pathFormatter(formatValue));
// };
