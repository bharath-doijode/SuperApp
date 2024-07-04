import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Image } from 'react-native';
import {Button} from 'react-native-paper';
import {useAuth} from '../contexts/AuthContext';

const SignInScreen = () => {
  const {signIn} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/ofi.png')}
        style={styles.image}
      />
      <Text style={styles.title}>One Procurement App</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <Button mode="contained" style={{ borderRadius: 1 }}  theme={{ colors: { primary: 'brown' } }} onPress={() => {
        if(email === '' && password === ''){
            Alert.alert("please provide the credentials");
            return;
        }else{
            return signIn(email.includes("fr") ? "FR" : "FL");
        }
        }} >
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    minWidth: '80%'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    minWidth: '80%'
  },
  image: {
    width: 100, 
    height: 100, 
    resizeMode: 'contain'
  }
});

export default SignInScreen;