import type { NextPage } from "next";

// Firebase
import firebaseConfig from "../../firebase.config";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";

// Material UI
import { Box, IconButton } from "@mui/material";
import {
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
} from "@mui/icons-material";

const SignInWithSocialMedia: NextPage = () => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  };

  const handleSignInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    await signInWithRedirect(auth, provider);
  };

  const handleSignInWithTwitter = async () => {
    const provider = new TwitterAuthProvider();
    await signInWithRedirect(auth, provider);
  };

  return (
    <Box display="flex" justifyContent="space-around" alignItems="center">
      <IconButton color="primary" onClick={handleSignInWithGoogle}>
        <GoogleIcon />
      </IconButton>
      <IconButton color="primary" onClick={handleSignInWithFacebook}>
        <FacebookIcon />
      </IconButton>
      <IconButton color="primary" onClick={handleSignInWithTwitter}>
        <TwitterIcon />
      </IconButton>
    </Box>
  );
};

export default SignInWithSocialMedia;
