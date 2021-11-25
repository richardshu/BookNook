import { Box, CircularProgress } from "@mui/material";

function Loader() {
  return (
    <Box
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress />
    </Box>
  );
}

export default Loader;
