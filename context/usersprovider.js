import React, { createContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export const Usersp = createContext();

const Usersprovider = ({children}) => {
    const [users, setUsers] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState(null);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9813ce01a72ca1bd2ae25f091898b1c7")
            .then((response) => response.json())
            .then((data) => {
                const movies = data.results; 
                setUsers(movies);
                setFilteredUsers(movies); 
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            });
    }, []);

    return (
        <Usersp.Provider value={[users, filteredUsers, setFilteredUsers]}>
            {children}
        </Usersp.Provider>
    );
};

const styles = StyleSheet.create({});

export default Usersprovider;
