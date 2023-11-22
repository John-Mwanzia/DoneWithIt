import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

function AppTextInput({ icon, ...otherProps }) {
  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons
          style={styles.icon}
          name={icon}
          size={20}
          color="#6e6869"
        />
      )}
      <TextInput 
      placeholderTextColor={defaultStyles.colors.medium}
      {...otherProps} 
      style={defaultStyles.text} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f4f4",
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
});
export default AppTextInput;
