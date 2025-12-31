import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Spalash from '../screens/Spalash';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Spalash'>
      <Stack.Screen name="Spalash" component={Spalash} options={{headerShown:false}} />
      <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
    </Stack.Navigator>
  )
}

export default RootNavigation

const styles = StyleSheet.create({})