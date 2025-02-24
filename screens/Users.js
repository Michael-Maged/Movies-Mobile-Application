import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, Pressable, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Usersp } from '../context/usersprovider';
import { FontAwesome } from '@expo/vector-icons';
import routes from '../utils/routes';
import { analytics, db } from '../Helpers/firebasehelper';
import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import LoadingScreen from './LoadingScreen';

const Users = () => {
    const {navigate} = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [users, filteredUsers, setFilteredUsers] = useContext(Usersp);
    const [favorites, setFavorites] = useState([]);


    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text) {
            const newData = users.filter(item => {
                const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.includes(textData);
            });
            setFilteredUsers(newData);
        } else {
            setFilteredUsers(users);
        }
    };

    const fetchfavourites = async () => {
        try {
            const query = await getDocs(collection(db, "Favourites"));
            const x = query.docs.map((doc) => ({ ...doc.data(), movieid: doc.id.toString() }));
            setFavorites(x);
    
            setFilteredUsers((prevFilteredUsers) =>
                prevFilteredUsers.map((user) => {
                    const updatedUser = x.find((fav) => fav.id === user.id);
                    return updatedUser ? updatedUser : user;
                })
            );
        } catch (error) {
            console.error("Error Fetching: ", error);
        }
    };
    

    useEffect( ()=>{
         fetchfavourites();
    },[favorites])

    const addFavouriteMovie = async(item)=>{
        try {
            await addDoc(collection(db,"Favourites") , item)
        } catch (error) {
            console.error("errrrr:" , error)
        }
    }

    const removeFavoriteMovie = async (movie) => {
        try {
            const docRef = doc(db, "Favourites",movie.movieid);
            await deleteDoc(docRef);
            fetchfavourites(); 
        } catch (error) {
            console.error("Error removing favorite movie: ", error);
        }
    };

    const toggleFavorite = (item) => {
        const isFavorite = favorites.some(fav => fav.id === item.id);
    
        if (isFavorite) {
            // If the item is already a favorite, remove it from the list
            setFavorites(favorites.filter(fav => fav.id !== item.id));
            removeFavoriteMovie(item);
        } else {
            setFavorites([...favorites, item]);
            addFavouriteMovie(item);
        }
    };
    

    const isFavorite = (item) => {
        return favorites.some(fav => fav.id === item.id);
    };

    if(!users) <LoadingScreen></LoadingScreen>
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Movies List</Text>
            </View>
            <TextInput
                style={styles.searchBar}
                placeholder="Search by title"
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <Pressable
                style={styles.favoritesButton}
                onPress={() => navigate(routes.Favourites, { favorites })}
            >
                <Text style={styles.favoritesButtonText}>Favourites</Text>
            </Pressable>
            <FlatList
                data={filteredUsers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.userCard}>
                        <Image
                            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                            style={styles.poster}
                        />
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>{item.title.replace(/,$/, '')}</Text>
                        </View>
                        <TouchableOpacity onPress={() => toggleFavorite(item)}>
                            <FontAwesome
                                name={isFavorite(item) ? "heart" : "heart-o"}
                                size={24}
                                color={isFavorite(item) ? "#ff0000" : "#ccc"}
                                style={styles.favoriteIcon}
                            />
                        </TouchableOpacity>
                        <Pressable
                            style={styles.detailsButton}
                            onPress={() => navigate(routes.details, item.id )}
                        >
                            <Text style={styles.detailsButtonText}>Details</Text>
                        </Pressable>
                    </View>
                )}
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0, 
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    headerContainer: {
        marginBottom: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00b4d8',
        textAlign: 'center',
    },
    searchBar: {
        height: 40,
        borderColor: '#00b4d8',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    listContainer: {
        padding:10,
        paddingBottom: 20
    },
    userCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
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
    userOverview: {
        fontSize: 14,
        color: '#666',
    },
    favoriteIcon: {
        marginRight: 10,
    },
    detailsButton: {
        backgroundColor: '#00b4d8',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        alignSelf: 'center',
        padding:10
    },
    detailsButtonText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
    favoritesButton: {
        backgroundColor: '#00b4d8',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        alignSelf: 'center',
        marginBottom: 10,
    },
    favoritesButtonText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Users;
