import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError("Failed to load users. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        const loadFavorites = async () => {
            try {
                const storedFavorites = await AsyncStorage.getItem("favorites");
                if (storedFavorites) {
                    setFavorites(JSON.parse(storedFavorites));
                }
            } catch (err) {
                console.log("Error loading favorites", err);
            }
        };

        fetchUsers();
        loadFavorites();
    }, []);

    const addToFavorites = async (user) => {
        const updatedFavorites = [...favorites, user];
        setFavorites(updatedFavorites);
        await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    const removeFromFavorites = async (id) => {
        const updatedFavorites = favorites.filter((u) => u.id !== id);
        setFavorites(updatedFavorites);
        await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <UserContext.Provider
            value={{ users, favorites, addToFavorites, removeFromFavorites, loading, error }}
        >
            {children}
        </UserContext.Provider>
    );
};