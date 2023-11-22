import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";

import Screens from "../components/Screen";
import Card from "../components/Card";
import routes from "../navigation/routes";
import listngsApi from "../api/listings.js";
import AppButton from "../components/AppButton.js";
import AppText from "../components/AppText.js";
import ActivityIndicator from "../components/ActivityIndicator.js";
import useApi from "../hooks/useApi.js";

function ListingsScreen({ navigation }) {
  const { data: listings, error, loading, request: loadListings } = useApi(
    listngsApi.getListings
  );

  useEffect(() => {
    loadListings();
  }, []);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screens style={styles.container}>
        {error && (
          <>
            <AppText>Couldn't retrieve the listings.</AppText>
            <AppButton title="Retry" onPress={loadListings} />
          </>
        )}
        <FlatList
          data={listings}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={"Ksh" + item.price}
              imageURL={item.images[0].url}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
              thumbnailURL={item.images[0].thumbnailUrl}
            />
          )}
        />
      </Screens>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default ListingsScreen;
