import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function UserCard({ user, isFavorite, onAdd, onRemove }) {
    return (
        <View style={styles.card}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            {isFavorite ? (
                <TouchableOpacity style={styles.removeBtn} onPress={() => onRemove(user.id)}>
                    <Text style={styles.btnText}><Entypo name="cross" size={24} color="red" /> Remove</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.addBtn} onPress={() => onAdd(user)}>
                    <Text style={styles.btnText}><AntDesign name="star" size={24} color="yellow" /> Add to Favorites</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
        color: "#333",
    },
    email: {
        fontSize: 14,
        color: "#666",
        marginBottom: 12,
    },
    addBtn: {
        backgroundColor: "#6200ee",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    removeBtn: {
        backgroundColor: "#d32f2f",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    btnText: {
        color: "#fff",
        fontWeight: "bold",
    },
});