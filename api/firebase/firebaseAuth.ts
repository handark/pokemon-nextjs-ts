import { auth } from "./index";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

//Opcional: Especifica los permisos adicionales de OAuth 2.0 que deseas
//solicitarle al proveedor de autenticación:
//provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

auth.languageCode = "es";

const createUser = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const signInWithGoogle = () => {
  /*   signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  }); */

  return signInWithPopup(auth, provider);
};

const onAuthState = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // https://firebase.google.com/docs/reference/js/firebase.User
      return user;
    } else {
      return null;
    }
  });
};

export { createUser, signIn, onAuthState, signInWithGoogle };
