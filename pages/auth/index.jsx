import { useSession, signIn, signOut } from "next-auth/react";
import { Box } from "@mui/system";

function Auth() {
  const { data: session, status } = useSession();
  let userDetails = [];
  if (session) {
    userDetails = Object.keys(session.user).map((key) => {
      return <p key={key}>{`${key}: ${session.user[key]}`}</p>;
    });
  }
  console.log(userDetails);
  return (
    <Box sx={{ mt: 20 }}>
      <h1>Session Info</h1>
      {userDetails}
    </Box>
  );
}

export default Auth;
