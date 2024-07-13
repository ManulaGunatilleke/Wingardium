import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: RouterProps) => {
    const handleLogout = async () => {
        try {
            await FIREBASE_AUTH.signOut();
            alert('Logged out successfully!');
        } catch (error: any) {
            alert('Logout failed: ' + error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button onPress={() => navigation.navigate('Profile')} title="View Profile" />
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={() => navigation.navigate('Characters')} title="View Characters" />
            </View>
            <TouchableOpacity style={styles.customButton} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        marginVertical: 10,
        width: '80%', // Adjust the width as needed
    },
    customButton: {
        backgroundColor: '#cfcc44',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
        width: '80%', // Adjust the width as needed
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default List;
