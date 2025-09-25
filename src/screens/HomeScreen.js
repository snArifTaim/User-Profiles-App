import React, { useContext } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button } from "react-native";
import { UserContext } from "../context/UserContext";
import UserCard from "../components/UserCard";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    const { users, favorites, addToFavorites, loading, error } = useContext(UserContext);


    if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#6200ee" />;


    if (error)
        return (
            <View style={styles.center}>
                <Text style={{ marginBottom: 10 }}>{error}</Text>
                <Button title="Retry" onPress={() => window.location.reload()} />
            </View>
        );


    return (
        <SafeAreaView style={{ flex: 1 }}>
        <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <UserCard
                    user={item}
                    isFavorite={favorites.some((u) => u.id === item.id)}
                    onAdd={addToFavorites}
                />
            )}
        />
        </ SafeAreaView>
    );
}


const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});