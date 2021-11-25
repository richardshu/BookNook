import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/SignIn.module.css";

// Firebase
import firebaseConfig from "../firebase.config";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

// Material UI
import { Box, Button, Divider, Typography } from "@mui/material";

// Components
import HeadMetadata from "../components/HeadMetadata";
import Loader from "../components/Loader";
import Error from "../components/Error";
import SignInWithSocialMedia from "../components/authentication/SignInWithSocialMedia";
import SignInWithEmailAndPassword from "../components/authentication/SignInWithEmailAndPassword";

const SignIn: NextPage = () => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (user) {
    router.push("/");
    return <Loader />;
  }

  return (
    <div>
      <HeadMetadata title="BookNook | Sign In" />

      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        height="100vh"
      >
        <div className={styles.signInContainer}>
          <Typography
            variant="h5"
            component="div"
            textAlign="center"
            gutterBottom
          >
            <strong>Sign In</strong>
          </Typography>

          <SignInWithSocialMedia />

          <Box py={2}>
            <Divider>or</Divider>
          </Box>

          <SignInWithEmailAndPassword />

          <Box display="flex" justifyContent="space-around" alignItems="center">
            <Typography component="span">No account?</Typography>
            <Link href="/signup">
              <Button style={{ textTransform: "none" }}>Sign Up</Button>
            </Link>
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default SignIn;
