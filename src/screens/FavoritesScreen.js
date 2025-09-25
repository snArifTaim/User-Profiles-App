import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { UserContext } from "../context/UserContext";
import UserCard from "../components/UserCard";


export default function FavoritesScreen() {
    const { favorites, removeFromFavorites } = useContext(UserContext);


    if (favorites.length === 0) {
        return (
            <View style={styles.center}>
                <Text>No favorites added yet!</Text>
            </View>
        );
    }


    return (
        <FlatList
            data={favorites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <UserCard user={item} isFavorite onRemove={removeFromFavorites} />
            )}
        />
    );
}


const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});