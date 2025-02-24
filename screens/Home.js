import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Users from './Users';

const Home = () => {
    return (
        <View>
            <StatusBar hidden></StatusBar>
            <Users></Users>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Home;

