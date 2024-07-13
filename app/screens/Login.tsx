import { View, Text, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { updateProfile } from 'firebase/auth';
import { NavigationProp } from '@react-navigation/native';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Login = ({ navigation }: RouterProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    navigation.setOptions({ title: 'Wingardium' });
  }, [navigation]);

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('Signed in successfully!');
      // navigation.navigate('Home'); 
    } catch (error: any) {
      console.log(error);
      alert('Sign in failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!passwordRegex.test(password)) {
      alert('Password must be at least 8 characters long, include at least one lowercase character, one uppercase character, and one number.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;
      await updateProfile(user, { displayName: name });
      console.log(response);
      alert('Account created successfully!');
    } catch (error: any) {
      console.log(error);
      alert('Sign up failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior='padding'>
        {isSigningUp && (
          <>
            <TextInput
              value={name}
              style={styles.input}
              placeholder="Name"
              autoCapitalize="none"
              onChangeText={(text) => setName(text)}
            />
          </>
        )}
        <TextInput
          value={email}
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          secureTextEntry={true}
          value={password}
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
        />
        {isSigningUp && (
          <>
            <TextInput
              secureTextEntry={true}
              value={confirmPassword}
              style={styles.input}
              placeholder="Confirm Password"
              autoCapitalize="none"
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </>
        )}

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            {isSigningUp ? (
              <>
                <TouchableOpacity style={styles.button} onPress={signUp}>
                  <Text style={styles.buttonText}>Create account</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsSigningUp(false)}>
                  <Text style={styles.switchText}>
                    <Text>Have an account?</Text> <Text style={styles.underline}>Sign In</Text>
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity style={styles.button} onPress={signIn}>
                  <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsSigningUp(true)}>
                  <Text style={styles.switchText}>
                    <Text>Don't have an account?</Text> <Text style={styles.underline}>Sign Up</Text>
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#cfcc44',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  underline: {
    color: '#cfcc44',
    textDecorationLine: 'underline',
  },
});

export default Login;
