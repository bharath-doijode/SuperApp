import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FarmerLeadScreen from '../screens/FarmerLeadScreen';
import TabsNavigator from './TabsNavigator';
import FarmerScreen from '../screens/FarmerScreen';
import DashboardScreen from '../screens/DashboardScreen';

export type MainStackParamList = {
  Tabs: {role: string};
  FarmerLead: undefined;
  Farmer: undefined;
  Dashboard: undefined;
};

const Main = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = (props: any) => {
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => setRole(props.role),[]);
  useEffect(() => setRole(props.role),[props.role]);
  return role && (
    <Main.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Main.Screen name="Tabs" component={TabsNavigator} initialParams={{role: role}}/>
      <Main.Screen name="FarmerLead" component={FarmerLeadScreen} />
      <Main.Screen name="Farmer" component={FarmerScreen} />
      <Main.Screen name="Dashboard" component={DashboardScreen} />
    </Main.Navigator>
  );
};

export default MainNavigator;
