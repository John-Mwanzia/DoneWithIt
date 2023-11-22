import React, { useEffect } from "react";
import { View, StyleSheet, Image, TouchableWithoutFeedback, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";



import colors from "../config/colors";

function ImageInput({ imageUri, onChangeImage }) {
    //handle the press event
    const handlePress = () => {
        //if there is no imageUri, call the selectImage function
       if(!imageUri) selectImage();
         //if there is an imageUri, show an alert to confirm the deletion
       else Alert.alert("Delete", "Are you sure you want to delete this image?", [
           {text: "Yes", onPress: () => onChangeImage(null)},
           {text: "No"}
       ])
      };
    //select an image from the library
    const selectImage = async () => {
        try {
            // call the launchImageLibraryAsync function to open the library and select an image from it and store it in result variable  
          const result = await ImagePicker.launchImageLibraryAsync(
            {
                //specify the type of media to select
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.5,
            }
          );
          //if the user cancels the selection, return
          //if the user selects an image, call the onChangeImage function and pass the uri of the image
          if (!result.canceled) onChangeImage(result.uri);
        } catch (error) {
          console.log("Error reading an image", error);
        }
      };
    
      //get permission to access the library
      const grantPermission = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        if (!granted) alert("You need to enable permission to access the library");
      };
    
      //call the function to get permission to access the library when the component mounts only once
      useEffect(() => {
        grantPermission();
      }, []);
  return (
    //wrap the view with TouchableWithoutFeedback to make it clickable
    <TouchableWithoutFeedback 
    onPress={handlePress}
    >
    <View style={styles.container}>
    {/* if there is no imageUri, show the camera icon */}
      {!imageUri && (
        <MaterialCommunityIcons color={colors.medium} name="camera" size={40} />
      )}
      {/* if there is an imageUri, show the image */}
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    backgroundColor: colors.light,
    overflow: "hidden",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageInput;
