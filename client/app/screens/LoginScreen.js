import React from "react";
import { Image, StyleSheet } from "react-native";
import * as Yup from "yup";
import { decode } from "base-64";
global.atob = decode;


import Screens from "../components/Screen";
import { AppForm, AppFormField, SubmitButton,ErrorMessage } from "../components/forms";
import authApi from "../api/auth";
import { useState } from "react";

import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email()
    .label("Email"),
  password: Yup.string()
    .required()
    .min(4)
    .label("Password"),
});

function LoginScreen(props) {
  const [loginFailed, setLoginFailed] = useState();
  const {logIn} = useAuth();

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);

    logIn(result.data);
  }
  return (
    <Screens style={styles.container}>
      <Image style={styles.image} source={require("../assets/logo-red.png")} />
      <ErrorMessage error="Invalid email and/or password." visible={loginFailed} />
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />

        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Login" />
      </AppForm>
    </Screens>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
