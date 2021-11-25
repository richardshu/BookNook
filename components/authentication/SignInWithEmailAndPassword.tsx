import type { NextPage } from "next";
import { useState } from "react";
import styles from "../../styles/SignIn.module.css";

// Firebase
import firebaseConfig from "../../firebase.config";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

// Material UI
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";

interface SignInWithEmailAndPasswordProps {
  isSignUp?: boolean;
}

const SignInWithEmailAndPassword: NextPage<SignInWithEmailAndPasswordProps> = ({
  isSignUp,
}) => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signInFailed, setSignInFailed] = useState<boolean>(false);
  const [signUpFailed, setSignUpFailed] = useState<boolean>(false);

  const handleCreateUserWithEmailAndPassword = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setSignUpFailed(true);
      });
  };

  const handleSignInWithEmailAndPassword = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setSignInFailed(true);
      });
  };

  return (
    <Box display="flex" flexDirection="column">
      <TextField
        required
        label="Email"
        type="email"
        size="small"
        margin="dense"
        autoComplete="email"
        error={signInFailed || signUpFailed}
        onChange={(event) => setEmail(event.target.value)}
      />

      <TextField
        required
        label="Password"
        type={showPassword ? "text" : "password"}
        size="small"
        margin="dense"
        autoComplete="current-password"
        error={signInFailed || signUpFailed}
        helperText={
          isSignUp
            ? signUpFailed
              ? "Sign up failed."
              : ""
            : signInFailed
            ? "Wrong email or password."
            : ""
        }
        onChange={(event) => setPassword(event.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="toggle password visibility"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        variant="contained"
        onClick={
          isSignUp
            ? handleCreateUserWithEmailAndPassword
            : handleSignInWithEmailAndPassword
        }
        className={styles.signInButton}
      >
        {isSignUp ? "Create account" : "Sign In"}
      </Button>
    </Box>
  );
};

export default SignInWithEmailAndPassword;
