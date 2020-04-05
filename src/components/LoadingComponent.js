import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";

const styles = StyleSheet.create({
    loadingView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    loadingText: {
        fontSize: 14,
        color: '#512DA8',
        fontWeight: 'bold'
    }
});

export const Loading = () => {
    return(
        <View style={styles.loadingView}>
            <ActivityIndicator size="large" color="#512DA8" />
            <Text style={styles.loadingText}>Loading ...</Text>
        </View>
    );
}