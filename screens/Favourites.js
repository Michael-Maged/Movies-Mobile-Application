import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import routes from '../utils/routes';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../Helpers/firebasehelper';

const Favourites = ({ navigation }) => {
    const route = useRoute();
    const [favorites, setFavorites] = useState(route.params.favorites);

    const removeFavoriteMovie = async (movie) => {
        try {
            const docRef = doc(db, "Favourites", movie.movieid);
            await deleteDoc(docRef);
            const updatedFavorites = favorites.filter(fav => fav.movieid !== movie.movieid);
            setFavorites(updatedFavorites);
        } catch (error) {
            console.error("Error removing favorite movie: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Favourites List</Text>
            {favorites.length === 0 ? (
                <Text style={styles.noFavouritesText}>No favourites selected yet.</Text>
            ) : (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.movieid.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.userCard}>
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                                style={styles.poster}
                            />
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>{item.title}</Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Pressable
                                    style={styles.detailsButton}
                                    onPress={() => navigation.navigate(routes.details, item.id)}
                                >
                                    <Text style={styles.detailsButtonText}>Details</Text>
                                </Pressable>
                                <Pressable
                                    style={styles.removeButton}
                                    onPress={() => removeFavoriteMovie(item)}
                                >
                                    <Text style={styles.removeButtonText}>Remove</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00b4d8',
        textAlign: 'center',
        marginBottom: 20,
    },
    noFavouritesText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
    userCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        alignItems: 'center',
    },
    poster: {
        width: 100,
        height: 150,
        borderRadius: 10,
        marginRight: 15,
    },
    userInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsButton: {
        backgroundColor: '#00b4d8',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        alignSelf: 'center',
        marginBottom: 10, // Added margin to separate the buttons
    },
    detailsButtonText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
    removeButton: {
        backgroundColor: '#ff4b4b',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        alignSelf: 'center',
    },
    removeButtonText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
    listContainer: {
        paddingBottom: 20,
    },
});

export default Favourites;
