import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function NewListingButton({ size = 40, color = colors.white, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <MaterialCommunityIcons name="plus-circle" size={size} color={color} />
    </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: 80,
    width: 80,
    borderRadius: 40,
    bottom: 20,
    borderColor: colors.white,
    borderWidth: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NewListingButton;
