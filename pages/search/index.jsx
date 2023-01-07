import { useState } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import main from "../../lib/search";

const Search = () => {
  const router = useRouter();
  const [enteredSearch, setEnteredSearch] = useState("");
  const [isDataPresent, setIsDataPresent] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(enteredSearch);
    router.push(`search/${enteredSearch}`);
  };

  const changeHandler = (event) => {
    event.preventDefault();
    setEnteredSearch(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Search for a Cocktail"
        variant="outlined"
        value={enteredSearch}
        onChange={changeHandler}
      />
      <Button variant="outlined" onClick={submitHandler}>
        Submit
      </Button>
    </Box>
  );
};

// export function getServerSideProps(context) {
//   main();
//   return {
//     props: {
//       test: "test",
//     },
//   };
// }

// export async function getStaticProps(context) {
//   const meetupId = context.params.meetupId;

//   const client = await MongoClient.connect(
//     "mongodb+srv://kiko:foiegras25@cluster0.a7gxmqk.mongodb.net/meetups?retryWrites=true&w=majority"
//   );
//   const db = client.db();

//   const meetupsCollection = db.collection("meetups");

//   const selectedMeetups = await meetupsCollection.findOne({
//     _id: ObjectId(meetupId),
//   });

//   client.close();

//   // console.log(meetupId);

//   return {
//     props: {
//       meetupData: {
//         id: selectedMeetups._id.toString(),
//         title: selectedMeetups.title,
//         address: selectedMeetups.address,
//         image: selectedMeetups.image,
//         description: selectedMeetups.description,
//       },
//     },
//   };
// }

export default Search;
