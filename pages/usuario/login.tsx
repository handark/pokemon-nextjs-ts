import {
  Button,
  Card,
  Container,
  Grid,
  Image,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { NextPage } from "next";
import { auth } from "../../api/firebase";
import { Layout } from "../../components/layouts";

const provider = new GoogleAuthProvider();

const LoginPage: NextPage = () => {
  const handleIngresar = () => {
    auth.languageCode = "es";

    console.log(auth);

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;

        console.log(user, credential, token);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.log(errorCode, errorMessage, email, credential);
      });
  };

  return (
    <Layout title="Acceder a Pokedex">
      <Container
        alignContent="center"
        justify="center"
        display="flex"
        css={{
          height: "calc(100vh - 150px)",
        }}
      >
        <Grid.Container gap={2} justify="center" alignContent="center">
          <Grid xs={12} md={5}>
            <Card>
              <Card.Header>
                <Text b h3>
                  Acceder a Pokedex
                </Text>
              </Card.Header>
              <Card.Divider />
              <Card.Body css={{ py: "$10" }}>
                <Button bordered onPress={handleIngresar}>
                  <Image
                    src="/img/google.svg"
                    height={22}
                    width={22}
                    alt="Googlw"
                  />
                  <Spacer x={1} />
                  <Text
                    size={18}
                    css={{
                      marginLeft: "0.7rem",
                    }}
                  >
                    Ingresar con Google
                  </Text>
                </Button>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
      </Container>
    </Layout>
  );
};

export default LoginPage;
