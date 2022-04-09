import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from'@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import MyEvents from './components/MyEvents';
import Browse from './components/Browse';

const Tab = createMaterialTopTabNavigator();

export default function App() {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="My Events" component={MyEvents} />
          <Tab.Screen name="Browse" component={Browse} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
