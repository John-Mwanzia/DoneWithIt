import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Image } from "react-native-expo-image-cache";

function Card({ title, subTitle, imageURL, onPress, thumbnailURL }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.image} uri={imageURL} preview={{uri: thumbnailURL}} tint="light"/>
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.subTitle}>{subTitle}</AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
});
export default Card;
