import { useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Usersp } from '../context/usersprovider';
import LoadingScreen from './LoadingScreen';
import { Image } from 'react-native';

const Details = () => {
    const { params } = useRoute();
    const [users] = useContext(Usersp);
    const [wanted, setWanted] = useState({});

    useEffect(() => {
        setWanted(users.find((u) => u.id === params));
    }, [params, users]);


    if (!wanted.title) return <LoadingScreen />;

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${wanted.poster_path}` }}
                style={styles.posterImage}
                resizeMode="cover"
            />
            <Text style={styles.movieTitle}>{wanted.title}</Text>
            <Text style={styles.movieDetails}>Overview: {wanted.overview}</Text>
            <Text style={styles.movieDetails}>Release Date: {wanted.release_date}</Text>
            <Text style={styles.movieDetails}>Rating: {wanted.vote_average} / 10</Text>
            <Text style={styles.movieDetails}>Votes: {wanted.vote_count}</Text>
            <Text style={styles.movieDetails}>Language: {wanted.original_language.toUpperCase()}</Text>
            <Text style={styles.movieDetails}>Popularity: {wanted.popularity}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    posterImage: {
        width: 200,    // Adjust the width as needed
        height: 300,   // Adjust the height as needed
        borderRadius: 10,
        marginBottom: 20,
    },
    movieTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00b4d8',
        marginBottom: 20,
        textAlign: 'center',
    },
    movieDetails: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
        lineHeight: 22,
        textAlign: 'center',
    },
});

export default Details;
