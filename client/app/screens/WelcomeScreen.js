import React from "react";
import { ImageBackground, StyleSheet, View, Text, Image } from "react-native";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
    blurRadius={5}
      source={require("../assets/background.jpg")}
      style={styles.background}
    >
      <View style={styles.logoContent}>
        <Image style={styles.logo} source={require("../assets/logo-red.png")} />
        <Text style= {styles.tagline}>Sell What You Don't Need</Text>
      </View>

      <View style={styles.buttonContainer}>
        <AppButton title="Login" 
        onPress={() => navigation.navigate(routes.LOGIN)}
         />
        <AppButton title="Register" color="secondary"
        onPress={() => navigation.navigate(routes.REGISTER)}
         />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    padding: 20,
  },

  logo: {
    width: 100,
    height: 100,
  },
  logoContent: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
  },
});

export default WelcomeScreen;
