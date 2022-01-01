import { Box } from "@mui/material";

function Error(props: any) {
  return (
    <Box
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      height="100vh"
    >
      <Box display="flex" flexDirection="column">
        <h1>Error: </h1>
        <p>{props.message}</p>
      </Box>
    </Box>
  );
}

export default Error;
