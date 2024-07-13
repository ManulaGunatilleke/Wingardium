import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { User } from 'firebase/auth';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = FIREBASE_AUTH.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <View style={styles.card}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{user.displayName}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>
        </>
      ) : (
        <Text>No user is signed in.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginVertical: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
  },
});

export default Profile;
