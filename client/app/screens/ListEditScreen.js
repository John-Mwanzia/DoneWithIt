import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import * as Location from "expo-location";

import {
  AppForm,
  AppFormField as FormField,
  SubmitButton,
  AppFormPicker as Picker,
} from "../components/forms";
import Screen from "../components/Screen";
import CategoryItemPicker from "../components/CategoryItemPicker";
import FormImagePicker from "../components/forms/FormImagePicker";
import useLocation from "../hooks/useLocation";
import listingsApi from "../api/listings";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required()
    .min(1)
    .label("Title"),
  price: Yup.number()
    .required()
    .min(1)
    .max(1000000)
    .label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object()
    .required()
    .nullable()
    .label("Category"),
  images: Yup.array().min(1, "please select atleast one image"),
});

const categories = [
  { label: "Furniture", value: 1, backgroundColor: "red", icon: "floor-lamp" },
  { label: "Clothing", value: 2, backgroundColor: "green", icon: "shoe-heel" },
  { label: "Camera", value: 3, backgroundColor: "blue", icon: "camera" },
  { label: "Cars", value: 4, backgroundColor: "orange", icon: "car" },
  { label: "Games", value: 5, backgroundColor: "purple", icon: "cards" },
  {
    label: "Sports",
    value: 6,
    backgroundColor: "dodgerblue",
    icon: "basketball",
  },
  {
    label: "Movies & Music",
    value: 7,
    backgroundColor: "grey",
    icon: "headphones",
  },
  {
    label: "Books",
    value: 8,
    backgroundColor: "pink",
    icon: "book-open-variant",
  },
  { label: "Other", value: 9, backgroundColor: "brown", icon: "tag-faces" },
];

export default function ListEditScreen() {
  const [uploadVisinle, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  //  const handleSubmit = async (listing) => {
  //     const result = await listingsApi.addListing({ ...listing, location });
  //     console.log('API Result:', result); // Log the result for inspection
  //     if (!result.ok) return alert("Could not save the listing.");
  //     alert("Success");
  //   }

  const handleSubmit = async (listing, {resetForm}) => {
    try {
      setProgress(0);
      setUploadVisible(true);
      const result = await listingsApi.addListing(
        { ...listing, location },
        (progress) => setProgress(progress)
      );

      setUploadVisible(false);

      // console.log('API Result:', result); // Log the result for inspection

      if (!result.ok) {
        setUploadVisible(false);
        return alert("Could not save the listing.");
      }

      resetForm();

    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving the listing.");
    }
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen onDone={()=> setUploadVisible(false)} progress={progress} visible={uploadVisinle} />
      <AppForm
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField
          keyboardType="numeric"
          maxLength={11}
          name="price"
          placeholder="Price"
          width={120}
        />
        <Picker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryItemPicker}
          placeholder="Category"
        />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
