import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import NavBar from '../components/NavBar';
import CommoditiesScreen from '../screens/CommoditiesScreen';

export type HomeStackParamList = {
  Home: undefined;
  Commodities: undefined;
};

const Home = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  return (
    <Home.Navigator
      screenOptions={{
        header: NavBar,
        title: 'Commodities',
      }}>
      <Home.Screen name="Home" component={HomeScreen} />
      <Home.Screen name="Commodities" component={CommoditiesScreen} />
    </Home.Navigator>
  );
};

export default HomeNavigator;
