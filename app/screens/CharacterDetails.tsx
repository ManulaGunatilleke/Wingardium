import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  CharacterDetails: { id: number };
};

type CharacterDetailsProps = NativeStackScreenProps<RootStackParamList, 'CharacterDetails'>;

interface Character {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  family: string;
  imageUrl: string;
}

const CharacterDetails = ({ route, navigation }: any | CharacterDetailsProps) => {
  const { id } = route.params;
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://thronesapi.com/api/v2/Characters/${id}`);
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        console.error('Error fetching character details:', error);
      }
    };

    fetchCharacter();
  }, [id]);

  if (!character) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: character.imageUrl }} style={styles.image} />
      <Text style={styles.name}>{character.fullName}</Text>
      <Text style={styles.title}>{character.title}</Text>
      <Text style={styles.family}>House: {character.family}</Text>
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
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  family: {
    fontSize: 16,
  },
});

export default CharacterDetails;
