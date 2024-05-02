import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, MD3Colors, Text} from 'react-native-paper';
import {useAuth} from '../contexts/AuthContext';

const SignInScreen = () => {
  const {signIn} = useAuth();

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.welcomeHeadline}>
        Welcome to one platform for procurement!
      </Text>
      <Text style={styles.welcomeText} variant="bodyLarge">
        One Procurement App
      </Text>
      <Button mode="contained" style={{ borderRadius: 1 }}  theme={{ colors: { primary: 'brown' } }} onPress={()=>signIn("FR")}>
        Login as Farmer
      </Button>
      <Button mode="contained" style={{ borderRadius: 1 }}  theme={{ colors: { primary: 'brown' } }} onPress={()=>signIn("FL")}>
        Login as Farmer Lead
      </Button>
      <Button mode="contained" style={{ borderRadius: 1 }}  theme={{ colors: { primary: 'brown' } }}  onPress={()=>signIn("SU")}>
        Login as Super User
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeHeadline: {
    color: MD3Colors.primary20,
  },
  welcomeText: {
    padding: 16,
    paddingBottom: 32,
  },
});

export default SignInScreen;
