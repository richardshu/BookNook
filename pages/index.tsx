import type { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

// Firebase
import firebaseConfig from "../firebase.config";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

// Material UI
import { Avatar, Box, Button } from "@mui/material";

// Components
import HeadMetadata from "../components/HeadMetadata";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Home: NextPage = () => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);

  const handleSignOut = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        if (result) {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
        }
        // The signed-in user info.
        const user = result?.user;
        console.log("USER: ", user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log("ERROR: ", error);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!user) {
    return (
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        height="100vh"
      >
        <Link href="/signin">
          <Button variant="outlined">Sign in</Button>
        </Link>
      </Box>
    );
  }

  return (
    <div className={styles.container}>
      <HeadMetadata title="BookNook | Home" />

      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        height="100vh"
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <p>Display Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
          <p>uid: {user.uid}</p>
          <Avatar src={user.photoURL} alt={user.displayName} />

          <Button variant="outlined" onClick={handleSignOut}>
            Sign out
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
